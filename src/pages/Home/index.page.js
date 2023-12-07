import React, { useContext } from "react";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { AuthContext } from "../../contexts/AuthContext";
import { useRouter } from "next/router";
import ApexChart from "../../components/apexChart";
import {
  AreaCampos,
  AreaContainerCampos,
  BtnDeslogar,
  Container,
  ContentArea,
  HeaderAreaCampos,
  Title,
  TitleHome,
} from "./styles";

import SideBar from '../../components/sideBar';
import CardSuperior from "../../components/cardSuperior";


export default function Home() {
  const { user, signOut } = useContext(AuthContext)
  //const { asPath, pathname, query } = useRouter()

  
  // function signOut() {
  //   try{
  //     destroyCookie(undefined, '@nextauth.token')
  //     Router.push('/')
  //     console.log('Minha Rota', Router.pathname)
  //     console.log('Caiu no Try SignOut')
  //   }catch{
  //     console.log("Erro ao deslogar")
  //   }  
  // }

  return (
    <Container>
      <SideBar />
      <ContentArea>
        <AreaCampos>
          <HeaderAreaCampos>
            <TitleHome>Dashboard</TitleHome>
          </HeaderAreaCampos>
          <div style={{ overflow: "auto", display: "flex", flexDirection: "column" }}>
            <AreaContainerCampos>
              <CardSuperior />
              <ApexChart />
              <BtnDeslogar onClick={()=> signOut()} style={{ marginBottom: 50, marginTop: 50 }}>
                deslogar
              </BtnDeslogar>
            </AreaContainerCampos>
          </div>
        </AreaCampos>
      </ContentArea>
    </Container>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

  return {
    props: {}
  }
})