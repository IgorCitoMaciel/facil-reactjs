import React, { useState } from "react";
import { toast } from "react-toastify";
import Modal from 'react-modal';
import {
  BtnAdd,
  Container,
} from "./styles";
import { api } from "../../../../services/apiClient";


export function ModalDocumentoNovo(props) {
  const [novoDoc, setNovoDoc] = useState("")

  async function addDoc(event) {
    event.preventDefault()
    const data = {
      name: novoDoc,
    }

    try {
      const result = await api.post('/documento', data)
      setNovoDoc(result.data)
      props.handleCloseAddCentroResultadoModalNovo();
      toast.success('Documento adicionado com sucesso!')

    } catch (error) {
      toast.error('Erro ao adicionar documento!')
    }
  }

  return (
    <Modal
      ariaHideApp={false}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      isOpen={props.isAddCentroResultadoModalNovo}
      onRequestClose={props.handleCloseAddCentroResultadoModalNovo}
    >
      <button type="button" className="react-modal-close" onClick={props.handleCloseAddCentroResultadoModalNovo}>
        X
      </button>
      <Container>
        <h2>Criando documento</h2>
        <input
          type={"text"}
          placeholder="Digite o nome"
          value={novoDoc}
          onChange={(e) => setNovoDoc(e.target.value)}
        />

        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <BtnAdd onClick={addDoc}>
            Criar
          </BtnAdd>
        </div>

      </Container>
    </Modal>
  )
}