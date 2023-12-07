import React, { useEffect, useState } from "react";

export function addParcela(dataVencimento,valor, pagamento, valorDaParcela,
   valorVencimento1, dataVencimento1, valorVencimento2, dataVencimento2 ) {
  var listaParcelas = []

  if (!dataVencimento || !valor) {
    toast.error('Preencha todos os campos anteriores!')

  }

  else if (pagamento) {
    var valorParcela = parseFloat(valor) / parseFloat(pagamento)

    if (valorParcela === valorDaParcela) {
      // toast.error('Parcela já registrada!')
    }
    if (pagamento == "2") {
      listaParcelas =
        [
          {
            numero_parcela: "1",
            valor_parcela: valorVencimento1.toString(),
            data_vencimento: dataVencimento1.split('-').reverse().join('-'),
            pagamento: false,
          },
          {
            numero_parcela: "2",
            valor_parcela: valorVencimento2.toString(),
            data_vencimento: dataVencimento2.split('-').reverse().join('-'),
            pagamento: false,
          }
        ]
    }
    if (pagamento == "3") {
      listaParcelas =
        [
          {
            numero_parcela: "1",
            valor_parcela: valorParcela,
            data_vencimento: dataVencimento1,
            pagamento: "false",
          },
          {
            numero_parcela: "2",
            valor_parcela: valorParcela,
            data_vencimento: dataVencimento2,
            pagamento: "false",
          },
          {
            numero_parcela: "3",
            valor_parcela: valorParcela,
            data_vencimento: dataVencimento3,
            pagamento: "false",
          },
        ]
    }
    if (pagamento == "4") {
      listaParcelas =
        [
          {
            numero_parcela: "1",
            valor_parcela: valorParcela,
            data_vencimento: dataVencimento1,
            pagamento: "false",
          },
          {
            numero_parcela: "2",
            valor_parcela: valorParcela,
            data_vencimento: dataVencimento2,
            pagamento: "false",
          },
          {
            numero_parcela: "3",
            valor_parcela: valorParcela,
            data_vencimento: dataVencimento3,
            pagamento: "false",
          },
          {
            numero_parcela: "4",
            valor_parcela: valorParcela,
            data_vencimento: dataVencimento4,
            pagamento: "false",
          },
        ]
    }
    if (pagamento == "5") {
      listaParcelas =
        [
          {
            numero_parcela: "1",
            valor_parcela: valorParcela,
            data_vencimento: dataVencimento,
            pagamento: "false",
          },
          {
            numero_parcela: "2",
            valor_parcela: valorParcela,
            data_vencimento: dataVencimento,
            pagamento: "false",
          },
          {
            numero_parcela: "3",
            valor_parcela: valorParcela,
            data_vencimento: dataVencimento,
            pagamento: "false",
          },
          {
            numero_parcela: "4",
            valor_parcela: valorParcela,
            data_vencimento: dataVencimento,
            pagamento: "false",
          },
          {
            numero_parcela: "5",
            valor_parcela: valorParcela,
            data_vencimento: dataVencimento,
            pagamento: "false",
          },
        ]
    }
  }
  return setListaParcelas(listaParcelas)

}