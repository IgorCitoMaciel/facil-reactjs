import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from 'react-modal';
import { cnpjMask, cepMask } from "../mask";
import {
  AreaSelectCC,
  BtnAdd,
  Container,
  SelectCC,
} from "./styles";


export function ModalInsumo(props) {
  const [novoDoc, setNovoDoc] = useState("");
  const [nomeInsumo, setNomeInsumo] = useState("");
  const [unidade, setUnidade] = useState("");





  //console.log('Novo Doc', novoDoc)

  async function addDoc(event) {
    event.preventDefault()
    let data = {
      name: nomeInsumo,
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

  const addInsumo = (event) => {
    event.preventDefault()
    let data = {
      name: nomeInsumo,
      unity: unidade,
      tipo: props.despesa

    }
    var novaLista = [...props.lista, { ...data }]
    props.setLista(novaLista)
    props.handleCloseAddInsumoModal();
    setNomeInsumo("");
    setUnidade("");
    props.setDespesa("");
  }

  // console.log('Minha Lista Insumo', props.lista)



  return (
    <Modal
      ariaHideApp={false}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      isOpen={props.isAddInsumoModal}
      onRequestClose={props.handleCloseAddInsumoModal}
    >
      <button type="button" className="react-modal-close" onClick={props.handleCloseAddInsumoModal}>
        X
      </button>
      <Container>
        <h2>Insumo</h2>
        <input
          type={"text"}
          placeholder="Digite o nome"
          value={nomeInsumo}
          onChange={(e) => setNomeInsumo(e.target.value)}
        />

        <AreaSelectCC>
          <SelectCC
            name="Selecione a unidade"
            value={unidade}
            onChange={(e) => setUnidade(e.target.value)}
          >
            <option value="">Unidade de medida</option>
            <option value="KG">KG</option>
            <option value="SC">SC</option>
            <option value="PC">PC</option>
            <option value="M">M</option>
          </SelectCC>
        </AreaSelectCC>

        <div style={{ display: "flex", flexDirection: "column", marginRight: 0 }}>
          <AreaSelectCC>
            <SelectCC
              name="Selecione a empresa"
              value={props.despesa}
              onChange={(e) => props.setDespesa(e.target.value)}
            >
              <option value="">Selecione o tipo</option>
              {
                props.listaDespesa.map((item) => {
                  return (
                    <option key={item.id} value={item.name}>{item.name}</option>
                  )

                })}
            </SelectCC>
          </AreaSelectCC>
        </div>

        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <BtnAdd onClick={addInsumo}>
            Criar
          </BtnAdd>
        </div>

      </Container>
    </Modal>
  )
}