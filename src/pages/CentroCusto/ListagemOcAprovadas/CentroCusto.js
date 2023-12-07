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


const ListaDia = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
  '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26',
  '27', '28', '29', '30', '31']


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

  console.log("listaOc",listaOc)

const dataPg = new Date().toLocaleDateString()
  // console.log("Data", dataPg)


  // const resultFilter = listaOc
  //   .filter((valorAtual) => {

  //     const newDay = valorAtual.expire_at.split('-').reverse().join('-')
  //     const day = newDay.split('-')[0]
  //     if (dia === '') return true
  //     return day === dia

  //   })
  //   .filter((valorAtual) => {
  //     const newMonth = valorAtual.expire_at.split('-').reverse().join('-')
  //     const month = newMonth.split('-')[1]
  //     if (mes === '') return true
  //     return month === mes

  //   }).filter((valorAtual) => {

  //     const NewYear = valorAtual.expire_at.split('-').reverse().join('-')
  //     const year = NewYear.split('-')[2]
  //     if (ano === '') return true
  //     return year === ano

  //   }).filter((valorAtual) => {
  //     const newpayment = valorAtual.payment_status

  //     if (pago === true) return true
  //     return newpayment === pago
  //   })

  const resultFilter = listaOc
    .filter((oc) => {
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
    }).filter((oc) => {
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

      const payment = valorAtual.payment_status
      if (payment === false) return true

    })


  useEffect(() => {
    // listagemOcAprovada();
    listaFornecedor();

  }, [])

  async function listaFornecedor() {
    setDomLoaded(true);
    const result = await axios.get('https://app-facil-1cc4efc41cdc.herokuapp.com/finance/list_providers/ ')

    try {
      setFornecedorLista(result.data.list_providers)
      setDomLoaded(false);
      // console.log("testando listagem fornecedor filter", result.data.list_providers)

    } catch (error) {
      console.log('MEU ERRO ListagemFornecedor =', error);
      setDomLoaded(false);
    }
  }

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



  async function pagarOc(item) {
    const data = {
      id: item.id,
      status: true,
      payment_status: true,
      expire: "",
      user: user.id,
      value: "",
      name: "",
      nota_fiscal: "",
      document_type: "",
      contract_reference: "",
      observation: "",
      discount: "",
      provider: "",
      nome_banco: "",
	    data_pagamento: dataPg.replace(/\//g, "-")
    }

    console.log("data pagar OC", data.data_pagamento)

    if (user.category?.name === 'Desenvolvimento' || user.category?.name === 'Master') {
      await axios.put('https://app-facil-1cc4efc41cdc.herokuapp.com/finance/edit_cost_center/', data)

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

  // const temBooleanVerdadeiro = resultFilter.some(item => item.installment_fk);  
  // console.log("temBooleanVerdadeiro",temBooleanVerdadeiro)
  
  // Verifica se algum objeto no array tem a propriedade 'installment_fk' com valor verdadeiro
    function verificaPagamento(item) {
      const pg = item.installment_fk;
      const verifyPg = pg.every(params => params.payment) //verifica se todos os objetos tem paymente true

      // console.log("item.installment_fk",item.installment_fk )
      // console.log("teste fk", pg, verifyPg )

      if(verifyPg === true){
        listagemOcAprovada();
        pagarOc(item);
        // toast.success('Nao existe parcelas em aberto!')
        return

      }
      return toast.warning('Existem parcela(s) em aberto!')
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

              <div style={{ display: "flex", flexDirection: "row", marginTop: 30, backgroundColor: "transparent", marginLeft: 10 }}>
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
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                    <option value="2030">2030</option>
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
                        <option key={item.id} value={item.company_name}>{item.company_name}</option>
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
              </div>

              <div style={{ overflow: "none", display: "flex", flexDirection: "column", overflowY: "auto", marginBottom: 0, margin: "0px 10px 0px 10px" }} >
                {
                  resultFilter.length ? (
                    <Table>
                      <tbody>
                        <Trr>
                          <Thh>Número</Thh>
                          <Thh>Data criação</Thh>
                          <Thh>Data vencimento</Thh>
                          <Thh>Documento</Thh>
                          {/* <Thh>Despesa</Thh> */}
                          <Thh>Estabelecimento</Thh>
                          <Thh>Centro de resultado</Thh>
                          <Thh>Valor</Thh>
                          <Thh>Status</Thh>
                        </Trr>
                        {
                          resultFilter.map((item, index) => (
                            console.log('resultFilter', resultFilter),
                            // console.log("valor", item.value),
                            // console.log("valor formatado", parseFloat(item.value).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })),
                            <Trr key={index}>
                              <Tdd>
                                <BtnListOc onClick={() => {
                                  handleOpenModal();
                                  setDataCriacao(item.created_at.split('-').reverse().join('-'));
                                  setDataVencimento(item.expire_at.split('-').reverse().join('-'));
                                  setDocumento(item.document_type.name)
                                  setCentroResultado(item.contract_reference.name);
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
                                }}>
                                  {item.id}
                                </BtnListOc>
                              </Tdd>
                              <Tdd>{item.created_at.split('-').reverse().join('-')}</Tdd>
                              <Tdd>{item.expire_at.split('-').reverse().join('-')}</Tdd>
                              <Tdd>{item.document_type.name}</Tdd>
                              {/* <Tdd>{item.expense.name}</Tdd> */}
                              <Tdd>{item.name}</Tdd>
                              <Tdd>{item.contract_reference.name}</Tdd>
                              <Tdd>{(item.value)}</Tdd>
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
        )}
    </Container>
  )
}