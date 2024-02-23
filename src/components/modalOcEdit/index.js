import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { AreaInsumoModal, AreaSelectCC, BarDoc, BarTitle, BtnEditar, BtnExluir, BtnImprimir, BtnParcelaNaoPaga, BtnParcelaPaga, CardFooter, CardHeader, Container, ContainerDoc, DescriptionDoc, Input, InputModalOc, InputObs, InputOC, LineDocColumn, LineDocRow, SelectCC, TextData, TextList, Title, TitleDoc, TitleInput, TitleList } from "./styles";
import Modal from 'react-modal';
import CurrencyInput from 'react-currency-input-field';
import { useReactToPrint } from "react-to-print";
import { FiPrinter } from 'react-icons/fi'
import { OcContext } from "../../contexts/OcContext";
import { api } from "../../services/apiClient";


export function ModalOcEdit(props) {
  const [novaDataCriacao, setNovaDataCriacao] = useState('')
  const [novaListaParcelas, setNovaListaParcelas] = useState([])
  //const [estabelecimento, setEstabelecimento1] = useState(props.estabelecimento)

  const { user } = useContext(AuthContext)

  const { editParcela, parcelas } = useContext(OcContext)
  const [pathName, setPathName] = useState("");



  var estabelecimentoGG = props.estabelecimento
  var dataCriacao = props.dataCriacao
  var centroResutado = props.centroResultado
  var idOc = props.idOc
  var paymentParcela = props.paymentParcela


  const listaParcelas = parcelas

  const checkOc = props.ListagemOCCheck
  const listaParcelasLocal = props?.parcelas

  // console.log("novaListaParcelas", novaListaParcelas)
  //console.log("listaParcelasLocal", listaParcelasLocal)
  //console.log("listaParcelas", listaParcelas)

  useEffect(() => {
    setPathName(window.location.pathname)
  }, [])

  useEffect(() => {
    ordenaArray();
    // console.log('novaListaParcelas', novaListaParcelas)

  }, [listaParcelas])

  useEffect(() => {
    ordenaArray();

  }, [listaParcelasLocal])

  // function ordenaArray() {
  //   console.log('listaParcelas', listaParcelas)
  //  if (listaParcelas) {
  //     console.log("caiu no else if")
  //     const novaLista = listaParcelas?.sort((a, b) => {
  //       if (a.id < b.id) {
  //         return -1
  //       } else {
  //         return true;
  //       }
  //     })
  //     setNovaListaParcelas(novaLista)

  //   }
  // }


  function ordenaArray() {
    //console.log('listaParcelas', listaParcelas)
    if (checkOc) {
      //console.log("caiu no if", checkOc)
      if (listaParcelasLocal) {

        const novaListaLocal = listaParcelasLocal?.sort((a, b) => {
          if (a.id < b.id) {
            return -1
          } else {
            return true;
          }
        })
        setNovaListaParcelas(novaListaLocal)

      }

    }
    else if (listaParcelas) {
      //console.log("caiu no else if")
      const novaLista = listaParcelas?.sort((a, b) => {
        if (a.id < b.id) {
          return -1
        } else {
          return true;
        }
      })
      setNovaListaParcelas(novaLista)

    }
  }

  async function editOc(event) {
    event.preventDefault()

    const data = {
      id: props.idOc,
      payment_status: false,
      nota_fiscal: props.nota,
    }

    console.log('passei aqui', user)

    if (user.userCategory?.name === 'Desenvolvimento' || user.userCategory?.name === 'admin') {
      const result = await api.put(`/update-centro-custo`, data) 

      try {
        console.log('caiu aqui no EditCr', result);
        props.handleCloseModal();
        toast.success('Ordem de compra editado com sucesso!');

      } catch (error) {
        console.log('MEU ERRO EditCr =', error);
        toast.error('Erro ao editar ordem de compra!');

      }
    } else {
      toast.error('Usuário não autorizado!')

    }
  }

  async function deleteOc(event) {
    event.preventDefault()
    const data = {
      id: props.idOc.toString(),
      // name: props.estabelecimento
    }
    //console.log('passei aqui Delete OC = = =', data)
    //console.log('passei aqui Usuario OC = = =', user)

    if (user.userCategory?.name === 'Desenvolvimento' || user.userCategory?.name === 'admin') {
      const result = await api.delete(`/remove-centro-custo?id=${data.id}`)

      try {
        console.log('caiu aqui no EditCr', result);
        props.handleCloseModal();
        toast.success('Ordem de compra excluida com sucesso!');

      } catch (error) {
        console.log('MEU ERRO EditCr =', error);
        toast.error('Erro ao excluir ordem de compra!');

      }
    } else {
      toast.error('Usuário não autorizado!')

    }
  }

  const fornecedorPrint = props.fornecedor
  const statusPrint = props.status
  const idOcPrint = props.idOc
  const dataCriacaoPrint = props.dataCriacao
  const estabelecimentoPrint = props.estabelecimento
  const centroResutadoPrint = props.centroResultado
  const obsPrint = props.obs
  const insumosPrint = props.insumos
  const parcelasPrint = props.parcelas

  const valorDesconto = props.valorDesconto
  const valorTotalOcDenconto = props.valorTotalOcDenconto

  console.log("insumosPrint MODAL = = = =",valorTotalOcDenconto)

  function formatarNumeroParaPadraoMoeda(numero) {
    // transforma  o numero 1500.5 em um numero = 1.500,50
    //let num = numero.toFixed(2);
    let num = parseFloat(numero).toFixed(2);
    let str = num.toString().replace('.', ',');
    let partes = str.split(",");
    partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return partes.join(",");
  }


  const ComponentToPrint = React.forwardRef((props, ref) => {
    // console.log("Testando console - z- z - z -", fornecedorPrint)
    return (
      <ContainerDoc ref={ref} >
        <div style={{ alignItems: "center", display: "flex", flexDirection: "row" }}>
          <Title>{estabelecimentoPrint}</Title>
        </div>
        <BarDoc></BarDoc>
        <LineDocRow style={{ justifyContent: "space-between" }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <TitleDoc>Fornecedor:</TitleDoc>
            <DescriptionDoc>{fornecedorPrint}</DescriptionDoc>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <TitleDoc>Situação:</TitleDoc>
            <DescriptionDoc>{statusPrint ? ('Aprovado') : ('Não Aprovado')}</DescriptionDoc>
          </div>

          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <TitleDoc>Numero OC:</TitleDoc>
            <DescriptionDoc>{idOcPrint}</DescriptionDoc>
          </div>
        </LineDocRow>
        <LineDocRow>
          <TitleDoc>Data:</TitleDoc>
          <DescriptionDoc>{dataCriacaoPrint}</DescriptionDoc>
        </LineDocRow>

        <LineDocRow>
          <TitleDoc>Estabelecimento:</TitleDoc>
          <DescriptionDoc>{estabelecimentoPrint}</DescriptionDoc>
        </LineDocRow>

        <LineDocRow>
          <TitleDoc>Centro de resultados:</TitleDoc>
          <DescriptionDoc>{centroResutadoPrint}</DescriptionDoc>
        </LineDocRow>

        <LineDocRow>
          <TitleDoc>OBS:</TitleDoc>
          <DescriptionDoc>{obsPrint ? (obsPrint) : ("Sem Observações")}</DescriptionDoc>
        </LineDocRow>
        <BarDoc style={{ marginTop: 10 }}></BarDoc>

        {

          insumosPrint.map((item) => {
            return (
              <div key={item.id} style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between" }}>
                <LineDocColumn>
                  <TitleDoc>Nome</TitleDoc>
                  <DescriptionDoc style={{ marginLeft: 0 }}>{item.name}</DescriptionDoc>
                </LineDocColumn>

                <LineDocColumn>
                  <TitleDoc>Tipo de Material</TitleDoc>
                  <DescriptionDoc style={{ marginLeft: 0 }}>{item.material_type}</DescriptionDoc>
                </LineDocColumn>

                <LineDocColumn>
                  <TitleDoc>UN</TitleDoc>
                  <DescriptionDoc style={{ marginLeft: 0 }}>{item.und}</DescriptionDoc>
                </LineDocColumn>

                <LineDocColumn>
                  <TitleDoc>QTDE</TitleDoc>
                  <DescriptionDoc style={{ marginLeft: 2 }}>{item.amount}</DescriptionDoc>
                </LineDocColumn>

                <LineDocColumn>
                  <TitleDoc>Vlr Unit</TitleDoc>
                  <DescriptionDoc style={{ marginLeft: 0 }}>{"R$ " + formatarNumeroParaPadraoMoeda(item.unity_value)}</DescriptionDoc>
                </LineDocColumn>

                <LineDocColumn>
                  <TitleDoc>Total</TitleDoc>
                  <DescriptionDoc style={{ marginLeft: 0 }}>{"R$ " + formatarNumeroParaPadraoMoeda(item.total_value)}</DescriptionDoc>
                </LineDocColumn>
              </div>

            )
          })


        }
        <BarDoc style={{ marginTop: 10 }}></BarDoc>


        <TitleDoc style={{ marginBottom: 20 }}>VENCIMENTOS</TitleDoc>
        {
          parcelasPrint?.map((item) => {
            // console.log("parcelas Print ====",parcelasPrint)
            return (
              <div key={item.id} style={{ display: 'flex', flexDirection: 'row', justifyContent: "flex-start" }}>
                <LineDocColumn style={{ marginRight: 70 }}>
                  <TitleDoc style={{ marginTop: 10 }}>Parcela</TitleDoc>
                  <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <DescriptionDoc style={{ marginLeft: 0 }}>{item.number}</DescriptionDoc>
                  </div>
                </LineDocColumn>

                <LineDocColumn style={{ marginRight: 70 }}>
                  <TitleDoc style={{ marginTop: 10 }}>Data Vencimento</TitleDoc>
                  <DescriptionDoc style={{ marginLeft: 0 }}>{item.data_vencimento.split('-').reverse().join('-')}</DescriptionDoc>
                </LineDocColumn>

                <LineDocColumn>
                  <TitleDoc style={{ marginTop: 10 }}>Valor</TitleDoc>
                  <DescriptionDoc style={{ marginLeft: 0 }}>{parseFloat(item.value).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</DescriptionDoc>
                </LineDocColumn>
              </div>
            )
          })

        }


        <BarDoc style={{ marginTop: 10 }}></BarDoc>


      </ContainerDoc >
    );
  });

  const Imprimir = () => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });

    const imprimirModal = () => {
      handlePrint();
      props.handleCloseModal();
    }

    return (
      <div>
        <div style={{ display: "none" }}>
          <ComponentToPrint ref={componentRef} />
        </div>
        {/* <div style={{display:"flex", flexDirection:"row"}}> */}
        <BtnImprimir onClick={imprimirModal}>
          <FiPrinter size={20} />
          <h3>Imprimir</h3>
        </BtnImprimir>
        {/* </div> */}

      </div>
    );
  };

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
    <Modal
      ariaHideApp={false}
      overlayClassName="react-modal-overlay"
      className="react-modal-content2"
      isOpen={props.isAddModal}
      onRequestClose={props.handleCloseModal}
    >
      <button type="button" className="react-modal-close" onClick={props.handleCloseModal}>
        X
      </button>
      <Container>
        <h2>Ordem de compra</h2>
        <BarTitle></BarTitle>
        <div style={{ overflow: "auto", display: "flex", flexDirection: "column", height: "100%", width: "100%" }}>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', marginBottom: 20 }}>

            <div style={{ display: "flex", flexDirection: "row", width: 250, }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h1>Data de criação</h1>
                <p>{props.dataCriacao}</p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", width: 250, alignItems: "center", paddingRight: 60 }}>
              <div>
                <h1>Data de vencimento</h1>
                <p>{props.dataVencimento}</p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "row", width: 250, justifyContent: "flex-end", }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h1>Documento</h1>
                <p>{props.documento}</p>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', marginBottom: 20 }}>

            <div style={{ display: "flex", flexDirection: "column", width: 250 }}>
              <h1>Fornecedor</h1>
              <div style={{ display: "flex", flexDirection: "row", width: 250 }}>
                <p>{props.fornecedor}</p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", width: 250, alignItems: "center",paddingRight: 60 }}>
              <div>
                <h1>Centro de resultado</h1>
                <p>{props.centroResultado}</p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "row", width: 250, justifyContent: "flex-end" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h1>Estabelecimento</h1>
                <p>{props.estabelecimento}</p>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', marginBottom: 20 }}>
            <div style={{ display: "flex", flexDirection: "column", width: 250 }}>
              <h1>Valor</h1>
              <p>{formatReal(props.valor)}</p>
              {/* <Input
                prefix="R$"
                onKeyUp={handleKeyUp}
                value={formatReal(props.valor)}
                onChange={(e) => props.setValor(e.target.value)}
              /> */}
            </div>

            <div style={{ display: "flex", flexDirection: "column", width: 250, alignItems: "center", paddingRight: 60 }}>
              <div style={{ marginLeft: -74 }}>
                <h1>Desconto</h1>
                {props.valorDesconto ?
                  (<p>{formatReal(props.valorDesconto) + "%"}</p>) :
                  (<p>Sem valor</p>)}
                {/* <Input
                prefix="R$"
                onKeyUp={handleKeyUp}
                value={formatReal(props.valorDesconto)}
                onChange={(e) => props.setValorDesconto(e.target.value)}
              /> */}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "row", width: 250, justifyContent: "flex-end" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h1>Nota Fiscal</h1>
                <InputModalOc
                  style={{ paddingLeft: 10, width: 250 }}
                  placeholder={"Número da nota"}
                  type="text"
                  value={props.nota}
                  onChange={(e) => props.setNota(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* aqui */}
          {
            pathName !== "/CentroCusto/ListagemOcPaga" ? (
              <></>
            ) :
              (
                <>
                  <div style={{ display: "flex", flexDirection: "row", }}>

                    <div style={{ display: "flex", flexDirection: "column", width: "36%" }}>
                      <h1>Data Pagamento</h1>
                      <p>{props.dataPagamento}</p>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", width: 290, alignItems: "center" }}>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <h1>Banco</h1>
                        <InputModalOc
                          style={{ paddingLeft: 10, width: 250 }}
                          placeholder={"Nome Banco"}
                          type="text"
                          value={props.banco}
                          onChange={(e) => props.setBanco(e.target.value)}
                        />
                        {/* {props.banco ?
                        (<p>{props.banco}</p>):
                        (<p>sem banco</p>)} */}
                      </div>
                    </div>


                  </div>
                </>

              )
          }


          <h1 style={{ marginBottom: 10, marginTop: 20 }}>Observações</h1>
          <div style={{
            display: "flex", flexDirection: "colum", width: "100%", alignItems: "flex-start",
            border: "0.5px solid #000", marginBottom: 50, borderRadius: 10, boxShadow: "0px 2px 2px 1px #18181840"
          }}>
            {props.obs !== "" ?
              (<h1 style={{ padding: 10 }}>{props.obs}</h1>) :
              (<h1 style={{ padding: 10 }}>Sem Observações</h1>)}

          </div>

          <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <h1 style={{ marginBottom: 10 }}>Insumos</h1>

            {/* <div style={{
              display: "flex", flexDirection: "colum", width: "100%", alignItems: "flex-start",
              border: "0.5px solid #000", marginBottom: 50, borderRadius: 10, boxShadow: "0px 2px 2px 1px #18181840"
            }}> */}
            <AreaInsumoModal>
              {
                props.insumos.map((item) => {

                  return (
                    <ul key={item.id} style={{ padding: 10 }}>
                      <li style={{ marginLeft: 10 }}>
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 0 }}>

                          <div style={{ display: "flex", textAlign: "center", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                            <TitleList style={{ marginRight: 10 }}>Nome:</TitleList>
                            <TextList>{item.name} ,</TextList>

                          </div>

                          <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                            <TitleList style={{ marginRight: 10, marginLeft: 10 }}>Unidade:</TitleList>
                            <TextList>{item.und} ,</TextList>
                          </div>


                          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                            <TitleList style={{ marginRight: 10, marginLeft: 10 }}>Quantidade:</TitleList>
                            <TextList>{item.amount} ,</TextList>
                          </div>

                          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                            <TitleList style={{ marginRight: 10, marginLeft: 10 }}>Valor Unidade:</TitleList>
                            <TextList>{formatarNumeroParaPadraoMoeda(item.unity_value)}</TextList>
                          </div>

                          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                            <TitleList style={{ marginRight: 10, marginLeft: 10 }}>Valor Total:</TitleList>
                            <TextList>{formatarNumeroParaPadraoMoeda(item.total_value)}</TextList>
                          </div>
                        </div>
                      </li>
                    </ul>
                  )

                })}
            </AreaInsumoModal>

            {/* </div> */}
          </div>

          <h1 style={{ marginBottom: 10 }}>Parcelas</h1>
          <div style={{
            display: "flex", flexDirection: "column", border: "0.5px solid #000", padding: 10, marginBottom: 50,
            borderRadius: 10, boxShadow: "0px 2px 2px 1px #18181840"
          }}>
            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
              {

                novaListaParcelas.length === 0 ? (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <TextData>Sem Parcelas</TextData>
                  </div>
                ) :
                  (
                    novaListaParcelas?.map((item) => {
                     // console.log('novaListaParcelas Modal = = =', novaListaParcelas)
                      return (
                        <div key={item.id}>
                          <div style={{
                            display: "flex", flexDirection: "column", marginRight: 20, backgroundColor: "transparent",
                            border: "1.5px solid #0c4663", borderRadius: 5, alignItems: "center"
                          }}>
                            <CardHeader>
                              <TextData style={{ color: "#f0f0f0", fontSize: "1rem" }}>{item.numero_parcela}º Parcela</TextData>
                            </CardHeader>
                            <CardFooter>
                              <TextData>{item.data_vencimento.split('-').join('-')}</TextData>
                              <TextData>{parseFloat(item.valor_parcela).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</TextData>

                              {item.pagamento ?
                                (
                                  <BtnParcelaPaga onClick={() =>
                                    props.disableAction ? undefined : editParcela(item)
                                  }>
                                    <TextData>{!item.pagamento ? "Pagar ?" : "Pago !"}</TextData>
                                  </BtnParcelaPaga>

                                ) : (
                                  <BtnParcelaNaoPaga onClick={() =>
                                    props.disableAction ? undefined : editParcela(item)
                                  }>
                                    <TextData>{!item.pagamento ? "Pagar ?" : "Pago !"}</TextData>
                                  </BtnParcelaNaoPaga>
                                )}

                            </CardFooter>

                          </div>
                        </div>
                      )
                    })
                  )
              }

            </div>
          </div>

          <div style={{
            display: "flex", flexDirection: "row", justifyContent: "space-between",
            position: "absolute", alignItems: "center", bottom: 0, width: "100%", backgroundColor: "#f5f5f5"
          }}>
            <BtnEditar onClick={editOc}>
              <h3 style={{ marginLeft: 0 }}>Editar</h3>
            </BtnEditar>

            <BtnExluir onClick={deleteOc}>
              <h3 style={{ marginLeft: 0 }}>Excluir</h3>
            </BtnExluir>


            <Imprimir />
          </div>

        </div>
      </Container>
    </Modal>
  )
}