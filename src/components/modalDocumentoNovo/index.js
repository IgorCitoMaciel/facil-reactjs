import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from 'react-modal';
import {
  BtnAdd,
  Container,
} from "./styles";


export function ModalDocumentoNovo(props) {
  const [novoDoc, setNovoDoc] = useState("")

  //console.log('Novo Doc', novoDoc)

  async function addDoc(event) {
    event.preventDefault()
    let data = {
      name: novoDoc,
    }
    const result = await axios.post('https://app-facil-1cc4efc41cdc.herokuapp.com/finance/add_new_document_type/', data)

    if (data.name) {
      try {
        console.log('caiu aqui no AddDoc', result)
        props.handleCloseAddCentroResultadoModalNovo();
        toast.success('Documento adicionado com sucesso!')

      } catch (error) {
        console.log('MEU ERRO AddCr =', error);
        toast.error('Erro ao adicionar documento!')
      }
    } else {
      toast.error('Preencha todos os campos!')

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