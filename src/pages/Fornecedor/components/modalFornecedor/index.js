import React, { useState } from "react";
import { toast } from "react-toastify";
import Modal from 'react-modal';
import {cnpjMask, cepMask} from "../../../../components/mask"
import {
  AreaSelectCC,
  BtnAdd,
  Container,
  SelectCC,
} from "./styles";
import { api } from "../../../../services/apiClient";


export function ModalFornecedor(props) {
  const [novoDoc, setNovoDoc] = useState("");

  const [nomeFornecedor, setNomeFornecedor] = useState('');
  const [tipoFornecedor, setTipoFornecedor] = useState('');
  const [idFornecedor, setIdFornecedor] = useState('');
  const [listaFornecedor, setListaFornecedor] = useState([]);
  const [cnpj, setCnpj] = useState('');
  const [inscricao, setInscricao] = useState('');
  const [cep, setCep] = useState('');

  const [razaoSocial, setRazaoSocial] = useState('');
  const [endereco, setEndereco] = useState('')
  const [cell, setCell] = useState('')
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');


  async function addFornecedor(event) {
    event.preventDefault()
    const data = {
      company_name: razaoSocial,
      cnpj: cnpj,
      ie: inscricao,
      address: endereco,
      cell:cell,
      cep: cep,
      state: estado,
      city: cidade,
      description_type: tipoFornecedor
    }


    if (data.company_name && data.cnpj && data.ie && data.address && data.cep && data.state && data.city && data.description_type && data.cell) {
      try {
        const result = await api.post('/fornecedor', data)
        console.log('caiu aqui no AddFornecedor', result)
        props.handleCloseAddFornecedorModal();

        toast.success('Fornecedor adicionado com sucesso!')

      } catch (error) {
        console.log('MEU ERRO AddFornecedor =', error);
        toast.error('Erro ao adicionar fornecedor!')
      }
    } else {
      toast.error('Preencha todos os campos!')

    }
  }

  function limpaCampo() {
    setRazaoSocial("");
    setCnpj("");
    setInscricao("");
    setCep("");
    setEndereco("");
    setEstado("");
    setCidade("");
    setTipoFornecedor("");
    setIdFornecedor('');
    setCell('');
  }



  return (
    <Modal
      ariaHideApp={false}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      isOpen={props.isAddFornecedorModal}
      onRequestClose={props.handleCloseAddFornecedorModal}
    >
      <button type="button" className="react-modal-close" onClick={() => { props.handleCloseAddFornecedorModal(), limpaCampo() }}>
        X
      </button>
      <Container>
        <h2>Novo Fornecedor</h2>
        <input
          type={"text"}
          placeholder="Digite o nome"
          value={razaoSocial}
          onChange={(e) => setRazaoSocial(e.target.value)}
        />

        <AreaSelectCC>
          <SelectCC
            name="Selecione o tipo"
            value={tipoFornecedor}
            onChange={(e) => setTipoFornecedor(e.target.value)}
          >
            <option value="">Selecione o tipo</option>
            <option value="material">Material</option>
            <option value="serviço">Serviço</option>
          </SelectCC>
        </AreaSelectCC>

        <input
          type={"text"}
          placeholder="Digite o CNPJ"
          value={cnpjMask(cnpj)}
          onChange={(e) => setCnpj(e.target.value)}
        />

        <input
          type={"text"}
          placeholder="Digite a Inscrição Estadual"
          value={inscricao}
          onChange={(e) => setInscricao(e.target.value)}
        />

        <input
          type={"text"}
          placeholder="Digite o endereço"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
        />

        <input
          type={"text"}
          placeholder="Digite o Telefone"
          value={cell}
          onChange={(e) => setCell(e.target.value)}
        />

        <input
          type={"text"}
          placeholder="Digite o CEP"
          value={cepMask(cep)}
          onChange={(e) => setCep(e.target.value)}
        />

        <input
          type={"text"}
          placeholder="Digite o Estado"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
        />

        <input
          type={"text"}
          placeholder="Digite a Cidade"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
        />

        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <BtnAdd onClick={addFornecedor}>
            Criar
          </BtnAdd>
        </div>

      </Container>
    </Modal>
  )
}