import React, { useEffect, useState, useContext, useRef } from "react";
import { destroyCookie, setCookie, parseCookies } from 'nookies';
import Router from 'next/router';
import axios from "axios";
import { Load } from "../../../components/load";
import Image from "next/image";
import imgNotFound from '../../../../public/not.png';
import SideBar from "../../../components/sideBar";
import { ModalOcEdit } from "../../../components/modalOcEdit";
import { canSSRAuth } from "../../../utils/canSSRAuth";
import { AuthContext } from "../../../contexts/AuthContext";
import { useReactToPrint } from 'react-to-print';


import {
  Container,
  AreaContainerCampos,
  AreaCampos,
  HeaderAreaCampos,
  Title,
  ContentArea,
  Table,
  Trr,
  Tdd,
  Thh,
  AreaSelectVenvimento,
  SelectVencimento,
  AreaImg,
  AreaContainerSelect,
  TextImg,
  BtnListOc,
  AreaCheck,
  TdCheck,
  BtnAprovar,
  BtnAprovado,
  TdText,
  AreaBtnPagination,
  BtnVoltar,
  BtnTexto,
  BtnAvancar,
  PageText,
  ContainerDivisor,
  ContainerDoc,
  BarDoc,
  TitleDoc,
  LineDocRow,
  DescriptionDoc,
  LineDocColumn,
  PesquisaInsumo,
  Thead,
  Table2,
} from "./styles";
import { toast } from "react-toastify";

const ListaDia = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
  '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26',
  '27', '28', '29', '30', '31']



