import React, { useEffect, useState, useContext } from "react";
import { Load } from "../../../components/load";
import axios from "axios";
import Image from "next/image";
import imgNotFound from '../../../../public/not.png';
import SideBar from "../../../components/sideBar";
//import { ModalCrEdit } from "../../../components/modalCrEdit";
import { canSSRAuth } from "../../../utils/canSSRAuth";
import { ModalDocumentoNovo } from "../components/modalDocumentoNovo";
import { ModalDocEdit } from "../components/modalDocEdit";
import { AuthContext } from "../../../contexts/AuthContext";

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
//import { Alert } from "@chakra-ui/react";
import { api } from "../../../services/apiClient";

const listaDoc = [
  {
    id: '1',
    name: 'Boleto'
  },
  {
    id: '2',
    name: 'Promissória'
  },
  {
    id: '3',
    name: 'Débito'
  },
  {
    id: '4',
    name: 'Crédito'
  },
]

export default function Documento() {
  const [domLoaded, setDomLoaded] = useState(true);
  const [isAddCentroResultadoModal, setIsAddCentroResultadoModal] = useState(false);
  const [isAddCentroResultadoModalNovo, setIsAddCentroResultadoModalNovo] = useState(false);

  const [nomeDoc, setNomeDoc] = useState('');
  const [idDoc, setIdDoc] = useState('');
  const [listaDoc, setListaDoc] = useState([]);

  const { user } = useContext(AuthContext);

  console.log('MEU USER', user)

  // console.log('Lista Documento', listaDoc);

  useEffect(() => {
    listagemDoc();
  }, [])

  async function listagemDoc() {
    setDomLoaded(true);
    try {
      const response = await api.get('/list-documento')
      setListaDoc(response.data)
      setDomLoaded(false);

    } catch (error) {
      console.log('MEU ERRO Listagem =', error);
      setDomLoaded(false);
    }
  }

  function handleOpenModal() {
    setIsAddCentroResultadoModal(true);
    console.log('chamou handleOpen')
  }

  function handleCloseModal() {
    setIsAddCentroResultadoModal(false);
  }

  function handleOpenAddCentroResultadoModal() {
    setIsAddCentroResultadoModal(true);
    console.log('chamou handleOpen')
  }

  function handleCloseAddCentroResultadoModal() {
    setIsAddCentroResultadoModal(false);
    listagemDoc();
  }

  function handleOpenAddCentroResultadoModalNovo() {
    setIsAddCentroResultadoModalNovo(true);
    console.log('chamou handleOpen')
  }

  function handleCloseAddCentroResultadoModalNovo() {
    setIsAddCentroResultadoModalNovo(false);
    listagemDoc();
  }

  return (
    <Container>
      {!domLoaded ? (
        <>
          <SideBar />
          <ContentArea>
            <AreaCampos>
              <HeaderAreaCampos>
                <Title>Listagem Documento</Title>
              </HeaderAreaCampos>
              <div style={{ overflow: "auto", display: "flex", flexDirection: "column" }}>
                <AreaContainerCampos>
                  {
                    listaDoc.length ? (
                      <Table>
                        <thead>
                          <Trr>
                            <Thh>Número</Thh>
                            <Thh>Centro Resultado</Thh>
                          </Trr>
                        </thead>
                        <tbody>
                          {
                            listaDoc.map((item, index) => (
                              <Trr key={index}>
                                <Tdd>
                                  <BtnListOc onClick={() => {
                                    handleOpenModal();
                                    setNomeDoc(item.name);
                                    setIdDoc(item.id.toString());
                                  }}>
                                    {item.id}
                                  </BtnListOc>
                                </Tdd>
                                <Tdd>{item.name}</Tdd>
                              </Trr>
                            ))
                          }

                        </tbody>
                        <ModalDocEdit
                          handleCloseAddCentroResultadoModal={handleCloseAddCentroResultadoModal}
                          isAddCentroResultadoModal={isAddCentroResultadoModal}
                          nomeDoc={nomeDoc}
                          setNomeDoc={setNomeDoc}
                          idDoc={idDoc}
                          setIdDoc={setIdDoc}
                          listaOc={listaDoc}
                          setListaDoc={setListaDoc}
                        />

                        <ModalDocumentoNovo
                          handleCloseAddCentroResultadoModalNovo={handleCloseAddCentroResultadoModalNovo}
                          isAddCentroResultadoModalNovo={isAddCentroResultadoModalNovo}
                          nomeDoc={nomeDoc}
                          setNomeDoc={setNomeDoc}
                        />
                      </Table>
                    ) :
                      (
                        <>
                          <AreaImg>
                            <Image src={imgNotFound} style={{ height: 50, width: 50 }} />
                            <TextImg>Documento não encontrado !</TextImg>
                          </AreaImg>
                          <ModalDocumentoNovo
                            handleCloseAddCentroResultadoModalNovo={handleCloseAddCentroResultadoModalNovo}
                            isAddCentroResultadoModalNovo={isAddCentroResultadoModalNovo}
                            nomeDoc={nomeDoc}
                            setNomeDoc={setNomeDoc}
                          />
                        </>
                      )
                  }
                  <BtnCriar onClick={handleOpenAddCentroResultadoModalNovo}>
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
