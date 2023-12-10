import React, { useEffect, useState, useContext } from "react";
import { Load } from "../../../components/load";
import axios from "axios";
import Image from "next/image";
import imgNotFound from '../../../../public/not.png';
import SideBar from "../../../components/sideBar";
import { canSSRAuth } from "../../../utils/canSSRAuth";
// import { ModalDocumentoNovo } from "../../../components/modalDocumentoNovo";
// import { ModalDocEdit } from "../../../components/modalDocEdit";
// import { ModalFornecedor } from "../../../components/modalFornecedor";
// import { ModalFornecedorEdit } from "../../../components/modalFornecedorEdit";
import { AuthContext } from "../../../contexts/AuthContext";
import { ModalInsumo } from "../../../components/modalInsumoNovo";
import { ModalInsumoEdit } from "../../../components/modalInsumoEdit";

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

  const [listaInsumo, setListaInsumo] = useState([]);
  const [idInsumo, setIdInsumo] = useState('');
  const [nomeInsumo, setNomeInsumo] = useState('');
  const [unidadeInsumo, setUnidadeInsumo] = useState('');
  const [tipoInsumo, setTipoInsumo] = useState('');

  // const [razaoSocial, setRazaoSocial] = useState('');
  // const [idFornecedor, setIdFornecedor] = useState('');
  const [listaFornecedor, setListaFornecedor] = useState([]);
  // const [cnpj, setCnpj] = useState('18022294000118');
  // const [inscricao, setInscricao] = useState('381693953');
  // const [endereco,setEndereco] = useState('Rua Adrianisia, 100')
  // const [cep, setCep] = useState('93228160');
  // const [estado, setEstado] = useState('Ceará');
  // const [cidade, setCidade] = useState('Fortaledza');
  // const [tipoFornecedor, setTipoFornecedor] = useState('');

  const { user } = useContext(AuthContext);

  // console.log('MEU USER Insumo', user)


  useEffect(() => {
    listagemInsumo();
  }, [])

  async function listagemInsumo() {
    setDomLoaded(true);
    await axios.get('https://app-facil-1cc4efc41cdc.herokuapp.com/finance/list_insumos/')
      .then(async function (response) {
        if (response.status == 200) {
          setListaInsumo(response.data.list_insumos);
          setDomLoaded(false);
        }
      })
      .catch(function (error) {
        console.log('MEU ERRO Listagem Insumo =', error); 
        setDomLoaded(false);
      }).finally(() => {
        setDomLoaded(false);
      });
  }

  // console.log('Lista Insumo', listaInsumo)

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
    listagemInsumo();
    setNomeInsumo("");
    setUnidadeInsumo("");
    setTipoInsumo("");
  }

  function handleOpenAddCentroResultadoModalNovo() {
    setIsAddCentroResultadoModalNovo(true);
    console.log('chamou handleOpen')
  }

  function handleCloseAddCentroResultadoModalNovo() {
    setIsAddCentroResultadoModalNovo(false);
    setNomeInsumo("");
    setUnidadeInsumo("");
    setTipoInsumo("");
    listagemInsumo();
  }

  return (
    <Container>
      {!domLoaded ? (
        <>
          <SideBar />
          <ContentArea>
            <AreaCampos>
              <HeaderAreaCampos>
                <Title>Listagem Insumo</Title>
              </HeaderAreaCampos>
              <div style={{ overflow: "auto", display: "flex", flexDirection: "column" }}>
                <AreaContainerCampos>
                  {
                    listaInsumo.length ? (
                      <Table>
                        <thead>
                          <Trr>
                            <Thh>Número</Thh>
                            <Thh>Nome</Thh>
                            <Thh>Unidade de medida</Thh>
                            <Thh>Tipo</Thh>
                          </Trr>
                        </thead>
                        <tbody>
                          {
                            listaInsumo.map((item, index) => (
                              <Trr key={index}>
                                <Tdd>
                                  <BtnListOc onClick={() => {
                                    handleOpenModal();
                                    setNomeInsumo(item.name);
                                    setUnidadeInsumo(item.und)
                                    setTipoInsumo(item.material_type)
                                    setIdInsumo(item.id)
                                  }}>
                                    {item.id}
                                  </BtnListOc>
                                </Tdd>
                                <Tdd>{item.name}</Tdd>
                                <Tdd>{item.und}</Tdd>
                                <Tdd>{item.material_type}</Tdd>
                              </Trr>
                            ))
                          }

                        </tbody>
                        <ModalInsumoEdit
                          handleCloseAddCentroResultadoModal={handleCloseAddCentroResultadoModal}
                          isAddCentroResultadoModal={isAddCentroResultadoModal}
                          nomeInsumo={nomeInsumo}
                          setNomeInsumo={setNomeInsumo}
                          unidadeInsumo={unidadeInsumo}
                          setUnidadeInsumo={setUnidadeInsumo}
                          setTipoInsumo={setTipoInsumo}
                          tipoInsumo={tipoInsumo}
                          idInsumo={idInsumo}
                          setIdInsumo={setIdInsumo}
                        />

                        <ModalInsumo
                          handleCloseAddCentroResultadoModalNovo={handleCloseAddCentroResultadoModalNovo}
                          isAddCentroResultadoModalNovo={isAddCentroResultadoModalNovo}
                          nomeDoc={nomeDoc}
                          setNomeDoc={setNomeDoc}

                          nomeInsumo={nomeInsumo}
                          setNomeInsumo={setNomeInsumo}
                          unidadeInsumo={unidadeInsumo}
                          setUnidadeInsumo={setUnidadeInsumo}
                          setTipoInsumo={setTipoInsumo}
                          tipoInsumo={tipoInsumo}
                          idInsumo={idInsumo}
                          setIdInsumo={setIdInsumo}
                          
                        />
                      </Table>
                    ) :
                      (
                      <>
                        <AreaImg>
                          <Image src={imgNotFound} style={{ height: 50, width: 50 }} />
                          <TextImg>Documento não encontrado !</TextImg>
                        </AreaImg>
                        <ModalInsumo
                            handleCloseAddCentroResultadoModalNovo={handleCloseAddCentroResultadoModalNovo}
                            isAddCentroResultadoModalNovo={isAddCentroResultadoModalNovo}
                            nomeDoc={nomeDoc}
                            setNomeDoc={setNomeDoc}

                            nomeInsumo={nomeInsumo}
                            setNomeInsumo={setNomeInsumo}
                            unidadeInsumo={unidadeInsumo}
                            setUnidadeInsumo={setUnidadeInsumo}
                            setTipoInsumo={setTipoInsumo}
                            tipoInsumo={tipoInsumo}
                            idInsumo={idInsumo}
                            setIdInsumo={setIdInsumo}
                            
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