export default function CentroCusto() {
  const { user } = useContext(AuthContext)
  const [domLoaded, setDomLoaded] = useState(true);
  const [dia, setDia] = useState('');
  const [mes, setMes] = useState('');
  const [ano, setAno] = useState('');
  const [estado, setEstado] = useState(false);
  const [isAddModal, setIsAddModal] = useState(false);
  const [dataCriacao, setDataCriacao] = useState('');
  const [dataVencimento, setDataVencimento] = useState('');
  const [despesa, setDespesa] = useState('');
  const [documento, setDocumento] = useState('');
  const [centroResultado, setCentroResultado] = useState('');
  const [estabelecimento, setEstabelecimento] = useState('');
  const [valor, setValor] = useState('');
  const [valorDesconto, setValorDesconto] = useState('');
  const [check, setCheck] = useState(false);
  const [obs, setObs] = useState('');
  const [listaOc, setListaOc] = useState([]);
  const [idOc, setIdOc] = useState('');
  const [idUser, setIdUser] = useState(user.id);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState('');
  const [count, setCount] = useState(0);
  const [nota, setNota] = useState("");
  const [fornecedor, setFornecedor] = useState("");
  const [fornecedorFilter, setFornecedorFilter] = useState("");
  const [fornecedorLista, setFornecedorLista] = useState([]);
  const [insumos, setInsumos] = useState([]);
  const [parcelas, setParcelas] = useState([]);
  const [status, setStatus] = useState(false);
  const [pesquisa, setPesquisa] = useState("");
  const [pesquisaCnpj, setPesquisaCnpj] = useState("");
  const [pesquisaNota, setPesquisaNota] = useState("");
  const [pesquisaDocType, setPesquisaDocType] = useState("");
  const [paymentParcela, setPaymentParcela] = useState();
  const [listagemFornecedor, setListagemFornecedor] = useState([]);

  const [banco, setBanco] = useState("");
  const [dataPagamento, setDataPagamento] = useState("");


  useEffect(() => {
    listagemOc();
    listaFornecedor();
  }, [])

  // useEffect(() => {
  //   filtraFornecedor();
  // }, [listagemFornecedor])



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
  //   return setFornecedorFilter(arraySemRepeticao)
  //   // exibe o array de dados únicos
  //   console.log("filtraFornecedor", arraySemRepeticao);

  // }

  async function listaFornecedor() {
    setDomLoaded(true);
    const result = await axios.get('https://app-facil-1cc4efc41cdc.herokuapp.com/finance/list_providers/ ')

    try {
      const arrayComRepeticao = result.data.list_providers;
      const arraySemRepeticao = [];

      arrayComRepeticao.forEach((item) => {
        if (arraySemRepeticao.indexOf(item.company_name) === -1) {
          console.log('id =', item.company_name)
          arraySemRepeticao.push(item.company_name);
        }
      });
      console.log('arrayFilter', arraySemRepeticao)

      setFornecedorLista(arraySemRepeticao)
      setDomLoaded(false);
      // console.log("testando listagem fornecedor filter", result.data.list_providers)

    } catch (error) {
      console.log('MEU ERRO ListagemFornecedor =', error);
      setDomLoaded(false);
    }
  }

  // console.log('fornecedorLista', fornecedorLista)
  async function listagemOc() {
    setDomLoaded(true);
    const result = await axios.get('https://app-facil-1cc4efc41cdc.herokuapp.com/finance/list_all_cost_center/?page=' + `${page}` + '&status=False')

    try {
      // console.log('CAIU NOS 200 OC', result.data.list_cost_center)
      // console.log('Meu User na Lista OC', user)

      setListaOc(result.data.list_cost_center)
      setMaxPage(result.data.pagination.pages)
      setCount(result.data.pagination.count)
      setIdUser(user.id)
      setDomLoaded(false);
      // console.log('testando busca',result.data.list_cost_center.map((item)=> item.installment_fk.map((item)=> item.date_expire.split('-').reverse().join('-') )))
    } catch (error) {
      console.log('MEU ERRO ListagemOC =', error);
      setDomLoaded(false);
    }
  }

  // console.log('Map installment_fk',listaOc.map((item)=>item.installment_fk))

  const resultFilter = listaOc
    .filter((oc) => {

      // const newDay = valorAtual.expire_at.split('-').reverse().join('-')
      // const day = newDay.split('-')[0]

      // if (dia === '') return true
      // return day === dia
      const installment = oc.installment_fk
      if (!installment.length) {
        return !installment.length && !dia // quando nao tiver, retorna true(mostra todos) 
      }

      const installmentFilter = installment.some((item) => {
        const newDay = item.date_expire.split('-').reverse().join('-')
        const day = newDay.split('-')[0]

        if (dia === '') return true
        return day === dia
      })
      return installmentFilter
    })
    // .filter((valorAtual) => {
    //   const newMonth = valorAtual.expire_at.split('-').reverse().join('-')
    //   const month = newMonth.split('-')[1]

    //   if (mes === '') return true
    //   return month === mes
    // })
    .filter((oc) => {
      const installment = oc.installment_fk
      if (!installment.length) {
        return !installment.length && !mes // quando nao tiver, retorna true(mostra todos) 
      }

      const installmentFilter = installment.some((item) => {
        const newMonth = item.date_expire.split('-').reverse().join('-')
        const month = newMonth.split('-')[1]

        if (mes === '') return true
        return month === mes
      })
      return installmentFilter

    }).filter((valorAtual) => {
      const newYear = valorAtual.expire_at.split('-').reverse().join('-')
      const year = newYear.split('-')[2]

      if (ano === '') return true
      return year === ano
    })
    .filter((valorAtual) => {
      const provider = valorAtual.provider?.company_name
      // console.log("Meu Provider aqui...",provider)

      if (fornecedorFilter === '') return true
      return fornecedorFilter === provider

    }).filter((valorAtual) => {
      if (!pesquisa) {
        return true
      }
      const insumoFilter = valorAtual.insumos_fk?.some((insumo) => {
        const regex = new RegExp(pesquisa, "gi")
        if (!insumo.name) {
          return false
        }
        return regex.test(insumo.name)
      })

      return insumoFilter

    }).filter((valorAtual) => {
      if (!pesquisaCnpj) {
        return true
      }
      const regex = new RegExp(pesquisaCnpj, "i")

      return regex.test(valorAtual.provider.cnpj)

    }).filter((valorAtual) => {
      if (!pesquisaDocType) {
        return true
      }
      const texto = pesquisaDocType.replace("e", "[eEéÉêÊèÈëË]", texto);

      const regex = new RegExp(texto, "i")

      return regex.test(valorAtual.document_type.name)
    }).filter((valorAtual) => {
      if (!pesquisaNota) {
        return true
      }

      const regex = new RegExp(pesquisaNota, "i")

      return regex.test(valorAtual.nota_fiscal)
    })

    // console.log("Meu log resultFilter", resultFilter)

  // .filter((valorAtual) => {
  //   const newStatus = valorAtual.status

  //   if (estado === true) return true
  //   return newStatus === estado
  // })


  function handleOpenModal() {
    setIsAddModal(true);
    // console.log('chamou handleOpen')
  }

  function handleCloseModal() {
    setIsAddModal(false);
    listagemOc();
    setParcelas([])
  }


 // console.log('teste',teste)

  console.log("User Listagem", user)

  // console.log('user = = =',user)
  async function aprovarOc(item) {
    const data = {
      id: item.id,
      status: true,
      payment_status: false,
      expire: "",
      user: user.id,
      value: "",
      name: "",
      document_type: "",
      contract_reference: "",
      observation: "",
      discount: "",
      provider: "",
      nota_fiscal: "",
      nome_banco: "",
	    data_pagamento: "",
    }

    console.log("Data Req", data)

    
    if (user.category?.name === 'Desenvolvimento' || user.category?.name === 'Master' || user.category?.name === 'Desenvolvimento') {
      await axios.put('https://app-facil-1cc4efc41cdc.herokuapp.com/finance/edit_cost_center/', data)

      try {
        console.log("Caiu no aprova OC")
        listagemOc();
        toast.success('Ordem de Compra aprovada!');

      } catch (error) {
        console.log('ERRO ListagemOC =', error);
        toast.error('Erro ao aprovar Ordem de Compra!')
      }

    } else {
      toast.error('Usuário não autorizado!')

    }

  }

  async function avancaPage() {
    if (page < maxPage) {
      //chama funcao de listagem passanto page +1
      console.log('caiu nos 200 avancar')
      const result = await axios.get('https://app-facil-1cc4efc41cdc.herokuapp.com/finance/list_all_cost_center/?page=' + `${page + 1}` + '&status=False')
      try {
        setListaOc(result.data.list_cost_center)
        setMaxPage(result.data.pagination.pages)
        setCount(result.data.pagination.count)
        setPage(page + 1)
      } catch (error) {
        console.log('MEU ERRO ListagemOC =', error);
      }
    } else {
      toast.warning('Não existe outra página')
    }
  }

  async function voltaPage() {

    if (page !== 1) {
      //chama funcao de listagem passanto page -1
      console.log('caiu nos 200 avancar')
      const result = await axios.get('https://app-facil-1cc4efc41cdc.herokuapp.com/finance/list_all_cost_center/?page=' + `${page - 1}` + '&status=False')
      try {
        setListaOc(result.data.list_cost_center)
        setMaxPage(result.data.pagination.pages)
        setCount(result.data.pagination.count)
        setPage(page - 1)
      } catch (error) {
        console.log('MEU ERRO ListagemOC =', error);
      }
    } else {
      toast.warning('Não existe outra página')
    }
  }

  // console.log('resultFilter.length', resultFilter.length)
  // console.log("fornecedorLista - - - - - - - - -",fornecedorLista);

  const ComponentToPrint = React.forwardRef((props, ref) => {
    return (
      <ContainerDoc ref={ref} >
        <BarDoc></BarDoc>
        <LineDocRow style={{ justifyContent: "space-between" }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <TitleDoc>Fornecedor:</TitleDoc>
            <DescriptionDoc>{fornecedor}</DescriptionDoc>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <TitleDoc>Situação:</TitleDoc>
            <DescriptionDoc>{status ? ('Aprovado') : ('Não Aprovado')}</DescriptionDoc>
          </div>

          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <TitleDoc>Numero OC:</TitleDoc>
            <DescriptionDoc>{"ID_OC"}</DescriptionDoc>
          </div>
        </LineDocRow>
        <LineDocRow>
          <TitleDoc>Data:</TitleDoc>
          <DescriptionDoc>{"Data_Criacao"}</DescriptionDoc>
        </LineDocRow>

        <LineDocRow>
          <TitleDoc>Estabelecimento:</TitleDoc>
          <DescriptionDoc>{"Estabelecimento"}</DescriptionDoc>
        </LineDocRow>

        <LineDocRow>
          <TitleDoc>Centro de resultados:</TitleDoc>
          <DescriptionDoc>{"Centro_de_resultados"}</DescriptionDoc>
        </LineDocRow>

        <LineDocRow>
          <TitleDoc>OBS:</TitleDoc>
          <DescriptionDoc>{"Observacoes"}</DescriptionDoc>
        </LineDocRow>
        <BarDoc style={{ marginTop: 10 }}></BarDoc>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between" }}>
          <LineDocColumn>
            <TitleDoc>Item</TitleDoc>
            <DescriptionDoc style={{ marginLeft: 0 }}>{"ID_Insumo"}</DescriptionDoc>
          </LineDocColumn>

          <LineDocColumn>
            <TitleDoc>Descricao</TitleDoc>
            <DescriptionDoc style={{ marginLeft: 0 }}>{"Tipo_Material"}</DescriptionDoc>
          </LineDocColumn>

          <LineDocColumn>
            <TitleDoc>UN</TitleDoc>
            <DescriptionDoc style={{ marginLeft: 0 }}>{"Unidade_medida"}</DescriptionDoc>
          </LineDocColumn>

          <LineDocColumn>
            <TitleDoc>QTDE</TitleDoc>
            <DescriptionDoc style={{ marginLeft: 0 }}>{"Quantidade"}</DescriptionDoc>
          </LineDocColumn>

          <LineDocColumn>
            <TitleDoc>Vlr Unit</TitleDoc>
            <DescriptionDoc style={{ marginLeft: 0 }}>{"Valor_Unitario"}</DescriptionDoc>
          </LineDocColumn>

          <LineDocColumn>
            <TitleDoc>Total</TitleDoc>
            <DescriptionDoc style={{ marginLeft: 0 }}>{"Valor_Total"}</DescriptionDoc>
          </LineDocColumn>
        </div>
        <BarDoc style={{ marginTop: 10 }}></BarDoc>


        <TitleDoc style={{ textDecorationLine: "underline" }}>Vencimentos</TitleDoc>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "flex-start" }}>
          <LineDocColumn style={{ marginRight: 70 }}>
            <TitleDoc style={{ marginTop: 10 }}>Data</TitleDoc>
            <DescriptionDoc style={{ marginLeft: 0 }}>{"Data_vencimento"}</DescriptionDoc>
          </LineDocColumn>

          <LineDocColumn>
            <TitleDoc style={{ marginTop: 10 }}>Valor</TitleDoc>
            <DescriptionDoc style={{ marginLeft: 0 }}>{"valor_Pagar"}</DescriptionDoc>
          </LineDocColumn>
        </div>

        <BarDoc style={{ marginTop: 10 }}></BarDoc>


      </ContainerDoc>
    );
  });

  const Example = () => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });

    return (
      <div>
        <div style={{ display: "none" }}>
          <ComponentToPrint ref={componentRef} />
        </div>
        <button onClick={handlePrint}>Print this out!</button>
      </div>
    );
  };

  // console.log("setParcelas", parcelas)
  // console.log("resultFilter", resultFilter)

  

  return (
    <Container>
      {!domLoaded ? (
        <>
          <SideBar />
          <ContentArea>
            <AreaCampos>
              <HeaderAreaCampos>
                <Title>Listagem Ordem Compra</Title>
              </HeaderAreaCampos>
              {/* <Example /> */}

              <div style={{ display: "flex", flexDirection: "row", marginTop: 30, backgroundColor: "transparent", marginLeft: 10 }}>
                <AreaSelectVenvimento>
                  <SelectVencimento
                    name="dia"
                    value={dia}
                    onChange={(e) => setDia(e.target.value)}
                  >
                    <option value="">Dia do vencimento</option>
                    {ListaDia.map((item) => {
                      return (
                        <option value={item}>{item}</option>
                      )
                    })}
                  </SelectVencimento>
                </AreaSelectVenvimento>

                <AreaSelectVenvimento style={{ marginLeft: 30 }}>
                  <SelectVencimento
                    name="vencimento"
                    value={mes}
                    onChange={(e) => setMes(e.target.value)}
                  >
                    <option value="">Mês do vencimento</option>
                    <option value="01">Janeiro</option>
                    <option value="02">Fevereiro</option>
                    <option value="03">Março</option>
                    <option value="04">Abril</option>
                    <option value="05">Maio</option>
                    <option value="06">Junho</option>
                    <option value="07">Julho</option>
                    <option value="08">Agosto</option>
                    <option value="09">Setembro</option>
                    <option value="10">Outubro</option>
                    <option value="11">Novembro</option>
                    <option value="12">Dezembro</option>
                  </SelectVencimento>
                </AreaSelectVenvimento>

                <AreaSelectVenvimento style={{ marginLeft: 30 }}>
                  <SelectVencimento
                    name="ano"
                    value={ano}
                    onChange={(e) => setAno(e.target.value)}
                  >
                    <option value="">Ano do vencimento</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                    <option value="2030">2030</option>
                    <option value="2031">2031</option>
                    <option value="2032">2032</option>
                    <option value="2033">2033</option>
                  </SelectVencimento>
                </AreaSelectVenvimento>

                <AreaSelectVenvimento style={{ marginLeft: 30 }}>
                  <SelectVencimento
                    name="Fornecedor"
                    value={fornecedorFilter}
                    onChange={(e) => setFornecedorFilter(e.target.value)}
                  >
                    <option value="">Fornecedor</option>
                    {fornecedorLista?.map((item) => {
                      return (
                        // <div key={item.id}>
                        <option value={item}>{item}</option>
                        // </div>
                      )
                    })}
                  </SelectVencimento>
                </AreaSelectVenvimento>
              </div>
              <div style={{ display: "flex", flexDirection: "row", marginTop: 10, backgroundColor: "transparent", marginLeft: 0 }}>
                <AreaSelectVenvimento style={{ marginLeft: 10, marginTop: 10, height: 45 }}>
                  <PesquisaInsumo
                    type={"text"}
                    placeholder="Pesquise por insumo"
                    value={pesquisa}
                    onChange={(e) => setPesquisa(e.target.value)}
                  />
                </AreaSelectVenvimento>

                <AreaSelectVenvimento style={{ marginLeft: 30, marginTop: 10, height: 45 }}>
                  <PesquisaInsumo
                    type={"text"}
                    placeholder="Pesquise CNPJ fornecedor"
                    value={pesquisaCnpj}
                    onChange={(e) => setPesquisaCnpj(e.target.value)}
                  />
                </AreaSelectVenvimento>

                <AreaSelectVenvimento style={{ marginLeft: 30, marginTop: 10, height: 45 }}>
                  <PesquisaInsumo
                    type={"text"}
                    placeholder="Pesquise tipo documento"
                    value={pesquisaDocType}
                    onChange={(e) => setPesquisaDocType(e.target.value)}
                  />
                </AreaSelectVenvimento>

                <AreaSelectVenvimento style={{ marginLeft: 30, marginTop: 10, height: 45 }}>
                  <PesquisaInsumo
                    type={"text"}
                    placeholder="Pesquise por nota fiscal"
                    value={pesquisaNota}
                    onChange={(e) => setPesquisaNota(e.target.value)}
                  />
                </AreaSelectVenvimento>
              </div>

              <div style={{ overflow: "none", overflowY: "auto", display: "flex", flexDirection: "column", marginBottom: 45, margin: "0px 10px 0px 10px" }} >

                {
                  resultFilter.length ? (
                    <Table>
                      <Thead>
                        <tr>
                          <Thh>Número</Thh>
                          <Thh>Data criação</Thh>
                          <Thh>Data vencimento</Thh>
                          <Thh>Fornecedor</Thh>
                          <Thh>Estabelecimento</Thh>
                          <Thh>Centro de resultado</Thh>
                          <Thh>Valor</Thh>
                          <Thh>Status</Thh>
                        </tr>
                      </Thead>
                      <tbody>

                        {
                          resultFilter.map((item, index) => (
                            <Trr key={index}>
                              <Tdd>
                                <BtnListOc onClick={() => {
                                  handleOpenModal();
                                  setDataCriacao(item.created_at.split('-').reverse().join('-'));
                                  setDataVencimento(item.expire_at.split('-').reverse().join('-'));
                                  setDocumento(item.document_type?.name)
                                  setCentroResultado(item.contract_reference?.name);
                                  setEstabelecimento(item.name);
                                  setValor(item.value);
                                  setCheck(check);
                                  setObs(item.observation)
                                  setIdOc(item.id)
                                  setNota(item.nota_fiscal)
                                  setStatus(item.payment_status)
                                  setFornecedor(item.provider.company_name + " " + "(" + item.provider.cnpj + ")")
                                  setValorDesconto(item.discount)
                                  setInsumos(item.insumos_fk)
                                  setParcelas(item.installment_fk)
                                  setPaymentParcela(item.installment_fk.payment)
                                  setBanco(item.nome_banco)
                                  setDataPagamento(item.data_pagamento)
                                }}>
                                  {item.id}
                                </BtnListOc>
                              </Tdd>
                              <Tdd>{item.created_at.split('-').reverse().join('-')}</Tdd>
                              <Tdd>{item.expire_at.split('-').reverse().join('-')}</Tdd>
                              <Tdd>{item.provider?.company_name}</Tdd>

                              <Tdd>{item.name}</Tdd>
                              <Tdd>{item.contract_reference?.name}</Tdd>
                              <Tdd>{(item.value)}</Tdd>
                              <Tdd>
                                {item.status === false ?
                                  (
                                    <BtnAprovar onClick={() => aprovarOc(item)}>
                                      <TdCheck>{"Aprovar"}</TdCheck>
                                    </BtnAprovar>

                                  ) : (
                                    <BtnAprovado style={{ marginLeft: 50 }}>
                                      <TdText>{"Aprovado"}</TdText>
                                    </BtnAprovado>
                                  )}

                              </Tdd>
                            </Trr>
                          )

                          )
                        }
                      </tbody>
                      <ModalOcEdit
                        handleCloseModal={handleCloseModal}
                        isAddModal={isAddModal}
                        dataCriacao={dataCriacao}
                        setDataCriacao={setDataCriacao}
                        dataVencimento={dataVencimento}
                        setDataVencimento={setDataVencimento}
                        documento={documento}
                        setDocumento={setDocumento}
                        despesa={despesa}
                        setDespesa={setDespesa}
                        estabelecimento={estabelecimento}
                        setEstabelecimento={setEstabelecimento}
                        centroResultado={centroResultado}
                        setCentroResultado={setCentroResultado}
                        valor={valor}
                        setValor={setValor}
                        obs={obs}
                        setObs={setObs}
                        check={check}
                        setCheck={setCheck}
                        idOc={idOc}
                        idUser={idUser}
                        nota={nota}
                        setNota={setNota}
                        setFornecedor={setFornecedor}
                        fornecedor={fornecedor}
                        setValorDesconto={setValorDesconto}
                        valorDesconto={valorDesconto}
                        setInsumos={setInsumos}
                        insumos={insumos}
                        setParcelas={setParcelas}
                        parcelas={parcelas}
                        paymentParcela={paymentParcela}
                        setPaymentParcela={setPaymentParcela}
                        ListagemOCCheck={true}
                      />

                    </Table>
                  ) :
                    (resultFilter === [] ? (<></>) :
                      <AreaImg>
                        <Image src={imgNotFound} />
                        <TextImg>Ordem de compra não encontrada !</TextImg>
                      </AreaImg>
                    )
                }
              </div>
            
              <AreaBtnPagination>
                <BtnVoltar onClick={() => voltaPage()}>
                  <BtnTexto>Voltar</BtnTexto>
                </BtnVoltar>
                <PageText>{page}</PageText>
                <BtnAvancar onClick={() => avancaPage()}>
                  <BtnTexto>Avançar</BtnTexto>
                </BtnAvancar>
              </AreaBtnPagination>

            </AreaCampos>
          </ContentArea>

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
