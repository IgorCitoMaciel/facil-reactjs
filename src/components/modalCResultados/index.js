import React, { useState } from "react";
import { Container } from "./styles";
import Modal from 'react-modal';


export function ModalCR(props) {

  return(
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
        <h2>Cadastrando centro de resultado</h2>
        <input
        type={"text"}
        placeholder="Digite o nome"
        />

        <button type="submit">
          Cadastrar
        </button>

      </Container>
    </Modal>
  )
}