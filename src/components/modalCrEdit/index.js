import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from 'react-modal';
import {
  Container,
  BtnExluir,
  InputModalOc,
  BtnEditar,
} from "./styles";
import { api } from "../../services/apiClient";


export function ModalCrEdit(props) {

  //console.log('Editar---', props.idCr, props.nomeCr, props.dataVencimento)

  async function deleteCr(event) {
    event.preventDefault()
    const id = props.idCr

    try {
      const result = await api.delete(`remove-centro-resultado?id=${id}`)
      props.handleCloseAddCentroResultadoModal();
      toast.success('Centro resultado deletado com sucesso!');
    } catch (error) {
      console.log('MEU ERRO DeleteCr =', error);
      toast.error('Erro ao deletar centro de resultado!');
    }
  }


  async function editCr(event) {
    event.preventDefault()
    const data = {
      id: Number(props.idCr),
      name: props.nomeCr,
      due_date: props.dataVencimento.split('-').reverse().join('-'),
    }
    console.log('data editCr', data)

    //const result = await axios.put('https://app-facil-1cc4efc41cdc.herokuapp.com/finance/edit_result_center/', data)

    try {
      const response = await api.put('/update-centro-resultado', data)
      props.handleCloseAddCentroResultadoModal();
      toast.success('Centro Resultado editado com sucesso!');

    } catch (error) {
      toast.error('Erro ao editar centro de resultado!');

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
          value={props.nomeCr}
          onChange={(e) => props.setNomeCr(e.target.value)}
        />

        <div style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', marginTop: 20 }}>
          {/* <div style={{ display: "flex", flexDirection: "column" }}>
            <p>Data de criação</p>
            <InputModalOc
              type="date"
              value={props.dataCriacao.split('-').reverse().join('-')}
              onChange={(e) => props.setDataCriacao(e.target.value.split('-').reverse().join('-'))}
            />
          </div> */}

          <div style={{ display: "flex", flexDirection: "column" }}>
            <p>Data de vencimento</p>
            <InputModalOc
              type="date"
              data-date-format="DD MMMM YYYY"
              value={props.dataVencimento}
              onChange={(e) => props.setDataVencimento(e.target.value)}
            />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <BtnEditar onClick={editCr}>
            Editar
          </BtnEditar>


          <BtnExluir onClick={deleteCr}>
            Excluir
          </BtnExluir>

        </div>

      </Container>
    </Modal>
  )
}