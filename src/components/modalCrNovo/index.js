import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from 'react-modal';
import {
  Container,
  TitleInput,
  InputOC,
  BtnAdd
} from "./styles";


export function ModalCrNovo(props) {
  const [dataCriacao, setDataCriacao] = useState("")
  const [dataVencimento, setDataVencimento] = useState("")
  const [novoCr, setNovoCr] = useState("")

  //console.log('novo Cr', novoCr)

  async function addCr(event) {
    event.preventDefault()
    let data = {
      name: novoCr,
      due_date: dataVencimento.split('-').reverse().join('-'),
    }
    if(data.name && data.due_date){
      const result = await axios.post('https://app-facil-1cc4efc41cdc.herokuapp.com/finance/add_new_result_center/', data)
      try {
        console.log('caiu aqui no AddCr', result);
        props.handleCloseAddCentroResultadoModalNovo();
        toast.success('Centro de resultado adicionado com sucesso!');
        
      } catch (error) {
        console.log('MEU ERRO AddCr =', error);
        toast.error(' Error ao adicionar centro de resultado!');
        
      }

    }else{
      toast.error('Preencha todos os campos!');
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
        <h2>Criando centro de resultado</h2>
        <input
          type={"text"}
          placeholder="Digite o nome"
          value={novoCr}
          onChange={(e) => setNovoCr(e.target.value)}
        />
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop:30}}>
          {/* <div style={{ display: "flex", flexDirection: "column", marginRight: 0, width: 200 }}>
            <TitleInput>Data de criação</TitleInput>
            <InputOC
              type="date"
              data-date-format="DD MMMM YYYY"
              value={dataCriacao.split('-').reverse().join('-')}
              onChange={(e) => setDataCriacao(e.target.value.split('-').reverse().join('-'))}

            />
          </div> */}
          <div style={{ display: "flex", flexDirection: "column", marginRight: 0, width: 200 }}>
            <TitleInput>Data de vencimento</TitleInput>
            <InputOC
              type="date"
              data-date-format="DD MMMM YYYY"
              value={dataVencimento.split('-').reverse().join('-')}
              onChange={(e) => setDataVencimento(e.target.value.split('-').reverse().join('-'))}
            />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <BtnAdd onClick={addCr}>
            Criar
          </BtnAdd>
        </div>

      </Container>
    </Modal>
  )
}