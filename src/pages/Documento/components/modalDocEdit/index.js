import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from 'react-modal';
import {
  Container,
  BtnExluir,
  BtnEditar,
} from "./styles";
import { api } from "../../../../services/apiClient";


export function ModalDocEdit(props) {

  async function deleteDoc(event) {
    event.preventDefault()
    const id = props.idDoc

    try {
      const response = await api.delete(`/remove-documento?id=${id}`)
      props.handleCloseAddCentroResultadoModal();
      toast.success('Documento deletado com sucesso!');

    } catch (error) {
      toast.error('Erro ao deletar documento!');

    }
  }


  async function editDoc(event) {
    event.preventDefault()

    const data = {
      id: Number(props.idDoc),
      name: props.nomeDoc,
    }

    console.log('MEU DATA Edit Doc', data)

    try {
      const response = await api.put('/update-documento', data)
      props.handleCloseAddCentroResultadoModal();
      toast.success('Documento editado com sucesso!');

    } catch (error) {
      toast.error('Erro ao editar documento!');

    }
  }

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
        <h2>Centro de resultado</h2>
        <input
          type={"text"}
          placeholder="Digite o nome"
          value={props.nomeDoc}
          onChange={(e) => props.setNomeDoc(e.target.value)}
        />

        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <BtnEditar onClick={editDoc}>
            Editar
          </BtnEditar>

          <BtnExluir onClick={deleteDoc}>
            Excluir
          </BtnExluir>
        </div>

      </Container>
    </Modal>
  )
}