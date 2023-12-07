import React, { useEffect, useState, useContext } from "react";
import { Load } from "../../../components/load";
import axios from "axios";
import Image from "next/image";
import imgNotFound from '../../../../public/not.png';
import SideBar from "../../../components/sideBar";
import { canSSRAuth } from "../../../utils/canSSRAuth";
import { ModalDocumentoNovo } from "../../../components/modalDocumentoNovo";
import { ModalDocEdit } from "../../../components/modalDocEdit";
import { ModalFornecedor } from "../../../components/modalFornecedor";
import { ModalFornecedorEdit } from "../../../components/modalFornecedorEdit";
import { AuthContext } from "../../../contexts/AuthContext";
import { cepMask, cnpjMask } from "../../../components/mask";

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
  AreaImg,
  TextImg,
  BtnListOc,
  BtnCriar,
  BtnText,
} from "./styles";


export default function Documento() {
  const [domLoaded, setDomLoaded] = useState(true);
  const [isAddCentroResultadoModal, setIsAddCentroResultadoModal] = useState(false);
  const [isAddCentroResultadoModalNovo, setIsAddCentroResultadoModalNovo] = useState(false);

  const [nomeDoc, setNomeDoc] = useState('');
  const [idDoc, setIdDoc] = useState('');
  const [listaDoc, setListaDoc] = useState([]);

  const [razaoSocial, setRazaoSocial] = useState('');
  const [idFornecedor, setIdFornecedor] = useState('');
  const [listaFornecedor, setListaFornecedor] = useState([]);
  const [cnpj, setCnpj] = useState('');
  const [inscricao, setInscricao] = useState('');
  const [endereco, setEndereco] = useState('')
  const [cep, setCep] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [cell, setCell] = useState('');
  const [tipoFornecedor, setTipoFornecedor] = useState('');
  const [isAddFornecedorModal, setIsAddFornecedorModal] = useState(false);


  const { user } = useContext(AuthContext);

  console.log('MEU USER', user)

  console.log('Lista Documento', listaDoc);

  useEffect(() => {
    listagemFornecedor();
    setRazaoSocial("");
    setCnpj("");
    setInscricao("");
    setCep("");
    setEndereco("");
    setEstado("");
    setCidade("");
    setTipoFornecedor("");
    setIdFornecedor("");
    setCell("");

  }, [])

  async function listagemFornecedor() {
    setDomLoaded(true);
    await axios.get('https://app-facil-1cc4efc41cdc.herokuapp.com/finance/list_providers/')
      .then(async function (response) {
        if (response.status == 200) {
          setListaFornecedor(response.data.list_providers);
          //setListaFornecedor(response.data.)
          setDomLoaded(false);
        }
      })
      .catch(function (error) {
        console.log('MEU ERRO Listagem =', error);
        Alert.alert('Atenção', 'Erro.')
        setDomLoaded(false);
      }).finally(() => {
        setDomLoaded(false);
      });
  }



  function handleOpenModal() {
    setIsAddCentroResultadoModal(true);
    console.log('chamou handleOpen')
  }

  // function handleCloseModal() {
  //   setIsAddCentroResultadoModal(false);
  // }

  // function handleOpenAddCentroResultadoModal() {
  //   setIsAddCentroResultadoModal(true);
  //   console.log('chamou handleOpen')
  // }

  function handleCloseAddCentroResultadoModal() {
    setIsAddCentroResultadoModal(false);
    listagemFornecedor();
  }

  function handleOpenAddCentroResultadoModalNovo() {
    setIsAddCentroResultadoModalNovo(true);
    console.log('chamou handleOpen')
  }

  function handleCloseAddCentroResultadoModalNovo() {
    setIsAddCentroResultadoModalNovo(false);
    listagemFornecedor();
  }

  function handleOpenAddFornecedorModal() {
    setIsAddFornecedorModal(true);
    console.log('chamou handleOpen Fornecedor')
  }

  function handleCloseAddFornecedorModal() {
    setIsAddFornecedorModal(false);
    setRazaoSocial("");
    setCnpj("");
    setInscricao("");
    setCep("");
    setEndereco("");
    setEstado("");
    setCidade("");
    setTipoFornecedor("");
    setIdFornecedor("");
    listagemFornecedor();
    setCell("");
  }

  return (
    <Container>
      {!domLoaded ? (
        <>
          <SideBar />
          <ContentArea>
            <AreaCampos>
              <HeaderAreaCampos>
                <Title>Listagem Fornecedor</Title>
              </HeaderAreaCampos>
              <div style={{ overflow: "auto", display: "flex", flexDirection: "column" }}>
                <AreaContainerCampos>
                  {
                    listaFornecedor.length ? (
                      <Table>
                        <thead>
                          <Trr>
                            <Thh>Número</Thh>
                            <Thh>Razão Social</Thh>
                            <Thh>Tipo</Thh>
                            <Thh>CNPJ</Thh>
                            <Thh>IE</Thh>
                            <Thh>Endereço</Thh>
                            <Thh>Telefone</Thh>
                            <Thh>CEP</Thh>
                            <Thh>Estado</Thh>
                            <Thh>Cidade</Thh>
                          </Trr>
                        </thead>
                        <tbody>
                          {
                            listaFornecedor.map((item, index) => (
                              console.log("listaFornecedor",listaFornecedor),
                              <Trr key={index}>
                                <Tdd>
                                  <BtnListOc onClick={() => {
                                    handleOpenModal();
                                    setNomeDoc(item.name);
                                    setIdFornecedor(item.id.toString());

                                    setRazaoSocial(item.company_name);
                                    setCnpj(item.cnpj);
                                    setInscricao(item.ie);
                                    setEndereco(item.address);
                                    setCell(item.cell);
                                    setCep(item.cep);
                                    setEstado(item.state);
                                    setCidade(item.city);
                                    setTipoFornecedor(item.description_type);
                                  }}>
                                    {item.id}
                                  </BtnListOc>
                                </Tdd>
                                <Tdd>{item.company_name}</Tdd>
                                <Tdd style={{ textTransform: "capitalize" }}>{item.description_type?.name}</Tdd>
                                <Tdd>{item.cnpj}</Tdd>
                                <Tdd>{item.ie}</Tdd>
                                <Tdd>{item.address}</Tdd>
                                <Tdd>{item.cell}</Tdd>
                                <Tdd>{item.cep}</Tdd>
                                <Tdd>{item.state}</Tdd>
                                <Tdd>{item.city}</Tdd>
                              </Trr>
                            ))
                          }

                        </tbody>
                        <ModalFornecedorEdit
                          handleCloseAddCentroResultadoModal={handleCloseAddCentroResultadoModal}
                          isAddCentroResultadoModal={isAddCentroResultadoModal}
                          nomeDoc={nomeDoc}
                          setNomeDoc={setNomeDoc}
                          idDoc={idDoc}
                          setIdDoc={setIdDoc}
                          listaOc={listaDoc}
                          setListaDoc={setListaDoc}

                          razaoSocial={razaoSocial}
                          setRazaoSocial={setRazaoSocial}
                          cnpj={cnpj}
                          setCnpj={setCnpj}
                          inscricao={inscricao}
                          setInscricao={setInscricao}
                          cep={cep}
                          setCep={setCep}
                          endereco={endereco}
                          setEndereco={setEndereco}
                          estado={estado}
                          setEstado={setEstado}
                          cidade={cidade}
                          setCidade={setCidade}
                          tipoFornecedor={tipoFornecedor}
                          setTipoFornecedor={setTipoFornecedor}
                          setIdFornecedor={setIdFornecedor}
                          idFornecedor={idFornecedor}
                          setCell={setCell}
                          cell={cell}
                        />

                        <ModalFornecedor
                          handleCloseAddFornecedorModal={handleCloseAddFornecedorModal}
                          isAddFornecedorModal={isAddFornecedorModal}
                          nomeDoc={nomeDoc}
                          setNomeDoc={setNomeDoc}

                          setIsAddFornecedorModal={setIsAddFornecedorModal}
                        />

                      </Table>
                    ) :
                      (
                        <>
                          <AreaImg>
                            <Image src={imgNotFound} style={{ height: 50, width: 50 }} />
                            <TextImg>Documento não encontrado !</TextImg>
                          </AreaImg>
                          <ModalFornecedor
                            handleCloseAddFornecedorModal={handleCloseAddFornecedorModal}
                            isAddFornecedorModal={isAddFornecedorModal}
                            nomeDoc={nomeDoc}
                            setNomeDoc={setNomeDoc}

                            setIsAddFornecedorModal={setIsAddFornecedorModal}
                          />
                        </>
                      )
                  }
                  <BtnCriar onClick={handleOpenAddFornecedorModal}>
                    <BtnText>Criar Novo</BtnText>
                  </BtnCriar>
                </AreaContainerCampos>
              </div>
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

export const getServerSideProps = canSSRAuth(async (ctx) => {

  return {
    props: {}
  }
})
