import React from "react";
import { Container, ContentArea, Title } from "./styles";
import SideBar from "../../components/sideBar";
import FadeLoader from "react-spinners/BeatLoader"

export default function Ateste() {
  return (
    <Container>
      <SideBar />
      {/* <ContentArea>
        <FadeLoader
          color={"#0472a4"}
          size={5}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <Title>Carregando...</Title>
      </ContentArea> */}

      <ContentArea>
        <Title>Carregando</Title>
        <div style={{ display: 'flex', alignItems: "flex-end", justifyContent: "flex-end", height: 30 }}>
          <FadeLoader
            color={"#0472a4"}
            size={5}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>

      </ContentArea>
    </Container>
  )
}