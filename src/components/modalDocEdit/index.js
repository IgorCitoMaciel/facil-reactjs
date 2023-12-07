import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from 'react-modal';
import { 
  Container,
  BtnExluir,
  BtnEditar,
 } from "./styles";


export function ModalDocEdit(props) {

  console.log('props nome doc:', props.idDoc ,props.nomeDoc)

  async function deleteDoc(event) {
    event.preventDefault()
    let data = {
      id: props.idDoc,
      name: props.nomeDoc,
    }

    const result = await axios.delete('https://app-facil-1cc4efc41cdc.herokuapp.com/finance/delete_document_type/', { data })

    try {
      console.log('caiu aqui no DeleteCr', result);
      props.handleCloseAddCentroResultadoModal();
      toast.success('Documento deletado com sucesso!');
      
    } catch (error) {
      console.log('MEU ERRO DeleteCr =', error);
      toast.error('Erro ao deletar documento!');
     
    }

  }


  async function editDoc(event) {
    event.preventDefault()

    const data = {
      id: props.idDoc,
      name: props.nomeDoc,
    }

    const result = await axios.put('https://app-facil-1cc4efc41cdc.herokuapp.com/finance/edit_document_type/', data)

    try {
      console.log('caiu nos 200', result)
      props.handleCloseAddCentroResultadoModal();
      toast.success('Documento editado com sucesso!');
      
    } catch (error) {
      console.log('MEU ERRO EditDoc =', error);
      toast.error('Erro ao editar documento!');
      
    }
  }

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
        <h2>Centro de resultado</h2>
        <input
        type={"text"}
        placeholder="Digite o nome"
        value={props.nomeDoc}
        onChange={(e)=> props.setNomeDoc(e.target.value)}
        />

        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
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