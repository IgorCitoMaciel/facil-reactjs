import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../../contexts/AuthContext";
import moment from "moment";
import CurrencyInput from 'react-currency-input-field';
//import { ModalCR } from "../../../components/modalCResultados";

import { ModalDocumento } from "../../../components/modalDocumento";
import { ModalDespesa } from "../../../components/modalDespesa"

// import { ModalCrNovo } from "../../../components/modalCrNovo";
import { ModalCrNovo } from "../../CentroResultado/components/modalCrNovo";
import { ModalInsumo } from "../../../components/modalAddInsumo";
import { ModalInsumoAdd } from "./components/modalInsumoAdd";

//import { ModalFornecedor } from "../../../components/modalFornecedor";
import { ModalFornecedor } from "../../Fornecedor/components/modalFornecedor";
import { ModalParcelas } from "../../../components/modalParcelas";

import { canSSRAuth } from "../../../utils/canSSRAuth";
import { Load } from "../../../components/load";


import {
  Container,
  AreaContainerCampos,
  AreaCampos,
  HeaderAreaCampos,
  Title,
  TitleInput,
  InputOC,
  AreaSelectCC,
  SelectCC,
  InputObs,
  AreaCimaInput,
  AreaBtn,
  BtnSalvar,
  BtnText,
  BtnAdd,
  BtnTextAdd,
  AreaComponentBtnAdd,
  ContentArea,
  AreaInsumo,
  AreaTitleInsumo,
  BtnAddInsumo,
  TitleList,
  TextList,
  BtnDeleteInsumo,
  BtnRegistrarParcelas,
  AreaParcelas,
  Table,
  Trr,
  Thh,
  Tdd,
  TdCheck,
  BtnAprovar,
  BtnAprovado,
  TdText,
  BtnListOc,
  Input,
} from "./styles";

import SideBar from "../../../components/sideBar";
import { INTERNALS } from "next/dist/server/web/spec-extension/request";
import { MdOutlineCastForEducation } from "react-icons/md";
import { api } from "../../../services/apiClient";


