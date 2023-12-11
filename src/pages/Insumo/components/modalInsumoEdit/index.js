import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { cnpjMask, cepMask } from "../../../../components/mask";
import Modal from 'react-modal';
import {
  Container,
  BtnExluir,
  BtnEditar,
  AreaSelectCC,
  SelectCC,
} from "./styles";
import { api } from "../../../../services/apiClient";


export function ModalInsumoEdit(props) {

  // console.log('props id insumo:',props.idInsumo.toString())

  async function deleteInsumo(event) {
    event.preventDefault()
    const id = props.idInsumo;

    console.log('meu id', id)

    const result = await api.delete(`/remove-insumo?id=${id}`, )

    try {
      console.log('caiu aqui no DeleteFornecedor', result);
      props.handleCloseAddCentroResultadoModal();
      toast.success('Insumo deletado com sucesso!');

    } catch (error) {
      console.log('MEU ERRO DeleteFornecedor =', error);
      toast.error('Erro ao deletar insumo!');

    }

  }


  // async function editDoc(event) {
  //   event.preventDefault()

  //   const data = {
  //     id: props.idDoc,
  //     name: props.nomeDoc,
  //   }

  //   const result = await axios.put('https://app-facil-1cc4efc41cdc.herokuapp.com/finance/edit_document_type/', data)

  //   try {
  //     console.log('caiu nos 200', result)
  //     props.handleCloseAddCentroResultadoModal();
  //     toast.success('Documento editado com sucesso!');

  //   } catch (error) {
  //     console.log('MEU ERRO EditDoc =', error);
  //     toast.error('Erro ao editar documento!');

  //   }
  // }

  // console.log('nome modal insumo z-z-z-z', props.nomeInsumo)
  return (
    <Modal
      ariaHideApp={false}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      isOpen={props.isAddCentroResultadoModal}
      onRequestClose={props.handleCloseAddCentroResultadoModal}
    >
      <button type="button" className="react-modal-close" onClick={props.handleCloseAddCentroResultadoModal}>
        X
      </button>
      <Container>
        <h2>Insumo Editar</h2>
        <input
          type={"text"}
          // placeholder="Digite o nome"
          value={'Nome:  ' + props.nomeInsumo}
          onChange={(e) => props.setNomeInsumo(e.target.value)}
        />

        <input
          type={"text"}
          // placeholder="Digite o nome"
          value={'Unidade de medida:  ' + props.unidadeInsumo}
          onChange={(e) => props.setUnidadeInsumo(e.target.value)}
        />

        <input
          type={"text"}
          // placeholder="Digite o nome"
          value={'Tipo do material:  '+ props.tipoInsumo}
          onChange={(e) => props.setTipoInsumo(e.target.value)}
        />


        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
          {/* <BtnEditar onClick={editDoc}>
            Editar
          </BtnEditar> */}

          <BtnExluir onClick={deleteInsumo}>
            Excluir
          </BtnExluir>
        </div>

      </Container>
    </Modal>
  )
}