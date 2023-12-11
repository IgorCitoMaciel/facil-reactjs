import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from 'react-modal';
import { cnpjMask, cepMask } from "../../../../components/mask";
import {
  AreaSelectCC,
  BtnAdd,
  Container,
  SelectCC,
} from "./styles";
import { api } from "../../../../services/apiClient";


export function ModalInsumo(props) {
  async function addInsumo(event) {
    event.preventDefault()

    const data = {
      name: props.nomeInsumo,
      und: props.unidadeInsumo,
      material_type: props.tipoInsumo
    }
    console.log('meu data', data)

    try {
      const result = await api.post('/insumo', data)
      console.log('caiu aqui no AddInsumo', result)
      props.handleCloseAddCentroResultadoModalNovo();
      toast.success('Insumo adicionado com sucesso!')

      props.setNomeInsumo("");
      props.setUnidadeInsumo("");
      props.setTipoInsumo("");

    } catch (error) {
      console.log('MEU ERRO AddInsumo =', error);
      toast.error('Erro ao adicionar insumo!')
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
        <h2>Cadastrar Insumo</h2>
        <input
          type={"text"}
          placeholder="Digite o nome"
          value={props.nomeInsumo}
          onChange={(e) => props.setNomeInsumo(e.target.value)}
        />

        <AreaSelectCC>
          <SelectCC
            name="Selecione o tipo"
            value={props.tipoInsumo}
            onChange={(e) => props.setTipoInsumo(e.target.value)}
          >
            <option value="">Selecione o tipo</option>
            <option value="material">Material</option>
            <option value="Servico">Serviço</option>
          </SelectCC>
        </AreaSelectCC>

        <AreaSelectCC>
          <SelectCC
            name="Selecione o tipo"
            value={props.unidadeInsumo}
            onChange={(e) => props.setUnidadeInsumo(e.target.value)}
          >
            <option value="">Selecione a UND</option>
            <option value="und">UND</option>
            <option value="kg">KG</option>
            <option value="sc">SC</option>
            <option value="pc">PC</option>
            <option value="m">M</option>
          </SelectCC>
        </AreaSelectCC>

        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <BtnAdd onClick={addInsumo}>
            Criar
          </BtnAdd>
        </div>

      </Container>
    </Modal>
  )
}