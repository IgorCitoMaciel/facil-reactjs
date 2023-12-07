import React from "react";
import { Container, AreaLogo, MediumCube, HighCube, LowCube, Title } from "./styles";

export function Logo(){
  return (
    <Container>
      <AreaLogo>
        <MediumCube></MediumCube>
        <HighCube></HighCube>
        <LowCube></LowCube>
      </AreaLogo>
      <Title>Podium</Title>
    </Container>
  )
}

