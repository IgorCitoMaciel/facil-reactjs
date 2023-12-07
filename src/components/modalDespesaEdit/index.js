import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Modal from 'react-modal';
import { 
  Container,
  BtnExluir,
  BtnEditar,
 } from "./styles";


export function ModalDespesaEdit(props) {
 // console.log('DESPESA', props.idDespesa,props.nomeDespesa)

  async function deleteDespesa(event) {
    event.preventDefault()
    const data = {
      id: props.idDespesa,
      name: props.nomeDespesa,
    }
  
    try {
      const result = await axios.delete('https://app-facil-1cc4efc41cdc.herokuapp.com/finance/delete_expense/', { data })
      console.log('caiu nos 200 edit despesa')
      props.handleCloseAddCentroResultadoModal()
      toast.success('Despesa deletada com sucesso!')
      
    } catch (error) {
      console.log('MEU ERRO EditDoc =', error);
      toast.error('Erro ao excluir despesa')
    }
      // .then(async function (response) {
      //   if (response.status == 200) {
      //     console.log('caiu aqui no DeleteCr', response.data.list_expense)        
      //     toast.success('Despesa deletada com sucesso!')
      //   }
      // })
      // .catch(function (error) {
      //   console.log('MEU ERRO DeleteCr =', error);
      //   toast.error('Erro ao deletar despesa')
      // }).finally(() => {
      //   //setDomLoaded(false);
      // });
  }

  async function editDespesa(event) {
    event.preventDefault()
    console.log('jsbdjhksadkjhsgkjfhs')
    const data = {
      id: props.idDespesa,
      name: props.nomeDespesa,
    } 

    try {
      const result =  await axios.put('https://app-facil-1cc4efc41cdc.herokuapp.com/finance/edit_expense/', data)
        console.log('caiu nos 200 edit despesa')
        props.handleCloseAddCentroResultadoModal()
        toast.success('Despesa editada com sucesso!')

    } catch (error) {
      console.log('MEU ERRO EditDoc =', error);
      toast.error('Erro ao editar despesa')
      
    } finally{
      //setDomLoaded(false);
    }    
      // console.log('CHAMOU EDITAR DESPESA')
      // .then(async function (response) {
      //   if (response.status === 200) {
      //     console.log('caiu nos 200 edit despesa')
      //     toast.success('Despesa editada com sucesso!')
      //   }
      // })
      // .catch(function (error) {
      //   console.log('MEU ERRO EditDoc =', error);
      //   toast.error('Erro ao editar despesa')

      // }).finally(() => {
      //   //setDomLoaded(false);
      // });
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
        <h2>Despesa</h2>
        <input
        type={"text"}
        placeholder="Digite o nome"
        value={props.nomeDespesa}
        onChange={(e)=> props.setNomeDespesa(e.target.value)}
        />

        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
          <BtnEditar onClick={editDespesa}>
            Editar
          </BtnEditar>

          <BtnExluir onClick={deleteDespesa}>
            Excluir
          </BtnExluir>
        </div>

      </Container>
    </Modal>
  )
}