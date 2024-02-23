import { useContext, useEffect, useState } from "react";
import { Load } from "../../../components/load";
import { AuthContext } from "../../../contexts/AuthContext";
import { OcContext } from "../../../contexts/OcContext";
import { AreaBtnPagination, AreaCampos, AreaImg, AreaSelectVenvimento, BtnAprovado, BtnAprovar, BtnAvancar, BtnListOc, BtnPago, BtnTexto, BtnVoltar, Container, ContentArea, HeaderAreaCampos, PageText, PesquisaInsumo, SelectVencimento, Table, TdCheck, Tdd, TdText, TextImg, Thh, Title, Trr } from "./styles";
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

export default function CentroCustoAp() {
  const { user } = useContext(AuthContext)
  const { listagemOcAprovada, parcelas, setParcelas } = useContext(OcContext)

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
  const [listaOc, setListaOc] = useState([]);
  const [pesquisaNota, setPesquisaNota] = useState("");

  const [insumos, setInsumos] = useState([]);
  // const [parcelas, setParcelas] = useState([]);
  const [pesquisaDocType, setPesquisaDocType] = useState("");
  const [pesquisaCnpj, setPesquisaCnpj] = useState("");
  const [fornecedorFilter, setFornecedorFilter] = useState("");
  const [fornecedorLista, setFornecedorLista] = useState([]);


  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState('')
  const [count, setCount] = useState(0)
  const [idOc, setIdOc] = useState("")
  const [nota, setNota] = useState("")
  const [status, setStatus] = useState()
  const [fornecedor, setFornecedor] = useState("")
  const [valorDesconto, setValorDesconto] = useState("")
  const [paymentParcela, setPaymentParcela] = useState();
  const [idUser, setIdUser] = useState();

  const [dataPagamento, setDataPagamento] = useState("");
  const [banco, setBanco] = useState("");
  const [pathName, setPathName] = useState("");



  useEffect(() => {
    listagemFornecedor();
    listagemOc();
    setPathName(window.location.pathname) // /CentroCusto/ListagemOcPaga

  }, [])

  // async function listaFornecedor() {
  //   setDomLoaded(true);
  //   const result = await axios.get('https://app-facil-1cc4efc41cdc.herokuapp.com/finance/list_providers/ ')

  //   try {
  //     const arrayComRepeticao = result.data.list_providers;
  //     const arraySemRepeticao = [];

  //     arrayComRepeticao.forEach((item) => {
  //       if (arraySemRepeticao.indexOf(item.company_name) === -1) {
  //         console.log('id =', item.company_name)
  //         arraySemRepeticao.push(item.company_name);
  //       }
  //     });
  //     console.log('arrayFilter', arraySemRepeticao)

  //     setFornecedorLista(arraySemRepeticao)
  //     setDomLoaded(false);
  //     // console.log("testando listagem fornecedor filter", result.data.list_providers)

  //   } catch (error) {
  //     console.log('MEU ERRO ListagemFornecedor =', error);
  //     setDomLoaded(false);
  //   }
  // }

  async function listagemFornecedor() {
    //setDomLoaded(true);
    try {
      const response = await api.get('/list-fornecedor')
      //console.log('MEU RESPONSE', response.data)
      setListaFornecedor(response.data);
      setDomLoaded(false);

    } catch (err) {
      //window.alert('Atenção', 'Erro.')
      console.log('MEU ERRO Listagem fornecedor =', err);
      //setDomLoaded(false);
    }
  }

  console.log("fornecedorLista", fornecedorLista)


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
    })
    .filter((valorAtual) => {
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
  // .filter((valorAtual) => {

  //   const payment = valorAtual.payment_status 
  //   if (payment === false) return true

  // })


  function handleOpenModal() {
    setIsAddModal(true);
    console.log('chamou handleOpen')
  }

  function handleCloseModal() {
    setIsAddModal(false);
    window.location.reload()
  }


  // async function listagemOcPaga() {
  //   setDomLoaded(true);
  //   const result = await axios.get('https://app-facil-1cc4efc41cdc.herokuapp.com/finance/list_payed_cost_center/')

  //   try {
  //     console.log('CAIU NOS 200 OC APROVADAS')
  //     setListaOc(result.data.list_cost_center)
  //     setDomLoaded(false);
  //   } catch (error) {
  //     console.log('CAIU NO ERRO OC APROVADAS')
  //     console.log('MEU ERRO ListagemOC =', error);
  //   }
  // }

  async function listagemOc() {
    setDomLoaded(true);
    try {
      const response = await api.get(`/list-centro-custo?page=${page}&pageSize=${10}`)

      setListaOc(response.data)
      setIdUser(user.id)
      setDomLoaded(false);
    } catch (error) {
      console.log('MEU ERRO ListagemOC =', error);
      setDomLoaded(false);
    }
  }

  async function avancaPage() {
    if (page < maxPage) {
      //chama funcao de listagem passanto page +1
      console.log('caiu nos 200 avancar')
      const result = await axios.get('https://app-facil-1cc4efc41cdc.herokuapp.com/finance/list_cost_center_true/?page=' + `${page + 1}`)
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
      const result = await axios.get('https://app-facil-1cc4efc41cdc.herokuapp.com/finance/list_cost_center_true/?page=' + `${page - 1}`)
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
                <Title>Listagem Ordem Compra Paga</Title>
              </HeaderAreaCampos>

              <div style={{ display: "flex", flexDirection: "row", marginTop: 30, marginLeft: 10, marginRight: 10, justifyContent: "space-between" }}>
                <AreaSelectVenvimento>
                  <SelectVencimento
                    name="dia"
                    value={dia}
                    onChange={(e) => setDia(e.target.value)}
                  >
                    <option value="">Dia do pagamento</option>
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
                          <Thh>Data pagamento</Thh>
                          {/* <Thh>Estabelecimento</Thh> */}
                          <Thh>Centro de resultado</Thh>
                          <Thh>Valor</Thh>
                          <Thh>Status</Thh>
                        </Trr>
                        {
                          resultFilter.filter(item => item.payment_status).map((item, index) => (
                            //resultFilter.map((item, index) => (
                            // setInsumos(item.insumos_fk),
                            console.log('resultFilter', resultFilter),
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
                              <Tdd>{item.expire.split('-').join('-')}</Tdd>
                              <Tdd>{item.fornecedor_cc.company_name}</Tdd>
                              <Tdd>{item.date_payment}</Tdd>
                              {/* <Tdd>{item.name}</Tdd> */}
                              <Tdd>{item.centroResultado?.name}</Tdd>
                              <Tdd>{formatarNumeroParaPadraoMoeda(item.value)}</Tdd>
                              <Tdd>
                                {item.payment_status === false ?
                                  (
                                    <BtnPago onClick={() => aprovarOc(item)}>
                                      {/* <input value={check} type="checkbox" onChange={()=> modalCheck() } /> */}
                                      <TdCheck>{"Aprovar"}</TdCheck>
                                    </BtnPago>

                                  ) : (
                                    <BtnPago>
                                      {/* <input value={check} type="checkbox" onChange={()=> modalCheck() } /> */}
                                      <TdText>{"Pago"}</TdText>
                                    </BtnPago>
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
                        idUser={user.id}
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
                        dataPagamento={dataPagamento}
                        banco={banco}
                        setBanco={setBanco}
                        disableAction
                      />
                    </Table>
                  ) :
                    (<AreaImg>
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