import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  background-color: #f5f5f5;
`;

export const ContentArea = styled.div`
display: flex;
height: 100vh;
width: 100%;
flex-direction: column;
padding: 3px 0px 0px 0px;
background-color: #0472a4;
`;


export const AreaCampos = styled.div`
  display: flex;
  height: 100vh;
  /* width:75vw; */
  flex-direction: column;
  background-color: #fff;
  border-radius: 5px;
  border-top: 0.2em solid #0472a4;
  box-shadow: 0px 5px 5px 1px #18181840;
  overflow: hidden;
`;

export const AreaContainerCampos = styled.div`
  padding: 30px 40px;
`;


export const HeaderAreaCampos = styled.div`
  display: flex;
  height: 60px;
  flex-direction: row;
  padding: 20px;
  background-color: transparent;
  border-bottom: 0.05em solid #18181898;
  align-items: center;
`;

export const TitleHome = styled.h1`
  color: #18181898;
  font-size: 28px;
  font-family: "Roboto", sans-serif;
  font-style: italic;
  margin-left: 40px;
`;

export const ContainerGrafico = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  //background-color: #19ff;
  margin-top: 50px;
  height: 400px;
  width: 100%;
`;

export const AreaGrafico = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  //background-color: #F12;
  border: 2px solid rgba(0,0,0,0.2);
  padding: 30px 10px 10px 10px;
`;

export const Title = styled.h1`
color: #18181898;
font-size: 28px;
font-family: "Roboto", sans-serif;
font-style: italic;
margin-bottom: 20px;
`;

export const BtnDeslogar = styled.button`
  background-color: #0472a4;
  margin-top: 20px;
  height: 50px;
  width: 200px;
  border-radius: 0.2rem;
  font-size: 1.2rem;
  border: none;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    transition: all 0.5s ease-in-out;
    background-color: #33cc95;
  }
`;