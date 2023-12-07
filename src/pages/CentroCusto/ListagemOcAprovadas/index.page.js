import React, { useEffect, useState, useContext, useRef } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import axios from "axios";
import { Load } from "../../../components/load";
import { toast } from "react-toastify";
import Image from "next/image";
import imgNotFound from '../../../../public/not.png';
import SideBar from "../../../components/sideBar";
import { ModalOcEdit } from "../../../components/modalOcEdit";
import { canSSRAuth } from "../../../utils/canSSRAuth";



import {
  Container,
  AreaContainerCampos,
  AreaCampos,
  HeaderAreaCampos,
  Title,
  ContentArea,
  Table,
  Trr,
  Tdd,
  Thh,
  AreaSelectVenvimento,
  SelectVencimento,
  AreaImg,
  AreaContainerSelect,
  TextImg,
  BtnAprovar,
  BtnAprovado,
  TdText,
  TdCheck,
  AreaBtnPagination,
  BtnVoltar,
  BtnTexto,
  PageText,
  BtnAvancar,
  BtnListOc,
  BarDoc,
  LineDocColumn,
  TitleDoc,
  DescriptionDoc,
  ContainerDoc,
  LineDocRow,
  BtnImprimir,
  PesquisaInsumo,
} from "./styles";
import { useReactToPrint } from "react-to-print";
import { OcContextProvider } from "../../../contexts/OcContext";
import { CentroCusto } from "./CentroCusto";

const ListaDia = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
  '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26',
  '27', '28', '29', '30', '31']


export default function CentroCustoPage() {
  return (
    <OcContextProvider>
      <CentroCusto />
    </OcContextProvider>
  ) 
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

  return {
    props: {}
  }
})
