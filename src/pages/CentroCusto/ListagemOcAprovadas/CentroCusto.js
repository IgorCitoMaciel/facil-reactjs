import { useContext, useEffect, useState } from "react";
import { Load } from "../../../components/load";
import { AuthContext } from "../../../contexts/AuthContext";
import { OcContext } from "../../../contexts/OcContext";
import { AreaBtnPagination, AreaCampos, AreaImg, AreaSelectVenvimento, BtnAprovado, BtnAprovar, BtnAvancar, BtnListOc, BtnTexto, BtnVoltar, Container, ContentArea, HeaderAreaCampos, PageText, PesquisaInsumo, SelectVencimento, Table, TdCheck, Tdd, TdText, TextImg, Thh, Title, Trr } from "./styles";
import axios from "axios";
import SideBar from "../../../components/sideBar";
import { ModalOcEdit } from "../../../components/modalOcEdit";
import Image from "next/image";
import imgNotFound from '../../../../public/not.png';
import { toast } from "react-toastify";
import { api } from "../../../services/apiClient";


const ListaDia = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
  '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26',
  '27', '28', '29', '30', '31']

  const meses = [
    { valor: '01', nome: 'Janeiro' },
    { valor: '02', nome: 'Fevereiro' },
    { valor: '03', nome: 'Março' },
    { valor: '04', nome: 'Abril' },
    { valor: '05', nome: 'Maio' },
    { valor: '06', nome: 'Junho' },
    { valor: '07', nome: 'Julho' },
    { valor: '08', nome: 'Agosto' },
    { valor: '09', nome: 'Setembro' },
    { valor: '10', nome: 'Outubro' },
    { valor: '11', nome: 'Novembro' },
    { valor: '12', nome: 'Dezembro' },
  ];


