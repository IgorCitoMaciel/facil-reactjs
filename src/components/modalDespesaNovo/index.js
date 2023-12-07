import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from 'react-modal';
import { 
  BtnCriar,
  Container,
 } from "./styles";


export function ModalDespesaNovo(props) {
  const [novaDespesa, setNovaDespesa] = useState("")

  //console.log('Nova Despesa',novaDespesa)

  async function addDespesa(event) {
    event.preventDefault()
    //console.log('CHAMOU ADD DESPESA')
    let data = {
      name: novaDespesa,
    }
    await axios.post('https://app-facil-1cc4efc41cdc.herokuapp.com/finance/add_new_expense/', data)
      .then(async function (response) {
        if (response.status == 200) {
          setNovaDespesa(response.data.new_result_center);
          toast.success('Despesa criada com sucesso!');
          props.handleCloseAddCentroResultadoModalNovo();
          console.log('caiu aqui no AddDespesa', response.data.new_result_center)        
        }
      })
      .catch(function (error) {
        console.log('MEU ERRO AddCr =', error);
        toast.error('Erro ao criar despesa')
        //Alert.alert('Atenção', 'Erro.')
      }).finally(() => {
        //setDomLoaded(false);
      });
  }

  return(
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
        <h2>Criar despesa</h2>
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