import React, { useEffect, useState } from "react";
import axios from "axios";
import { Load } from "../../../components/load";
import Image from "next/image";
import imgNotFound from '../../../../public/not.png';
import SideBar from "../../../components/sideBar";
import { ModalCrEdit } from "../../../components/modalCrEdit";
import { ModalCrNovo } from "../components/modalCrNovo";
import { canSSRAuth } from "../../../utils/canSSRAuth";

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
import { api } from "../../../services/apiClient";

const listaOc = [
  {
    id: '1',
    name: 'Obra A',
    data_criacao: '01-01-2022',
    data_vencimento: '01-02-2022',
  },
  {
    id: '2',
    name: 'Obra B',
    data_criacao: '01-02-2022',
    data_vencimento: '01-03-2022',
  },
  {
    id: '3',
    name: 'Obra C',
    data_criacao: '01-01-2022',
    data_vencimento: '01-09-2022',
  },
  {
    id: '4',
    name: 'Obra D',
    data_criacao: '01-01-2022',
    data_vencimento: '01-10-2022',
  },
]

export default function CentroResultado() {
  const [domLoaded, setDomLoaded] = useState(false);
  const [isAddCentroResultadoModal, setIsAddCentroResultadoModal] = useState(false);
  const [isAddCentroResultadoModalNovo, setIsAddCentroResultadoModalNovo] = useState(false);

  const [nomeCr, setNomeCr] = useState('');
  const [idCr, setIdCr] = useState('');
  const [listAtt, setListAtt] = useState([]);
  const [dataCriacao, setDataCriacao] = useState('');
  const [dataVencimento, setDataVencimento] = useState('');
  const [listaCr, setListaCr] = useState([]);


  useEffect(() => {
    listagem();

  }, [])

  function handleOpenModal() {
    setIsAddCentroResultadoModal(true);
    console.log('chamou handleOpenModal')
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
    listagem();
  }

  //botao criar novo chama essa funcao
  function handleOpenAddCentroResultadoModalNovo() {
    setIsAddCentroResultadoModalNovo(true);
    console.log('chamou handleOpenAddCentroResultadoModalNovo')
  }

  function handleCloseAddCentroResultadoModalNovo() {
    setIsAddCentroResultadoModalNovo(false);
    listagem();
  }

  async function listagem() {
    setDomLoaded(true);

    try {
      const response = await api.get('/list-centro-resultado')
      setListaCr(response.data);
      setDomLoaded(false);

    } catch (error) {
      console.log('MEU ERRO Listagem =', error);
      setDomLoaded(false);
    }
  }

  return (
    <Container>
      {!domLoaded ? (
        <>
          <SideBar />
          <ContentArea>
            <ModalCrNovo
              handleCloseAddCentroResultadoModalNovo={handleCloseAddCentroResultadoModalNovo}
              isAddCentroResultadoModalNovo={isAddCentroResultadoModalNovo}
              nomeCr={nomeCr}
              setNomeCr={setNomeCr}
            />
            <AreaCampos>
              <HeaderAreaCampos>
                <Title>Listagem Centro Resultado</Title>
              </HeaderAreaCampos>
              <div style={{ overflow: "auto", display: "flex", flexDirection: "column" }}>
                <AreaContainerCampos>
                  {
                    listaCr.length ? (
                      <Table>
                        <thead>
                          <Trr>
                            <Thh>Número</Thh>
                            <Thh>Centro Resultado</Thh>
                            <Thh>Data criação</Thh>
                            <Thh>Data vencimento</Thh>
                          </Trr>
                        </thead>
                        <tbody>
                          {
                            listaCr.map((item, index) => (
                              <Trr key={index}>
                                <Tdd>
                                  <BtnListOc onClick={() => {
                                    handleOpenModal();
                                    setNomeCr(item.name);
                                    setIdCr(item.id.toString());
                                    setDataCriacao(item.creation_date);
                                    setDataVencimento(item.due_date.split('-').reverse().join('-'));
                                  }}>
                                    {item.id}
                                  </BtnListOc>
                                </Tdd>
                                <Tdd>{item.name}</Tdd>
                                <Tdd>{item.creation_date}</Tdd>
                                <Tdd>{item.due_date}</Tdd>
                              </Trr>
                            ))
                          }

                        </tbody>
                        <ModalCrEdit
                          handleCloseAddCentroResultadoModal={handleCloseAddCentroResultadoModal}
                          isAddCentroResultadoModal={isAddCentroResultadoModal}
                          nomeCr={nomeCr}
                          setNomeCr={setNomeCr}
                          idCr={idCr}
                          setIdCr={setIdCr}
                          //listaOc={listaOc}
                          dataCriacao={dataCriacao}
                          setDataCriacao={setDataCriacao}
                          dataVencimento={dataVencimento}
                          setDataVencimento={setDataVencimento}
                          listaCr={listaCr}
                          setListaCr={setListaCr}
                        />
                      </Table>
                    ) :
                      (<AreaImg>
                        <Image src={imgNotFound} style={{ height: 50, width: 50 }} />
                        <TextImg>Ordem de compra não encontrada !</TextImg>
                      </AreaImg>
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