export default function CentroCusto() {
  const { user } = useContext(AuthContext);
  const [domLoaded, setDomLoaded] = useState(true);
  const [estabelecimento, setEstabelecimento] = useState("")
  const [centroResultado, setCentroResultado] = useState("")
  const [dataCriacao, setDataCriacao] = useState("")
  const [dataVencimento, setDataVencimento] = useState("")
  const [observacao, setObservacao] = useState("")
  const [documento, setDocumento] = useState("")
  const [despesa, setDespesa] = useState("")
  const [valor, setValor] = useState("")
  const [isAddCentroResultadoModalNovo, setIsAddCentroResultadoModalNovo] = useState(false);
  const [isAddInsumoModal, setIsAddInsumoModal] = useState(false);
  const [isAddParcelasModal, setIsAddParcelasModal] = useState(false);
  const [isAddDocumentoModal, setIsAddDocumentoModal] = useState(false);
  const [isAddFornecedorModal, setIsAddFornecedorModal] = useState(false);
  const [isAddDespesaModal, setIsAddDespesaModal] = useState(false);
  const [lista, setLista] = useState([]);
  const [nomeCr, setNomeCr] = useState('');
  const [load, setLoad] = useState(false);
  const [fornecedor, setFornecedor] = useState("")


  const [listaFornecedor, setListaFornecedor] = useState([]);
  const [listaInsumo, setListaInsumo] = useState([]);
  const [insumoOc, setInsumoOc] = useState([]);

  const [pagamento, setPagamento] = useState("");
  const [idParcela, setIdParcela] = useState("");
  const [valorDaParcela, setValorDaParcela] = useState("");

  const [listaParcelas, setListaParcelas] = useState([]);
  const [numeroParcela, setNumeroParcela] = useState("")
  const [dataVencimento1, setDataVencimento1] = useState(dataVencimento)
  const [dataVencimento2, setDataVencimento2] = useState(dataVencimento)
  const [dataVencimento3, setDataVencimento3] = useState(dataVencimento)
  const [dataVencimento4, setDataVencimento4] = useState(dataVencimento)
  const [dataVencimento5, setDataVencimento5] = useState(dataVencimento)
  const [dataVencimento6, setDataVencimento6] = useState(dataVencimento)

  const [valorVencimento1, setValorVencimento1] = useState(valor)
  const [valorVencimento2, setValorVencimento2] = useState(valor)
  const [valorVencimento3, setValorVencimento3] = useState(valor)
  const [valorVencimento4, setValorVencimento4] = useState(valor)
  const [valorVencimento5, setValorVencimento5] = useState(valor)
  const [valorVencimento6, setValorVencimento6] = useState(valor)


  // estados api

  const [listaDoc, setListaDoc] = useState([])
  const [listaCr, setListaCr] = useState([])
  const [listaDespesa, setListaDespesa] = useState([])
  const [porcentagem, setPorcentagem] = useState("")
  const [valorDesconto, setValorDesconto] = useState("")

  const [fornecedorFilter, setFornecedorFilter] = useState([])

  const [valorBruto, setValorBruto] = useState('');
  const [valorFormatado, setValorFormatado] = useState('');

  useEffect(() => {
    setValorFormatado(formatValor(valorBruto));
  }, [valorBruto]);

  useEffect(() => {
    setValor(formatValorMoedaReal(somaTotalValueInsumos(insumoOc)))
  }, [insumoOc]);

  console.log("valor >> = - = - =",valor)

  // function formatValorMoedaReal(valor) { // formata number em string modeda real
  //   return valor.toLocaleString('pt-BR', {
  //     style: 'currency',
  //     currency: 'BRL',
  //     minimumFractionDigits: 2,
  //     maximumFractionDigits: 2,
  //   });
  // }

  function formatValorMoedaReal(valor) { // formata number em string modeda real
    if (valor === undefined || valor === null) {
      return '';
    }
  
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  function formataStringEmNumber(valor) {
    const valorFormat = parseFloat(formatValorMoedaReal(valor.replace('.', '').replace(',', '.')))
    return valorFormat
  }

  function formataStringEmNumberInsumo(valor) {
    if (valor.includes(',')) {
      return Number(valor.replace(/\./g, '').replace(',', '.'));
    } else {
      return Number(valor);
    }
  }

  function somaTotalValueInsumos(array) {
    return array.reduce((soma, objeto) => {
      const valor = formataStringEmNumberInsumo(objeto.total_value);
      return soma + valor;
    }, 0);
  }

  //console.log("testando valor soma insumos Number = = = > ", somaTotalValueInsumos(insumoOc))
  //console.log("testando valor soma insumos String Real = = = > ", formatValorMoedaReal(somaTotalValueInsumos(insumoOc)))

  // useEffect(() => {
  //   filtraFornecedor();
  // }, [listaFornecedor])



  // function filtraFornecedor() {
  //   const arrayComRepeticao = listaFornecedor;
  //   const arraySemRepeticao = [];

  //   // percorre o array original e adiciona os itens que ainda não foram adicionados ao array de dados únicos
  //   arrayComRepeticao.forEach((item) => {
  //     if (arraySemRepeticao.indexOf(item.company_name) === -1) {
  //       console.log('id =', item.company_name)
  //       arraySemRepeticao.push(item.company_name);
  //     }
  //   });
  //    return setFornecedorFilter(arraySemRepeticao)
  //   // exibe o array de dados únicos
  //   console.log("filtraFornecedor", arraySemRepeticao);

  // }

  function formataValorMoedaReal(valor) {
    const valorFormat = parseFloat(formatReal(valor).replace('.', '').replace(',', '.'))
    const valorFormatado = valorFormat.toLocaleString('pt-BR', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      //currency: 'BRL',
    });
    return valorFormatado
  }

  useEffect(() => {
    //filtraFornecedor();
    if (valor && porcentagem) {
      const valorNumberDesconto = formatValor(valor) - (formatValor(valor) * (parseFloat(porcentagem / 100)))
      setValorDesconto(valorNumberDesconto)
    } else {
      setValorDesconto()
    }
  }, [valor, porcentagem])

  console.log("valorDesconto >> -=-=-=-=-=",valorDesconto)
  console.log("TESTE-=-=-=-=-=",formatValorMoedaReal(valorDesconto))



  useEffect(() => {
    // listarInsumos();
    // fomatandoData();
    // ListarDoc();
    // ListarCr();
    // listagemFornecedor();
    AllFunction();

  }, [])

  function formatDesconto(valorDesconto) {
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
    var valorStr = `${valorDesconto}`;

    return formatter.format(valorDesconto).replace("R$", "").trim();

  }

  function fomatandoData() {
    var data1 = '20/01/2022';
    var data2 = '20/01/2022';

    var dia = data1.split("/", 1);
    var mes = data1.split("/", 2);
    var ano = data1.split("/", 3);

  }

  const dataAtual = new Date().toLocaleDateString();

  async function AllFunction() {
    await listarInsumos();
    await listagemFornecedor();
    await ListarDoc();
    await ListarCr();
  }

  async function listarInsumos() {
    //setDomLoaded(true);
    try {
      const response = await api.get('/list-insumo');
      //console.log("response insumo", response.data)
      setListaInsumo(response.data);
      setDomLoaded(false);


    } catch (error) {
      console.log('MEU ERRO Listagem Insumo =', error);
      //setDomLoaded(false);
    }

  }


  async function listagemFornecedor() {
    //setDomLoaded(true);
    try {
      const response = await api.get('/list-fornecedor')
      //console.log('MEU RESPONSE', response.data)
      setListaFornecedor(response.data);
      setDomLoaded(false);

    } catch (err) {
      window.alert('Atenção', 'Erro.')
      console.log('MEU ERRO Listagem fornecedor =', err);
      //setDomLoaded(false);
    }
  }


  async function ListarDoc() {
    //setDomLoaded(true);
    try {
      const response = await api.get('/list-documento')
      //console.log('MEU RESPONSE doc', response.data)
      setListaDoc(response.data)
      setDomLoaded(false);

    } catch (error) {
      console.log('MEU ERRO Listagem documento =', error);
      //setDomLoaded(false);
    }
  }

  async function ListarCr() {
    //setDomLoaded(true);

    try {
      const response = await api.get('/list-centro-resultado')
      //console.log("Meu response CR", response.data)
      setListaCr(response.data);
      setDomLoaded(false);

    } catch (error) {
      console.log('MEU ERRO Listagem = centro resultado', error);
      setDomLoaded(false);
    }
  }


  function limpaCampos() {
    setEstabelecimento("");
    setCentroResultado("");
    setEstabelecimento("");
    setDataCriacao('');
    setEstabelecimento("");
    setDataVencimento('');
    setObservacao('');;
    setDocumento("");
    setValor("");
    setListaParcelas([]);
    setInsumoOc([]);
    setLista([]);
    setPorcentagem("");
    setFornecedor("");
    setPagamento("");
  }

  const parcelaUnicaTabela = [{
    numero_parcela: "1",
    valor_parcela: valorDesconto ? formatValorRequest(String(valorDesconto)) : formatValorRequest(String(valor)),
    data_vencimento: dataVencimento1.split('-').reverse().join('-'),
    pagamento: false,
  }]

  let data1 = {
    name: estabelecimento,
    document_type: documento,  // id do documento
    fornecedor: fornecedor,
    expire: dataVencimento.split('-').reverse().join('-'), // data de vencimento
    observation: observacao,
    contract_reference: centroResultado, // id do centro de resultado
    status: false,
    user: user.id,
    value: valorDesconto ? valorDesconto : `${valor}`,
    discount: porcentagem,
    insumos: insumoOc,
    parcelas: listaParcelas ? listaParcelas : parcelaUnicaTabela,
    nota_fiscal: "",

  }


  async function CriarOc() {
    setLoad(true)
    // console.log('Data', data)

    const parcelaUnica = [{
      numero_parcela: "1",
      valor_parcela: valorDesconto ? String(valorDesconto) : formatValorRequest(String(valor)),
      data_vencimento: dataVencimento1.split('-').reverse().join('-'),
      pagamento: false,
    }]
    //console.log('parcelaUnica z z z z z z',listaParcelas, (parcelaUnica))

    // let data = {
    //   name: estabelecimento,
    //   document_type: documento,  // id do documento
    //   fornecedor: fornecedor,
    //   expire: dataVencimento.split('-').reverse().join('-'), // data de vencimento
    //   observation: observacao,
    //   contract_reference: centroResultado, // id do centro de resultado
    //   status: false,
    //   user: user.id.toString(),
    //   value: valorDesconto ? formatDesconto(valorDesconto) : `${formatValorRequest(valor)}`,
    //   discount: porcentagem,
    //   insumos: insumoOc,
    //   parcelas: listaParcelas ? listaParcelas : parcelaUnica,
    //   nota_fiscal: "",
    // }
    let data = {
      name: estabelecimento,
      document_type: documento,  // id do documento
      fornecedor: fornecedor,
      expire: dataVencimento, // data de vencimento
      observation: observacao,
      contract_reference: centroResultado, // id do centro de resultado
      status: false,
      user: user.id,
      value: valorDesconto ? formatDesconto(valorDesconto) : `${formatValorRequest(valor)}`,
      discount: porcentagem,
      insumos: insumoOc,
      parcelas: listaParcelas ? listaParcelas : parcelaUnica,
      nota_fiscal: "",
    }
    console.log('Meu data Request Criar OC -- -- -- -- --', data)
    // console.log('Meu data Parcelas Request Criar OC -- -- -- -- --', data.parcelas, parcelaUnica[0].valor_parcela )
    // console.log('Meu data Parcela Unica Request Criar OC -- -- -- -- --', parcelaUnica[0].valor_parcela  )

    // if (dataVencimento && documento && centroResultado && estabelecimento && valor) {
    //   const result = await axios.post('https://app-facil-1cc4efc41cdc.herokuapp.com/finance/add_new_cost_center/', data)

    //   try {
    //     toast.success('Ordem de Compra criada com sucesso!');
    //     console.log('Lista Despesa =', result.data.list_expense);
    //     setListaDespesa(result.data.list_cost_center);
    //     limpaCampos();
    //     setLoad(false);
    //   } catch (error) {
    //     toast.error('Erro em criar Ordem de Compra!');
    //     console.log('MEU ERRO Add OC =', error);
    //     setLoad(false)
    //   }

    // } else {
    //   toast.error('Preencha todos os campos!');
    //   setLoad(false)

    // }
  }

  function handleOpenAddParcelasModal() {
    // setDataVencimento1(dataVencimento)
    setIsAddParcelasModal(true);
    console.log('chamou handleOpen Insumo Add')
  }

  function handleCloseAddParcelasModal() {
    setIsAddParcelasModal(false);
    console.log('chamou handleClose Insumo')
  }

  function handleOpenAddInsumoModal() {
    setIsAddInsumoModal(true);
    console.log('chamou handleOpen Insumo Add')
  }

  function handleCloseAddInsumoModal() {
    setIsAddInsumoModal(false);
    console.log('chamou handleClose Insumo')
  }

  function handleOpenAddDocumentoModal() {
    setIsAddDocumentoModal(true);
    console.log('chamou handleOpen')
  }

  function handleCloseAddDocumentoModal() {
    setIsAddDocumentoModal(false);
    ListarDoc();
  }

  // function handleOpenAddDespesaModal() {
  //   setIsAddDespesaModal(true);
  //   //console.log('chamou handleOpen')
  // }

  // function handleCloseAddDespesaModal() {
  //   setIsAddDespesaModal(false);
  //   ListarDespesa();
  // }

  function handleOpenAddCentroResultadoModalNovo() {
    setIsAddCentroResultadoModalNovo(true);
    //console.log('chamou handleOpen')
  }

  function handleCloseAddCentroResultadoModalNovo() {
    setIsAddCentroResultadoModalNovo(false);
    ListarCr();
  }

  function handleOpenAddFornecedorModal() {
    setIsAddFornecedorModal(true);
    console.log('chamou handleOpen Fornecedor')
  }

  function handleCloseAddFornecedorModal() {
    setIsAddFornecedorModal(false);
    listagemFornecedor();
  }



  function deletarInsumo() {
    var novaLista = lista.pop();
    setLista([])
    setTimeout(() => setLista(lista), 1)
    // console.log('z-z-z-z-z-z-z-z', lista)

  }

  useEffect(() => {
    setDataVencimento1(dataVencimento)
    setDataVencimento2(dataVencimento)
    setDataVencimento3(dataVencimento)
    setDataVencimento4(dataVencimento)
    setDataVencimento5(dataVencimento)
    setDataVencimento6(dataVencimento)
  }, [dataVencimento])

  function calculaValor() {
    if (valorDesconto) {
      return (valorDesconto) / parseFloat(pagamento)
      // console.log("caiu aqui CALC - - - - - - -", valorDesconto/ parseFloat(pagamento) )
    } else {
      //console.log('valor calculado - -', formatReal(valor), "pagamento - -" + parseFloat(pagamento))
      //console.log('valor dividido - -', parseFloat(formatReal(valor).replace('.', '').replace(',', '.')) / parseFloat(pagamento))
      return parseFloat(formatReal(valor).replace('.', '').replace(',', '.')) / parseFloat(pagamento)
    }
  }


  function verifyPay() {
    if (pagamento == '1') {
      return setListaParcelas(parcelaUnicaTabela)
    } else if (pagamento == '') {
      return setListaParcelas([])
    }
  }


  useEffect(() => {
    verifyPay();
    setValorVencimento1(calculaValor())
    setValorVencimento2(calculaValor())
    setValorVencimento3(calculaValor())
    setValorVencimento4(calculaValor())
    setValorVencimento5(calculaValor())
    setValorVencimento6(calculaValor())
  }, [pagamento])

  // console.log("pagamento",pagamento)
  // console.log("listaParcelas",formatValorRequest(listaParcelas[0]?.valor_parcela) )

  function addParcela() {
    var listaParcelas = []
    if (!dataVencimento || !valor) {
      toast.error('Preencha todos os campos anteriores!')
    }

    else if (pagamento) {
      var valorParcela = valorDesconto ? parseFloat(formatReal(valorDesconto)) : parseFloat(formatReal(valor).replace(',', '')) / parseFloat(pagamento)

      // console.log("valor Desconto - - - - - -", parseFloat(formatValor(valorDesconto)))
      // console.log("valor - - - - - -", parseFloat(formatReal(valor).replace(',', '')))
      // console.log("pagamento - - - - - -", parseFloat(pagamento))
      // console.log("valorParcela - - - - - -", valorParcela)
      // console.log("valorVencimento1 - - - - - -", valorVencimento1)
      //console.log("valorVencimento2- - - - - -", valorVencimento2)

      if (valorParcela === valorDaParcela) {
        // toast.error('Parcela já registrada!')

      }
      if (pagamento == "2") {
        listaParcelas =
          [
            {
              numero_parcela: "1",
              valor_parcela: formatDesconto(valorVencimento1),
              data_vencimento: dataVencimento1.split('-').reverse().join('-'),
              pagamento: false,
            },
            {
              numero_parcela: "2",
              valor_parcela: formatDesconto(valorVencimento2),
              data_vencimento: dataVencimento2.split('-').reverse().join('-'),
              pagamento: false,
            }
          ]
      }
      if (pagamento == "3") {
        listaParcelas =
          [
            {
              numero_parcela: "1",
              valor_parcela: formatDesconto(valorVencimento1),
              data_vencimento: dataVencimento1.split('-').reverse().join('-'),
              pagamento: false,
            },
            {
              numero_parcela: "2",
              valor_parcela: formatDesconto(valorVencimento2),
              data_vencimento: dataVencimento2.split('-').reverse().join('-'),
              pagamento: false,
            },
            {
              numero_parcela: "3",
              valor_parcela: formatDesconto(valorVencimento3),
              data_vencimento: dataVencimento3.split('-').reverse().join('-'),
              pagamento: false,
            },
          ]
      }
      if (pagamento == "4") {
        listaParcelas =
          [
            {
              numero_parcela: "1",
              valor_parcela: formatDesconto(valorVencimento1),
              data_vencimento: dataVencimento1.split('-').reverse().join('-'),
              pagamento: false,
            },
            {
              numero_parcela: "2",
              valor_parcela: formatDesconto(valorVencimento2),
              data_vencimento: dataVencimento2.split('-').reverse().join('-'),
              pagamento: false,
            },
            {
              numero_parcela: "3",
              valor_parcela: formatDesconto(valorVencimento3),
              data_vencimento: dataVencimento3.split('-').reverse().join('-'),
              pagamento: false,
            },
            {
              numero_parcela: "4",
              valor_parcela: formatDesconto(valorVencimento4),
              data_vencimento: dataVencimento4.split('-').reverse().join('-'),
              pagamento: false,
            },
          ]
      }
      if (pagamento == "5") {
        listaParcelas =
          [
            {
              numero_parcela: "1",
              valor_parcela: formatDesconto(valorVencimento1),
              data_vencimento: dataVencimento1.split('-').reverse().join('-'),
              pagamento: false,
            },
            {
              numero_parcela: "2",
              valor_parcela: formatDesconto(valorVencimento2),
              data_vencimento: dataVencimento2.split('-').reverse().join('-'),
              pagamento: false,
            },
            {
              numero_parcela: "3",
              valor_parcela: formatDesconto(valorVencimento3),
              data_vencimento: dataVencimento3.split('-').reverse().join('-'),
              pagamento: false,
            },
            {
              numero_parcela: "4",
              valor_parcela: formatDesconto(valorVencimento4),
              data_vencimento: dataVencimento4.split('-').reverse().join('-'),
              pagamento: false,
            },
            {
              numero_parcela: "5",
              valor_parcela: formatDesconto(valorVencimento5),
              data_vencimento: dataVencimento5.split('-').reverse().join('-'),
              pagamento: false,
            },
          ]
      }
      if (pagamento == "6") {
        listaParcelas =
          [
            {
              numero_parcela: "1",
              valor_parcela: formatDesconto(valorVencimento1),
              data_vencimento: dataVencimento1.split('-').reverse().join('-'),
              pagamento: false,
            },
            {
              numero_parcela: "2",
              valor_parcela: formatDesconto(valorVencimento2),
              data_vencimento: dataVencimento2.split('-').reverse().join('-'),
              pagamento: false,
            },
            {
              numero_parcela: "3",
              valor_parcela: formatDesconto(valorVencimento3),
              data_vencimento: dataVencimento3.split('-').reverse().join('-'),
              pagamento: false,
            },
            {
              numero_parcela: "4",
              valor_parcela: formatDesconto(valorVencimento4),
              data_vencimento: dataVencimento4.split('-').reverse().join('-'),
              pagamento: false,
            },
            {
              numero_parcela: "5",
              valor_parcela: formatDesconto(valorVencimento5),
              data_vencimento: dataVencimento5.split('-').reverse().join('-'),
              pagamento: false,
            },
            {
              numero_parcela: "6",
              valor_parcela: formatDesconto(valorVencimento6),
              data_vencimento: dataVencimento6.split('-').reverse().join('-'),
              pagamento: false,
            }
          ]
      }
    }
    return setListaParcelas(listaParcelas)

  }

  // console.log('listaParcelas - -',listaParcelas)

  function currency(e) {
    let value = e.currentTarget.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d)(\d{2})$/, "$1,$2");
    value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");

    // value = value;

    e.currentTarget.value = value;
    return e;
  }



  const handleKeyUp = useCallback((e) => currency(e))

  function formatReal(int) {
    var value = int + '';

    value = value.replace(/\D/g, "");
    value = value.replace(/(\d)(\d{2})$/, "$1,$2");
    value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");
    return value;
  }

  // console.log('Meu Valor Teste',formatReal(valor))

  function formatValor(valor) { // verificar se precisa ser mantida ou excluida
    return parseFloat(formatReal(valor).replace('.', '').replace(',', '.'))

  }

  function formatValorRequest(valor) {
    const valorFormat = parseFloat(formatReal(valor).replace('.', '').replace(',', '.'))
    const valorFormatado = valorFormat.toLocaleString('pt-BR', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      //currency: 'BRL',
    });
    return valorFormatado
  }

  function formatarValor(valor) {
    const valorFormat = parseFloat(formatReal(valor).replace('.', '').replace(',', '.'))
    const valorFormatado = valorFormat.toLocaleString('pt-BR', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      //currency: 'BRL',
    });
    return valorFormatado
  }

  //console.log('valor da oc Formatado', formatValorRequest(valor))
  //console.log('valor teste ', formatarValor(valor))
  //console.log("valorDesconto", valorDesconto)

  function formataValorComDesconto(valor) {
    const valorTotalFormatadoNumber = formatarValor(valor);
    const valorTotalFormatadoString = String(valorTotalFormatadoNumber); // Garante que valorFormatado seja uma string
    const valorFinal = parseFloat(valorTotalFormatadoString.replace('.', '').replace(',', '.'));

    if (porcentagem) {
      const valorDesconto = valorFinal - (valorFinal * (porcentagem / 100))

      return formatDesconto(valorDesconto) // retorna valor em string

    }

  }

  //console.log("valor com desconto =====", formataValorComDesconto(valor))
  //console.log("valorDesconto >>>>>", valorDesconto)


  // console.log("valor ====== ", valorFinal)
  // console.log("porcentagem ===== ", porcentagem / 100)
  // console.log("Valor menos o Desconto  === ", valorFinal - (valorFinal * (porcentagem / 100)))

  // console.log("a-a-a-a", valorDesconto ? String(valorDesconto) : formatValorRequest(String(valor)) )

  //console.log("lista", lista)


  return (
    <Container>
      {!domLoaded ? (
        <>
          <SideBar />
          <ContentArea>
            <AreaCampos>
              <HeaderAreaCampos>
                <Title>Ordem de Compra</Title>
              </HeaderAreaCampos>
              <div style={{ overflow: "auto", display: "flex", flexDirection: "column" }}>
                <AreaContainerCampos>
                  <AreaCimaInput>
                    <div style={{ display: "flex", flexDirection: "column", marginRight: 0 }}>
                      <TitleInput>Estabelecimento</TitleInput>
                      <AreaSelectCC>
                        <SelectCC
                          name="Selecione a empresa"
                          value={estabelecimento}
                          onChange={(e) => setEstabelecimento(e.target.value)}
                        >
                          <option value="">Selecione a empresa</option>
                          <option value="Podium">Podium</option>
                          <option value="Bariri">Bariri</option>
                          <option value="Fácil">Fácil</option>
                        </SelectCC>
                      </AreaSelectCC>
                    </div>
                    <AreaComponentBtnAdd>
                      <div style={{ display: "flex", flexDirection: "column", marginRight: 0 }}>
                        <TitleInput>Fornecedor</TitleInput>
                        <AreaSelectCC>
                          <SelectCC
                            name="Selecione o fornecedor"
                            value={fornecedor}
                            onChange={(e) => setFornecedor(e.target.value)}
                          >
                            <option value="">Selecione o fornecedor</option>
                            {listaFornecedor.map((item) => {
                              return (
                                <option key={item.id} value={item.company_name}>{item.company_name + "  " + "(" + item.cnpj + ")"}</option>
                                // <option key={item} value={item}>{item}</option>
                              )
                            })}
                          </SelectCC>
                        </AreaSelectCC>
                      </div>
                      <BtnAdd onClick={handleOpenAddFornecedorModal}>
                        <BtnTextAdd>+</BtnTextAdd>
                      </BtnAdd>
                      <ModalFornecedor
                        handleCloseAddFornecedorModal={handleCloseAddFornecedorModal}
                        isAddFornecedorModal={isAddFornecedorModal}
                      />
                    </AreaComponentBtnAdd>

                    <AreaComponentBtnAdd>
                      <div style={{ display: "flex", flexDirection: "column", marginRight: 0 }}>
                        <TitleInput>Centro de resultado</TitleInput>
                        <AreaSelectCC>
                          <SelectCC
                            name="Selecione a empresa"
                            value={centroResultado}
                            onChange={(e) => setCentroResultado(e.target.value)}
                          >
                            <option value="">Selecione o tipo</option>

                            {
                              listaCr.map((item) => {
                                return (
                                  <option key={item.id} value={item.id}>{item.name}</option>
                                )

                              })}
                          </SelectCC>
                        </AreaSelectCC>
                      </div>
                      <BtnAdd onClick={handleOpenAddCentroResultadoModalNovo}>
                        <BtnTextAdd>+</BtnTextAdd>
                      </BtnAdd>
                      <ModalCrNovo
                        handleCloseAddCentroResultadoModalNovo={handleCloseAddCentroResultadoModalNovo}
                        isAddCentroResultadoModalNovo={isAddCentroResultadoModalNovo}
                      />

                    </AreaComponentBtnAdd>

                    <AreaComponentBtnAdd>
                      <div style={{ display: "flex", flexDirection: "column", marginRight: 0 }}>
                        <TitleInput>Documento</TitleInput>
                        <AreaSelectCC>
                          <SelectCC
                            name="Selecione a empresa"
                            value={documento}
                            onChange={(e) => setDocumento(e.target.value)}
                          >
                            <option value="">Selecione o tipo</option>
                            {listaDoc.map((item) => {
                              return (
                                <option key={item.id} value={item.id}>{item.name}</option>
                              )
                            })}
                          </SelectCC>
                        </AreaSelectCC>
                      </div>
                      <BtnAdd onClick={handleOpenAddDocumentoModal}>
                        <BtnTextAdd>+</BtnTextAdd>
                      </BtnAdd>
                      <ModalDocumento
                        handleCloseAddDocumentoModal={handleCloseAddDocumentoModal}
                        isAddDocumentoModal={isAddDocumentoModal}
                      />
                    </AreaComponentBtnAdd>

                    {/* <div style={{ display: "flex", flexDirection: "column", marginRight: 0 }}>
                      <TitleInput>Data de criação</TitleInput>
                      <InputOC
                        type="date"
                        data-date-format="DD MMMM YYYY"
                        value={dataCriacao.split('-').reverse().join('-')}
                        onChange={(e) => setDataCriacao(e.target.value.split('-').reverse().join('-'))}

                      />
                    </div> */}
                    <div style={{ display: "flex", flexDirection: "column", marginRight: 55 }}>
                      <TitleInput>Data de vencimento</TitleInput>
                      <InputOC
                        type="date"
                        data-date-format="DD MMMM YYYY"
                        value={dataVencimento.split('-').reverse().join('-')}
                        onChange={(e) => setDataVencimento(e.target.value.split('-').reverse().join('-'))}
                      />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", marginRight: 55 }}>
                      <TitleInput>Valor</TitleInput>

                      <Input
                        disabled={true}
                        type="text"
                        prefix="R$"
                        onKeyUp={handleKeyUp}
                        //value={formatReal(valor)}
                        value={formatValorMoedaReal(somaTotalValueInsumos(insumoOc))}
                        onChange={(e) => setValor(e.target.value)}
                      />

                    </div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <TitleInput>Porcetagem do desconto</TitleInput>
                      <Input
                        type={"text"}
                        placeholder="Digite o numero da %"
                        value={porcentagem}
                        onChange={(e) => setPorcentagem(e.target.value)}
                      />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", marginRight: 55 }}>
                      <TitleInput>Valor com desconto</TitleInput>
                      <Input
                        type={"text"}
                        prefix="R$"
                        disabled={true}
                        onKeyUp={handleKeyUp}
                        value={!valorDesconto ? "" : formatValorMoedaReal(valorDesconto)}
                        //value={!valorDesconto ? "" : formatDesconto(valorDesconto)}
                        //value={!porcentagem ? "" : formataValorComDesconto(valor)}
                        onChange={(e) => setValorDesconto(e.target.value)}
                      />
                    </div>


                  </AreaCimaInput>

                  <div style={{ display: "flex", flexDirection: "column", marginRight: 0 }}>
                    <TitleInput>Forma de Pagamento</TitleInput>
                    <AreaSelectCC>
                      <SelectCC
                        name="Selecione o fornecedor"
                        value={pagamento}
                        onChange={(e) => setPagamento(e.target.value)}
                      >
                        <option value="">Forma de Pagamento</option>
                        <option value="1">A Vista</option>
                        <option value="2">Parcelado 2x</option>
                        <option value="3">Parcelado 3x</option>
                        <option value="4">Parcelado 4x</option>
                        <option value="5">Parcelado 5x</option>
                        <option value="6">Parcelado 6x</option>
                      </SelectCC>
                    </AreaSelectCC>
                  </div>
                  {pagamento !== "" && pagamento !== "1" ? (
                    <BtnRegistrarParcelas onClick={addParcela}>
                      <BtnText>Registrar Parcelas</BtnText>
                    </BtnRegistrarParcelas>
                  ) : (<></>)}

                  {
                    listaParcelas.length !== 0 ?
                      (
                        <AreaParcelas>
                          <Table>
                            <tbody>
                              <Trr>
                                <Thh>Parcela</Thh>
                                <Thh>Valor Parcela</Thh>
                                <Thh>Data Vencimento</Thh>
                                <Thh>Pagamento</Thh>
                              </Trr>
                              {
                                listaParcelas?.map((item, index) => (
                                  <Trr key={index}>
                                    <Tdd>
                                      <BtnListOc onClick={() => {
                                        handleOpenAddParcelasModal();
                                        // setDataVencimento(item.data_vencimento);
                                        setValorDaParcela(item.valor_parcela);
                                        setNumeroParcela(item.numero_parcela)
                                      }}>
                                        {item.numero_parcela}
                                      </BtnListOc>
                                    </Tdd>
                                    <Tdd>{parseFloat(item.valor_parcela).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</Tdd>
                                    <Tdd>{item.data_vencimento ? ((item.data_vencimento).split('-').reverse().join('-')) : ("Registrar Data!")}</Tdd>
                                    <Tdd>{item.pagamento === false ? ("Não Realizado") : ("Realizado")}</Tdd>
                                  </Trr>
                                )

                                )}
                            </tbody>
                          </Table>
                        </AreaParcelas>

                      ) : (<></>)
                  }

                  <ModalInsumoAdd
                    handleCloseAddInsumoModal={handleCloseAddInsumoModal}
                    isAddInsumoModal={isAddInsumoModal}
                    setLista={setLista}
                    lista={lista}
                    despesa={despesa}
                    setDespesa={setDespesa}
                    listaDespesa={listaDespesa}
                    setListaInsumo={setListaInsumo}
                    listaInsumo={listaInsumo}
                    setInsumoOc={setInsumoOc}
                    insumoOc={insumoOc}
                  />

                  <ModalParcelas
                    handleCloseAddParcelasModal={handleCloseAddParcelasModal}
                    isAddParcelasModal={isAddParcelasModal}
                    setLista={setLista}
                    lista={lista}
                    despesa={despesa}
                    setDespesa={setDespesa}
                    listaDespesa={listaDespesa}
                    setListaInsumo={setListaInsumo}
                    listaInsumo={listaInsumo}
                    pagamento={pagamento}
                    setPagamento={setPagamento}

                    dataVencimento={dataVencimento.split('-').reverse().join('-')}
                    setDataVencimento={setDataVencimento}
                    valorDaParcela={valorDaParcela}
                    addParcela={addParcela}
                    setNumeroParcela={setNumeroParcela}
                    numeroParcela={numeroParcela}

                    setDataVencimento1={setDataVencimento1}
                    dataVencimento1={dataVencimento1.split('-').reverse().join('-')}
                    setDataVencimento2={setDataVencimento2}
                    dataVencimento2={dataVencimento2.split('-').reverse().join('-')}
                    setDataVencimento3={setDataVencimento3}
                    dataVencimento3={dataVencimento3.split('-').reverse().join('-')}
                    setDataVencimento4={setDataVencimento4}
                    dataVencimento4={dataVencimento4.split('-').reverse().join('-')}
                    setDataVencimento5={setDataVencimento5}
                    dataVencimento5={dataVencimento5.split('-').reverse().join('-')}
                    setDataVencimento6={setDataVencimento6}
                    dataVencimento6={dataVencimento6.split('-').reverse().join('-')}

                    setValorVencimento1={setValorVencimento1}
                    valorVencimento1={valorVencimento1}
                    setValorVencimento2={setValorVencimento2}
                    valorVencimento2={valorVencimento2}
                    setValorVencimento3={setValorVencimento3}
                    valorVencimento3={valorVencimento3}
                    setValorVencimento4={setValorVencimento4}
                    valorVencimento4={valorVencimento4}
                    setValorVencimento5={setValorVencimento5}
                    valorVencimento5={valorVencimento5}
                    setValorVencimento6={setValorVencimento6}
                    valorVencimento6={valorVencimento6}
                  />

                  <AreaTitleInsumo>
                    <TitleInput>Insumos</TitleInput>
                    <AreaBtn>
                      <BtnDeleteInsumo onClick={deletarInsumo}>
                        <BtnText>Deletar Insumo</BtnText>
                      </BtnDeleteInsumo>

                      <BtnAddInsumo onClick={handleOpenAddInsumoModal}>
                        <BtnText>Adicionar Insumo</BtnText>
                      </BtnAddInsumo>
                    </AreaBtn>
                  </AreaTitleInsumo>
                  <AreaInsumo>
                    {lista?.map((item) => {
                      return (
                        <ul key={item.total_value}>
                          <li style={{ marginLeft: 20 }}>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                <TitleList style={{ marginRight: 20 }}>Nome:</TitleList>
                                <TextList>{item.name} ,</TextList>
                              </div>

                              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                <TitleList style={{ marginRight: 20, marginLeft: 20 }}>Unidade:</TitleList>
                                <TextList>{item.und} ,</TextList>
                              </div>

                              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                <TitleList style={{ marginRight: 20, marginLeft: 20 }}>Quantidade:</TitleList>
                                <TextList>{item.amount} ,</TextList>
                              </div>

                              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                <TitleList style={{ marginRight: 20, marginLeft: 20 }}>Valor Unidade:</TitleList>
                                <TextList>{"R$ " + formatReal(item.unity_value)}</TextList>
                              </div>

                              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                <TitleList style={{ marginRight: 20, marginLeft: 20 }}>Valor Total:</TitleList>
                                <TextList>{"R$ " + formatReal(item.total_value)}</TextList>
                              </div>
                            </div>
                          </li>
                        </ul>
                      )
                    })}
                  </AreaInsumo>


                  <TitleInput>Observações</TitleInput>
                  <InputObs
                    value={observacao}
                    onChange={(e) => setObservacao(e.target.value)}
                  />
                  {
                    load ?
                      (
                        <AreaBtn>
                          <BtnSalvar>
                            <BtnText>Salvar</BtnText>
                          </BtnSalvar>
                        </AreaBtn>
                      ) :
                      (
                        <AreaBtn>
                          {/* <BtnSalvar onClick={() => limpaCampos()}> */}
                          <BtnSalvar onClick={() => CriarOc()}>
                            <BtnText>Salvar</BtnText>
                          </BtnSalvar>
                        </AreaBtn>
                      )
                  }

                </AreaContainerCampos>
              </div>
            </AreaCampos>
          </ContentArea >
        </>
      ) :
        (
          <Load />
        )
      }
    </Container >
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

  return {
    props: {}
  }
})

