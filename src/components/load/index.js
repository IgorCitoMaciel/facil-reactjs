import React from "react";
import SideBar from "../sideBar";
import FadeLoader from "react-spinners/FadeLoader"
import { Container, ContentArea, Title } from "./styles";


export function Load(){
  return (
    <Container>
      <SideBar />
      <ContentArea>
        <FadeLoader
          color={"#0472a4"}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <Title>Carregando...</Title>
      </ContentArea>
    </Container>
  )
}