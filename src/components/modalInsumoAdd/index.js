import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from 'react-modal';
import CurrencyInput from 'react-currency-input-field';
import { cnpjMask, cepMask } from "../mask";
import {
  AreaSelectCC,
  AreaSelectVenvimento,
  BtnAdd,
  Container,
  InputValor,
  PesquisaInsumo,
  SelectCC,
} from "./styles";


export function ModalInsumoAdd(props) {

  const [nomeFornecedor, setNomeFornecedor] = useState('');
  const [insumo, setInsumo] = useState(0);
  const [insumoNome, setInsumoNome] = useState("");
  const [tipoMaterial, setTipoMaterial] = useState('');
  const [unidade, setUnidade] = useState('');
  const [valorUnidade, setValorUnidade] = useState('');
  const [valorTotal, setValorTotal] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [idFornecedor, setIdFornecedor] = useState('');
  const [listaInsumoModal, setListaInsumoModal] = useState(props.listaInsumo);
  const [cnpj, setCnpj] = useState('');
  const [inscricao, setInscricao] = useState('');
  const [cep, setCep] = useState('');

  const [razaoSocial, setRazaoSocial] = useState('');
  const [endereco, setEndereco] = useState('')
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [pesquisaInsumo, setPesquisaInsumo] = useState('');

  // console.log('listaInsumoModal',listaInsumoModal)


  const addInsumo = (event) => {
    event.preventDefault()
    let data = {
      name: insumoNome,
      und: unidade,
      material_type: tipoMaterial,
      amount: quantidade,
      unity_value: formatValorRequest(valorUnidade),
      total_value: formatValorRequest(valorTotal)
    }
    console.log('meu data add insumo z-z-z-z-z-', data)
    var novaLista = [...props.lista, { ...data }]
    props.setLista(novaLista) // o que será mandando para a request
    props.setInsumoOc(novaLista)
    props.handleCloseAddInsumoModal();
    setUnidade("");
    setTipoMaterial("");
    setValorUnidade("");
    setInsumo(0);
    setQuantidade("");
    setValorTotal("");
    props.setDespesa("");
  }

  //  console.log('Minha Lista Insumo', props.listaInsumo)

  function limpaCampo() {
    setUnidade("");
    setTipoMaterial("");
    setValorUnidade("");
    setQuantidade("");
    setValorTotal("");
    setInsumo(0);
  }

  function selecionaInsumo() {
    const insumoSelecionado = props.listaInsumo?.find((item, index) => item.id === insumo)

    setUnidade(() => insumoSelecionado ? insumoSelecionado?.und : "")
    // setInsumoNome(insumoSelecionado.name)
  }

  function selecionaMaterial() {
    const materialSelecionado = props.listaInsumo?.find((item, index) => item.id === insumo)
    //console.log("materialSelecionado -=-=-=-=-=",materialSelecionado?.name)
    setInsumoNome(materialSelecionado?.name)

    setTipoMaterial(() => materialSelecionado ? materialSelecionado?.material_type : "")
  }

  useEffect(() => {
    selecionaMaterial();
  }, [insumo])

  useEffect(() => {
    selecionaInsumo();
  }, [insumo])

  function currency(e) {
    let value = e.currentTarget.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d)(\d{2})$/, "$1,$2");
    value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");

    // value = value;

    e.currentTarget.value = value;
    return e;
  }

  const handleKeyUp = useCallback((e) => currency(e))

  function formatReal(int) {
    var value = int + '';

    value = value.replace(/\D/g, "");
    value = value.replace(/(\d)(\d{2})$/, "$1,$2");
    value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");
    return value;
  }

//  console.log('props.listaInsumo',props.listaInsumo)

  const resultFilter = props.listaInsumo
  .filter((valorAtual) => {
    if (!pesquisaInsumo) {
      return true
    }
    const regex = new RegExp(pesquisaInsumo, "i")

      return regex.test(valorAtual.name)

  })

  function formatValorRequest(valor) {
    const valorFormat = parseFloat(formatReal(valor).replace('.', '').replace(',', '.'))
    const valorFormatado = valorFormat.toLocaleString('pt-BR', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      //currency: 'BRL',
    });
    return valorFormatado
  }

  console.log("valorUnidade",formatValorRequest(valorUnidade))
  console.log("valorTotal",valorTotal)


  return (
    <Modal
      ariaHideApp={false}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      isOpen={props.isAddInsumoModal}
      onRequestClose={props.handleCloseAddInsumoModal}
    >
      <button type="button" className="react-modal-close" onClick={() => { props.handleCloseAddInsumoModal(), limpaCampo() }}>
        X
      </button>
      <Container>
        <h2>Adicionar Insumo</h2>

        <AreaSelectVenvimento>
          <PesquisaInsumo
            type={"text"}
            placeholder="Pesquise por insumo"
            value={pesquisaInsumo}
            onChange={(e) => setPesquisaInsumo(e.target.value)}
          />
        </AreaSelectVenvimento>

        <AreaSelectCC>
          <SelectCC
            name="Selecione o Fornecedor"
            value={insumo}
            onChange={(e) => setInsumo(+e.target.value)}
          >
            <option value={0}>Selecione Insumo</option>
            {resultFilter?.map((item) => {

              return (
                <option key={item.id} value={item.id}>{item.name}</option>
              )
            })}
          </SelectCC>
        </AreaSelectCC>

        <input
          type={"text"}
          placeholder="unidade de medida"
          value={unidade}
          disabled
        />


        <input
          type={"text"}
          placeholder="tipo de material"
          value={tipoMaterial}
          disabled
        />

        <input
          type={"text"}
          placeholder="Digite a quantidade"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
        />

        <InputValor
          prefix="R$"
          placeholder="     valor unidade"
          onKeyUp={handleKeyUp}
          value={formatReal(valorUnidade)}
          onChange={(e) => setValorUnidade(e.target.value)}
        />

        <InputValor
          prefix="R$"
          placeholder="     valor total"
          onKeyUp={handleKeyUp}
          value={formatReal(valorTotal)}
          onChange={(e) => setValorTotal(e.target.value)}
        />

        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <BtnAdd onClick={addInsumo}>
            Criar
          </BtnAdd>
        </div>

      </Container>
    </Modal>
  )
}