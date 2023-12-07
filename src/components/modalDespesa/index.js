import React, { useState, useEffect } from "react";
import axios from "axios";
import { BtnCriar, Container } from "./styles";
import Modal from 'react-modal';
import { toast } from "react-toastify";


export function ModalDespesa(props) {
  const [novaDespesa, setNovaDespesa] = useState("")

  useEffect(()=>{
    setNovaDespesa("");
  },[])

  async function addDespesa(event) {
    event.preventDefault()
    let data = {
      name: novaDespesa,
    }
   const result = await axios.post('https://app-facil-1cc4efc41cdc.herokuapp.com/finance/add_new_expense/', data)
   
   if(data.name){
    try {
      console.log(result);
      setNovaDespesa("");
      //setNovaDespesa(response.data.new_result_center);
      toast.success('Despesa criada com sucesso!');
      props.handleCloseAddDespesaModal();

      
    } catch (error) {
      console.log('MEU ERRO Add Despesa =', error);
      setNovaDespesa("");
      toast.error('Erro ao criar despesa')      
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
      isOpen={props.isAddDespesaModal}
      onRequestClose={props.handleCloseAddDespesaModal}
    >
      <button type="button" className="react-modal-close" onClick={props.handleCloseAddDespesaModal}>
        X
      </button>
      <Container>
        <h2>Cadastrando tipos de despesa</h2>
        <input
        type={"text"}
        placeholder="Digite o nome"
        value={novaDespesa}
        onChange={(e)=> setNovaDespesa(e.target.value)}
        />

        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
          <BtnCriar onClick={addDespesa}>
            Criar 
          </BtnCriar>
        </div>

      </Container>
    </Modal>
  )
}