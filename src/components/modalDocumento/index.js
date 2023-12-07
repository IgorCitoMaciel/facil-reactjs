import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BtnAdd, Container } from "./styles";
import Modal from 'react-modal';


export function ModalDocumento(props) {
  const [novoDoc, setNovoDoc] = useState("")

  async function addDoc(event) {
    event.preventDefault()
    let data = {
      name: novoDoc,
    }
    const result = await axios.post('https://app-facil-1cc4efc41cdc.herokuapp.com/finance/add_new_document_type/', data)

      if(data.name){
        try {
          console.log('caiu aqui no AddDoc', result) 
          props.handleCloseAddDocumentoModal();
          toast.success('Documento adicionado com sucesso!')
          setNovoDoc("")
          
        } catch (error) {
          console.log('MEU ERRO AddCr =', error);
          toast.error('Erro ao adicionar documento!')          
        }
      }else{
        toast.error('Preencha todos os campos!')

      }      
  }

  return(
    <Modal   
      ariaHideApp={false}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      isOpen={props.isAddDocumentoModal}
      onRequestClose={props.handleCloseAddDocumentoModal}
    >
      <button type="button" className="react-modal-close" onClick={props.handleCloseAddDocumentoModal}>
        X
      </button>
      <Container>
        <h2>Cadastrar documento</h2>
        <input
        type={"text"}
        placeholder="Digite o nome"
        value={novoDoc}
        onChange={(e)=> setNovoDoc(e.target.value)}
        />

        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
          <BtnAdd onClick={addDoc}>
            Criar 
          </BtnAdd>
        </div>

      </Container>
    </Modal>
  )
}