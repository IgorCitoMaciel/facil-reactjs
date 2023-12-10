import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { cnpjMask, cepMask } from "../../../../components/mask";
import Modal from 'react-modal';
import { api } from "../../../../services/apiClient";
import {
  Container,
  BtnExluir,
  BtnEditar,
} from "./styles";


export function ModalFornecedorEdit(props) {
  //console.log('props nome doc:', props.idDoc, props.nomeDoc)
  async function deleteFornecedor(event) {
    event.preventDefault()
    let data = {
      id: props.idFornecedor,
      // cnpj: props.cnpj,
    }

    const result = await api.delete('/remove-fornecedor', { data })

    try {
      console.log('caiu aqui no DeleteFornecedor', result);
      props.handleCloseAddCentroResultadoModal();
      toast.success('Fornecedor deletado com sucesso!');

    } catch (error) {
      console.log('MEU ERRO DeleteFornecedor =', error);
      toast.error('Erro ao deletar fornecedor!');
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
        <h2>Fornecedor</h2>
        <input
          type={"text"}
          placeholder="Digite o nome"
          value={'Razão Social:  ' + props.razaoSocial}
          onChange={(e) => props.setNomeDoc(e.target.value)}
        />

        <input
          type={"text"}
          placeholder="Digite o nome"
          value={'Tipo Fornecedor:  ' + props.tipoFornecedor}
          onChange={(e) => props.setTipoFornecedor(e.target.value)}
        />

        <input
          type={"text"}
          placeholder="Digite o CNPJ"
          value={'CNPJ:  ' + cnpjMask(props.cnpj)}
          onChange={(e) => props.setCnpj(e.target.value)}
        />

        <input
          type={"text"}
          placeholder="Digite a Inscrição Estadual"
          value={'IE:  ' + props.inscricao}
          onChange={(e) => props.setInscricao(e.target.value)}
        />

        <input
          type={"text"}
          placeholder="Digite o Endereço"
          value={'Endereço:  ' + props.endereco}
          onChange={(e) => props.setEndereco(e.target.value)}
        />

        <input
          type={"text"}
          placeholder="Digite o Telefone"
          value={'Telefone:  ' + props.cell}
          onChange={(e) => props.setCell(e.target.value)}
        />

        <input
          type={"text"}
          placeholder="Digite o CEP"
          value={'CEP:  ' + cepMask(props.cep)}
          onChange={(e) => props.setCep(e.target.value)}
        />

        <input
          type={"text"}
          placeholder="Digite o Estado"
          value={'Estado:  ' + props.estado}
          onChange={(e) => props.setEstado(e.target.value)}
        />

        <input
          type={"text"}
          placeholder="Digite a Cidade"
          value={'Cidade:  ' + props.cidade}
          onChange={(e) => props.setCidade(e.target.value)}
        />

        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
          {/* <BtnEditar onClick={editDoc}>
            Editar
          </BtnEditar> */}

          <BtnExluir onClick={deleteFornecedor}>
            Excluir
          </BtnExluir>
        </div>

      </Container>
    </Modal>
  )
}