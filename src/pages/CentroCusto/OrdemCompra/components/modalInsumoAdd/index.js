import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from 'react-modal';
import CurrencyInput from 'react-currency-input-field';
import { cnpjMask, cepMask } from "../../../../../components/mask";
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
      unity_value: formatValorMoedaReal(valorUnidade),
      total_value: formatValorMoedaReal(valorTotal)
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

  function formatValorMoedaReal(valor) {
    const valorFormat = parseFloat(formatReal(valor).replace('.', '').replace(',', '.'))
    const valorFormatado = valorFormat.toLocaleString('pt-BR', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      //currency: 'BRL',
    });
    return valorFormatado
  }

  function formataStringEmNumber(valor) {
    const valorFormat = parseFloat(formatValorMoedaReal(valor.replace('.', '').replace(',', '.')))
    return valorFormat
  }

  function formatNumberEmString(valor) {
    const valorEmNumber = formataStringEmNumber(valor)
    const valorUnidadeString = valorEmNumber.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return valorUnidadeString;
  }

  useEffect(() => {
    console.log("Quantidade hook", formataStringEmNumber(quantidade))
    //const valorUnidadeNumber =  formatReal(valorUnidade).replace('.', '').replace(',', '.')

    const valorUnidadeFormatadoNumber = formatValorMoedaReal(valorUnidade)
    const valorFormatadoString = String(valorUnidadeFormatadoNumber); // Garante que valorFormatado seja uma string
    const valorUnidadeFinal = parseFloat(valorFormatadoString.replace('.', '').replace(',', '.'));
    console.log("ValorUnidade hook", valorUnidadeFinal)

    const valorTotalInsumoNumber = formataStringEmNumber(quantidade) * valorUnidadeFinal
    console.log("valorTotalInsumoNumber > > >", valorTotalInsumoNumber)
    const valorUnidadeString = valorTotalInsumoNumber.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    // valor formatado em string para modelo moeda real
    console.log(" valorUnidadeString > > > - - - -",valorUnidadeString) 
    //valorUnidadeString > > > - - - - 30.000,00
  
    // Atualize o estado aqui
    setValorTotal(valorUnidadeString);
    
  }, [quantidade, valorUnidade]); 

  // function isNumericString(value) {
  //   const number = Number(value.replace(',', '.'));
  //   return !isNaN(number);
  // }
  function isNumericString(value) {
    const number = Number(value.replace(/\./g, '').replace(',', '.'));
    return !isNaN(number);
  }
  //Nesta função isNumericString, nós removemos a vírgula, 
  //substituímos o ponto por uma vírgula e tentamos converter a string 
  //resultante em um número. Se a conversão for bem-sucedida, a função 
  //retorna true. Se a conversão falhar, a função retorna false.


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
          disabled={true}
          prefix="R$"
          placeholder="     valor total"
          onKeyUp={handleKeyUp}
          //value={valorTotal}
          value={valorTotal === '' || !isNumericString(valorTotal) ? '' : valorTotal}
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