export function CentroCusto() {
  const { user } = useContext(AuthContext)
  const [domLoaded, setDomLoaded] = useState(true);
  const [dia, setDia] = useState('');
  const [mes, setMes] = useState('');
  const [ano, setAno] = useState('');
  const [pesquisa, setPesquisa] = useState('');
  const [isAddModal, setIsAddModal] = useState(false);
  const [dataCriacao, setDataCriacao] = useState('');
  const [dataVencimento, setDataVencimento] = useState('');
  const [despesa, setDespesa] = useState('');
  const [documento, setDocumento] = useState('');
  const [centroResultado, setCentroResultado] = useState('');
  const [estabelecimento, setEstabelecimento] = useState('');
  const [valor, setValor] = useState('');
  const [check, setCheck] = useState(false);
  const [obs, setObs] = useState('');
  const [pesquisaNota, setPesquisaNota] = useState("");
  // const [listaOc, setListaOc] = useState([]);
  const [pago, setPago] = useState(false);
  // const [page, setPage] = useState(1);
  // const [maxPage, setMaxPage] = useState('')
  // const [count, setCount] = useState(0)
  const [idOc, setIdOc] = useState('');
  const [nota, setNota] = useState("");
  const [fornecedor, setFornecedor] = useState("");
  const [status, setStatus] = useState(false);

  const [insumos, setInsumos] = useState([]);
  // const [parcelas, setParcelas] = useState([]);

  const [pesquisaCnpj, setPesquisaCnpj] = useState("");
  const [pesquisaDocType, setPesquisaDocType] = useState("");
  const [fornecedorFilter, setFornecedorFilter] = useState("");
  const [fornecedorLista, setFornecedorLista] = useState([]);

  const [idUser, setIdUser] = useState(user.id);
  const [paymentParcela, setPaymentParcela] = useState();
  const [valorDesconto, setValorDesconto] = useState('');

  const { listaOc, listagemOcAprovada, count, maxPage, page, parcelas, setParcelas } = useContext(OcContext)

  const dataPg = new Date().toLocaleDateString()

  const resultFilter = listaOc
    .filter((oc) => {
      const installment = oc.parcelas
      if (!installment.length) {
        return !installment.length && !dia // quando nao tiver ambos, retorna true(mostra todos) 
      }

      const installmentFilter = installment.some((item) => {
        const newDay = item.data_vencimento.split('-').join('-')
        const day = newDay.split('-')[0]

        if (dia === '') return true
        return day === dia
      })
      return installmentFilter
    })
    .filter((oc) => {
      const installment = oc.parcelas
      if (!installment.length) {
        return !installment.length && !mes // quando nao tiver, retorna true(mostra todos) 
      }

      const installmentFilter = installment.some((item) => {
        const newMonth = item.data_vencimento.split('-').reverse().join('-')
        const month = newMonth.split('-')[1]

        if (mes === '') return true
        return month === mes
      })
      return installmentFilter

    }).filter((valorAtual) => {
      const newYear = valorAtual.expire.split('-').join('-')
      const year = newYear.split('-')[2]

      if (ano === '') return true
      return year === ano
    })
    .filter((valorAtual) => {
      const provider = valorAtual.fornecedor_cc.company_name
      // console.log("Meu Provider aqui...",provider/fornecedor)

      if (fornecedorFilter === '') return true
      return fornecedorFilter === provider

    }).filter((valorAtual) => {
      if (!pesquisa) {
        return true
      }
      const insumoFilter = valorAtual.insumos.some((insumo) => {
        const regex = new RegExp(pesquisa, "gi")
        if (!insumo.name) {
          return false
        }
        return regex.test(insumo.name)
      })

      return insumoFilter

    })
    .filter((valorAtual) => {
      if (!pesquisaCnpj || !valorAtual.fornecedor_cc) {
        return true;
      }
      return valorAtual.fornecedor_cc.cnpj.startsWith(pesquisaCnpj);

    }).filter((valorAtual) => {
      if (!pesquisaDocType) {
        return true
      }
      const texto = pesquisaDocType.replace("e", "[eEéÉêÊèÈëË]", texto);

      const regex = new RegExp(texto, "i")

      return regex.test(valorAtual.document_type)
    }).filter((valorAtual) => {
      if (!pesquisaNota) {
        return true
      }

      const regex = new RegExp(pesquisaNota, "i")

      return regex.test(valorAtual.nota_fiscal)
    })


  useEffect(() => {
    // listagemOcAprovada();
    listaFornecedor();

  }, [])

  async function listaFornecedor() {
    setDomLoaded(true);

    try {
      const response = await api.get('/list-fornecedor', { timeout: 10000 }) // Tempo limite de 10 segundos
      const arrayComRepeticao = response.data;
      const arraySemRepeticao = [];

      arrayComRepeticao.forEach((item) => {
        if (arraySemRepeticao.indexOf(item.company_name) === -1) {
          arraySemRepeticao.push(item.company_name);
        }
      });

      setFornecedorLista(arraySemRepeticao)
      setDomLoaded(false);

    } catch (error) {
      console.log('MEU ERRO ListagemFornecedor =', error);
      setDomLoaded(false);
    }
  }

  //console.log("ForncedorLista", fornecedorLista)

  function handleOpenModal() {
    setIsAddModal(true);
    console.log('chamou handleOpen')
  }

  function handleCloseModal() {
    setIsAddModal(false);
  }

  const ListDay = () => {
    for (let i = 0; i <= 31; i++) {
      return i
    }
  }


console.log("Meu User OC Aprovadas",user)
  async function pagarOc(item) {
    const date_payment = new Date().toISOString().split('T')[0].split('-').reverse().join('-');
    const data = {
      id: item.id,
      payment_status: !item.payment_status,
      date_payment: date_payment
    }
    console.log("data pagar OC", data)

    if (user.userCategory?.name === 'Desenvolvimento' || user.userCategory?.name === 'admin') {
      await api.put('/update-centro-custo', data)

      try {
        listagemOcAprovada();
        toast.success('Ordem de Paga!');

      } catch (error) {
        console.log('ERRO ListagemOC =', error);
        toast.error('Erro ao pagar Ordem de Compra!')
      }
    } else {
      toast.error('Usuário não autorizado!')
    }
  }

  async function avancaPage() {
    if (page < maxPage) {
      //chama funcao de listagem passanto page +1
      console.log('caiu nos 200 avancar')
      const result = await axios.get('https://app-facil-1cc4efc41cdc.herokuapp.com/finance/list_all_cost_center/?page=' + `${page + 1}` + '&status=True')
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
      console.log('caiu nos 200 avancar')
      const result = await axios.get('https://app-facil-1cc4efc41cdc.herokuapp.com/finance/list_all_cost_center/?page=' + `${page - 1}` + '&status=True')
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


  // Verifica se algum objeto no array tem a propriedade 'parcelas' com valor verdadeiro
  function verificaPagamento(item) {
   // const pagamentoOc = item.payment_status;
    const verificaPagamentoParcelas = item.parcelas.every(params => params.pagamento) //verifica se todos os objetos tem paymente true
    console.log("item.parcelas = -= = =", item.parcelas)
    if (verificaPagamentoParcelas === true) {
      listagemOcAprovada();
      pagarOc(item);
      return

    }
    return toast.warning('Existem parcela(s) em aberto!')
  }

  function formatarNumeroParaPadraoMoeda(numero) {
    // transforma  o numero 1500.5 em um numero = 1.500,50
    //let num = numero.toFixed(2);
    let num = parseFloat(numero).toFixed(2);
    let str = num.toString().replace('.', ',');
    let partes = str.split(",");
    partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return partes.join(",");
  }

  

  return (
    <Container>
      {!domLoaded ? (
        <>
          <SideBar />
          <ContentArea>
            <AreaCampos>
              <HeaderAreaCampos>
                <Title>Listagem Ordem Compra Aprovadas</Title>
              </HeaderAreaCampos>

              <div style={{ display: "flex", flexDirection: "row", marginTop: 30, marginLeft: 10, marginRight: 10, justifyContent: "space-between" }}>
                <AreaSelectVenvimento>
                  <SelectVencimento
                    name="dia"
                    value={dia}
                    onChange={(e) => setDia(e.target.value)}
                  >
                    <option value="">Dia do vencimento</option>
                    {ListaDia.map((item) => {
                      return <option key={item} value={item}>{item}</option>
                    })}
                  </SelectVencimento>
                </AreaSelectVenvimento>

                <AreaSelectVenvimento style={{ marginLeft: 30 }}>
                  <SelectVencimento
                    name="vencimento"
                    value={mes}
                    onChange={(e) => setMes(e.target.value)}
                  >
                    <option value="">Mês do pagamento</option>
                    {meses.map((mes) => (
                      <option key={mes.valor} value={mes.valor}>
                        {mes.nome}
                      </option>
                    ))}
                  </SelectVencimento>
                </AreaSelectVenvimento>

                <AreaSelectVenvimento style={{ marginLeft: 30 }}>
                  <SelectVencimento
                    name="ano"
                    value={ano}
                    onChange={(e) => setAno(e.target.value)}
                  >
                    <option value="">Ano do vencimento</option>
                    {[...Array(21)].map((_, i) => {
                      const year = 2022 + i;
                      return <option key={year} value={year}>{year}</option>;
                    })}
                  </SelectVencimento>
                </AreaSelectVenvimento>

                <AreaSelectVenvimento style={{ marginLeft: 30 }}>
                  <SelectVencimento
                    name="Fornecedor"
                    value={fornecedorFilter}
                    onChange={(e) => setFornecedorFilter(e.target.value)}
                  >
                    <option value="">Fornecedor</option>
                    {fornecedorLista?.map((item, index) => {
                      return (
                        // <div key={item.id}>
                        <option key={index} value={item}>{item}</option>
                        // </div>
                      )
                    })}
                  </SelectVencimento>
                </AreaSelectVenvimento>
              </div>
              <div style={{ display: "flex", flexDirection: "row", marginTop: 10, backgroundColor: "transparent", marginLeft: 0, marginRight: 10, justifyContent: "space-between" }}>
                <AreaSelectVenvimento style={{ marginLeft: 10, marginTop: 10, height: 35 }}>
                  <PesquisaInsumo
                    type={"text"}
                    placeholder="Pesquise por insumo"
                    value={pesquisa}
                    onChange={(e) => setPesquisa(e.target.value)}
                  />
                </AreaSelectVenvimento>

                <AreaSelectVenvimento style={{ marginLeft: 30, marginTop: 10, height: 35 }}>
                  <PesquisaInsumo
                    type={"text"}
                    placeholder="Pesquise CNPJ fornecedor"
                    value={pesquisaCnpj}
                    onChange={(e) => setPesquisaCnpj(e.target.value)}
                  />
                </AreaSelectVenvimento>

                <AreaSelectVenvimento style={{ marginLeft: 30, marginTop: 10, height: 35 }}>
                  <PesquisaInsumo
                    type={"text"}
                    placeholder="Pesquise tipo documento"
                    value={pesquisaDocType}
                    onChange={(e) => setPesquisaDocType(e.target.value)}
                  />
                </AreaSelectVenvimento>

                <AreaSelectVenvimento style={{ marginLeft: 30, marginTop: 10, height: 35 }}>
                  <PesquisaInsumo
                    type={"text"}
                    placeholder="Pesquise por nota fiscal"
                    value={pesquisaNota}
                    onChange={(e) => setPesquisaNota(e.target.value)}
                  />
                </AreaSelectVenvimento>
              </div>

              <div style={{overflow: "none", display: "flex", flexDirection: "column", overflowY: "auto", margin: "30px 10px 0px 10px" }} >
                {
                  resultFilter.length ? (
                    <Table>
                      <tbody>
                        <Trr>
                          <Thh>Número</Thh>
                          <Thh>Data criação</Thh>
                          <Thh>Data vencimento</Thh>
                          <Thh>Fornecedor</Thh>
                          <Thh>Estabelecimento</Thh>
                          <Thh>Centro de resultado</Thh>
                          <Thh>Valor</Thh>
                          <Thh>Status</Thh>
                        </Trr>
                        {
                          //resultFilter.map((item, index) => (
                          resultFilter.filter(item => item.status).map((item, index) => (
                             console.log('resultFilter = = =', resultFilter),
                            <Trr key={index}>
                              <Tdd>
                                <BtnListOc onClick={() => {
                                  handleOpenModal();
                                  setDataCriacao(item.created_at.split('T')[0].split('-').reverse().join('-'));
                                  setDataVencimento(item.expire.split('-').join('-'));
                                  setDocumento(item.document_type)
                                  setCentroResultado(item.centroResultado?.name);
                                  setEstabelecimento(item.name);
                                  setValor(formatarNumeroParaPadraoMoeda(item.value));
                                  setCheck(check);
                                  setObs(item.observation)
                                  setIdOc(item.id)
                                  setNota(item.nota_fiscal)
                                  setStatus(item.payment_status)
                                  setFornecedor(item.fornecedor_cc.company_name + " " + "(" + item.fornecedor_cc.cnpj + ")")
                                  setValorDesconto(item.discount)
                                  setInsumos(item.insumos)
                                  setParcelas(item.parcelas)
                                  setPaymentParcela(item.parcelas.pagamento)
                                }}>
                                  {item.id}
                                </BtnListOc>
                              </Tdd>
                              <Tdd>{item.created_at.split('T')[0].split('-').reverse().join('-')}</Tdd>
                              <Tdd>{item.expire.split('-').reverse().reverse().join('-')}</Tdd>
                              <Tdd>{item.fornecedor_cc.company_name}</Tdd>
                              {/* <Tdd>{item.expense.name}</Tdd> */}
                              <Tdd>{item.name}</Tdd>
                              <Tdd>{item.centroResultado.name}</Tdd>
                              <Tdd>{formatarNumeroParaPadraoMoeda(item.value)}</Tdd>
                              <Tdd>
                                {item.payment_status === false ?
                                  (

                                    <BtnAprovar onClick={() => verificaPagamento(item)}>
                                      <TdCheck>{"Pagar"}</TdCheck>
                                    </BtnAprovar>

                                  ) : (
                                    <BtnAprovado >
                                      <TdText>{"Pago"}</TdText>
                                    </BtnAprovado>
                                  )}

                              </Tdd>
                            </Trr>
                          )

                          )}
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
                        // parcelas={parcelas}
                        paymentParcela={paymentParcela}
                        setPaymentParcela={setPaymentParcela}
                        listagemOcAprovada={listagemOcAprovada}



                      />
                    </Table>
                  ) :
                    (resultFilter.length === 0 ? (<></>) :
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
        )}
    </Container>
  )
}