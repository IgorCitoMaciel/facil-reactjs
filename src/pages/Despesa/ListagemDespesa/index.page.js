import React, { useEffect, useState } from "react";
import axios from "axios";
import { Load } from "../../../components/load";
import Image from "next/image";
import imgNotFound from '../../../../public/not.png';
import SideBar from "../../../components/sideBar";
import { ModalDespesaEdit } from "../../../components/modalDespesaEdit";
import { ModalDespesaNovo } from "../../../components/modalDespesaNovo";
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
import { Tbody } from "@chakra-ui/react";

const listaDespesa2 = [
  {
    id: '1',
    name: 'Material de pintura'
  },
  {
    id: '2',
    name: 'material elétrico'
  },
  {
    id: '3',
    name: 'Material de construção'
  },
  {
    id: '4',
    name: 'Material de segurança'
  },
]

export default function Despesa() {
  const [domLoaded, setDomLoaded] = useState(false);
  const [isAddCentroResultadoModal, setIsAddCentroResultadoModal] = useState(false);
  const [isAddCentroResultadoModalNovo, setIsAddCentroResultadoModalNovo] = useState(false);

  const [nomeDespesa, setNomeDespesa] = useState('');
  const [idDespesa, setIdDespesa] = useState('');
  const [listaDespesa, setListaDespesa] = useState([]);


  useEffect(() => {
    listagemDespesa();

  }, [])

  async function listagemDespesa() {
     setDomLoaded(true);
    
     const result = await axios.get('https://app-facil-1cc4efc41cdc.herokuapp.com/finance/list_all_expense/')

     try {
      setListaDespesa(result.data.list_expense);
      //     console.log('caiu aqui na listagem', response.data.list_expense)
           setDomLoaded(false);
       
     } catch (error) {
      console.log('MEU ERRO Listagem =', error);
       
     }
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
    listagemDespesa();
  }

  function handleOpenAddCentroResultadoModalNovo() {
    setIsAddCentroResultadoModalNovo(true);
  }

  function handleCloseAddCentroResultadoModalNovo() {
    setIsAddCentroResultadoModalNovo(false);
    listagemDespesa();
  }

  return (
    <Container>
      {!domLoaded ? (
        <>
          <SideBar />
          <ContentArea>
            <AreaCampos>
              <HeaderAreaCampos>
                <Title>Listagem Despesa</Title>
              </HeaderAreaCampos>
              <div style={{ overflow: "auto", display: "flex", flexDirection: "column" }}>
                <AreaContainerCampos>
                  {
                    listaDespesa?.length ? (
                      <Table>
                        <thead>
                          <Trr>
                            <Thh>Número</Thh>
                            <Thh>Centro Resultado</Thh>
                          </Trr>
                        </thead>
                        <tbody>
                          {
                            listaDespesa.map((item, index) => (
                              <Trr key={index}>
                                <Tdd>
                                  <BtnListOc onClick={() => {
                                    handleOpenModal();
                                    setNomeDespesa(item.name);
                                    setIdDespesa(item.id.toString());
                                  }}>
                                    {item.id}
                                  </BtnListOc>
                                </Tdd>
                                <Tdd>{item.name}</Tdd>
                              </Trr>
                            ))
                          }

                        </tbody>
                        <ModalDespesaEdit
                          handleCloseAddCentroResultadoModal={handleCloseAddCentroResultadoModal}
                          isAddCentroResultadoModal={isAddCentroResultadoModal}
                          nomeDespesa={nomeDespesa}
                          setNomeDespesa={setNomeDespesa}
                          idDespesa={idDespesa}
                          setIdDespesa={setIdDespesa}
                          listaOc={listaDespesa}
                        />

                        <ModalDespesaNovo
                          handleCloseAddCentroResultadoModalNovo={handleCloseAddCentroResultadoModalNovo}
                          isAddCentroResultadoModalNovo={isAddCentroResultadoModalNovo}
                          nomeDespesa={nomeDespesa}
                          setNomeDespesa={setNomeDespesa}
                        />
                      </Table>
                    ) :
                      (<></>
                        // <AreaImg>
                        //   <Image src={imgNotFound} style={{ height: 50, width: 50 }} />
                        //   <TextImg>Ordem de compra não encontrada !</TextImg>
                        // </AreaImg>
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
      ):
      (
        <Load/>
      )}
    </Container>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

  return {
    props: {}
  }
})
