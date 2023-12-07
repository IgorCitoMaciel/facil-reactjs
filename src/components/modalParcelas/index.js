import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from 'react-modal';
import CurrencyInput from 'react-currency-input-field';
import { cnpjMask, cepMask } from "../mask";
import {
  AreaSelectCC,
  BtnAdd,
  Container,
  InputModalOc,
  SelectCC,
} from "./styles";


export function ModalParcelas(props) {

  const [nomeFornecedor, setNomeFornecedor] = useState('');
  const [insumo, setInsumo] = useState("");
  const [tipoMaterial, setTipoMaterial] = useState('');
  const [unidade, setUnidade] = useState('');
  const [valorUnidade, setValorUnidade] = useState('');
  const [valorTotal, setValorTotal] = useState("");
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


  const parcelaModal = parseInt(props.pagamento)


  const addParcelas = (event) => {
    event.preventDefault();
    props.addParcela();
    props.handleCloseAddParcelasModal();

  }

  // console.log('Meu props.numeroParcela', props.numeroParcela)

  function limpaCampo() {
    setUnidade("");
    setTipoMaterial("");
    setValorUnidade("");
  }

  function ListandoPagamento() {
    const parcela = parseInt(props.pagamento)
    for (let index = 1; index <= parcela; index++) {

      // console.log("Meu Index",index)
      <h1>{index}</h1>

    }
  }

  const ListaGG = () => {
    const lista = []
    const parcela = parseInt(props.pagamento)
    for (let index = 1; index <= parcela; index++) {

      lista.push(<h1 key={index}>{index}</h1>)


    }
    return lista

  }

  function FiltraCompData() {
    if (props.numeroParcela == "1") {
      return (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p>Data de vencimento 1</p>
          <InputModalOc
            type="date"
            value={props.dataVencimento1}
            onChange={(e) => props.setDataVencimento1(e.target.value.split('-').reverse().join('-'))}
          />
        </div>
      )
    } if (props.numeroParcela == "2") {
      return (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p>Data de vencimento</p>
          <InputModalOc
            type="date"
            value={props.dataVencimento2}
            onChange={(e) => props.setDataVencimento2(e.target.value.split('-').reverse().join('-'))}
          />
        </div>
      )
    } if (props.numeroParcela == "3") {
      return (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p>Data de vencimento</p>
          <InputModalOc
            type="date"
            value={props.dataVencimento3}
            onChange={(e) => props.setDataVencimento3(e.target.value.split('-').reverse().join('-'))}
          />
        </div>
      )
    } if (props.numeroParcela == "4") {
      return (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p>Data de vencimento</p>
          <InputModalOc
            type="date"
            value={props.dataVencimento4}
            onChange={(e) => props.setDataVencimento4(e.target.value.split('-').reverse().join('-'))}
          />
        </div>
      )
    } if (props.numeroParcela == "5") {
      return (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p>Data de vencimento</p>
          <InputModalOc
            type="date"
            value={props.dataVencimento5}
            onChange={(e) => props.setDataVencimento5(e.target.value.split('-').reverse().join('-'))}
          />
        </div>
      )
    } if (props.numeroParcela == "6") {
      return (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p>Data de vencimento</p>
          <InputModalOc
            type="date"
            value={props.dataVencimento6}
            onChange={(e) => props.setDataVencimento6(e.target.value.split('-').reverse().join('-'))}
          />
        </div>
      )
    }
  }




  return (
    <Modal
      ariaHideApp={false}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      isOpen={props.isAddParcelasModal}
      onRequestClose={props.handleCloseAddParcelasModal}
    >
      <button type="button" className="react-modal-close" onClick={() => { props.handleCloseAddParcelasModal(), limpaCampo() }}>
        X
      </button>
      <Container>
        <h2>Parcela</h2>
        <FiltraCompData />

        {/* <AreaSelectCC>
          <SelectCC
            name="Selecione o Fornecedor"
            value={props.listaInsumo}
            onChange={(e) => props.setListaInsumo(e.target.value)}
          >
            <option value="">Selecione Insumo</option>
            {listaInsumoModal?.map((item) => {
              return (
                <option key={item.id} value={item.id}>{item.name}</option>
              )
            })}
          </SelectCC>
        </AreaSelectCC> */}





        {props.numeroParcela == "1" ?
          (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p>Valor de vencimento</p>
              <CurrencyInput
                id="input-example"
                value={props.valorVencimento1}
                allowDecimals={true}
                decimalScale={2}
                decimalsLimit={2}
                groupSeparator='.'
                decimalSeparator=','
                style={{
                  borderRadius: 5,
                  padding: 5,
                  height: 45,
                  width: 250,
                  borderWidth: 0.5,
                  borderColor: "#d7d7d7",
                  backgroundColor: "#e7e9ee",
                  borderStyle: "solid",
                  fontFamily: "Roboto",
                  marginBottom: 20,
                }}
                name="input-name"
                placeholder="     valor unidade"
                prefix="   R$ "
                onValueChange={(e) => props.setValorVencimento1(e)}
              />
            </div>

          ) : (
            props.numeroParcela == "2" ? 
            (
              <div style={{ display: "flex", flexDirection: "column" }}>
              <p>Valor de vencimento 2</p>
              <CurrencyInput
                id="input-example"
                value={props.valorVencimento2}
                allowDecimals={true}
                decimalScale={2}
                decimalsLimit={2}
                groupSeparator='.'
                decimalSeparator=','
                style={{
                  borderRadius: 5,
                  padding: 5,
                  height: 45,
                  width: 250,
                  borderWidth: 0.5,
                  borderColor: "#d7d7d7",
                  backgroundColor: "#e7e9ee",
                  borderStyle: "solid",
                  fontFamily: "Roboto",
                  marginBottom: 20,
                }}
                name="input-name"
                placeholder="     valor unidade"
                prefix="   R$ "
                onValueChange={(e) => props.setValorVencimento2(e)}
              />
            </div>

            ):
            (<></>)
          )}




        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <BtnAdd onClick={addParcelas}>
            Criar
          </BtnAdd>
        </div>

      </Container>
    </Modal>
  )
}