import styled from "styled-components";

export const Container = styled.div`

  display: flex;
  flex-direction: column;
  /* overflow: auto; */
  /* width: 100%; */
  height: 100%;
  position: relative;
  padding-bottom: 2rem;

  h1 {
    color: #18181898;
    font-size: 1rem;
    font-family: "Roboto", sans-serif;
    margin-bottom: 5px;
    margin-top: 1px;

  }

  h2 {
    color: #18181898;
    font-size: 1.5rem;
    font-family: "Roboto", sans-serif;
    
    
  }

  h3 {
    font-size: 1rem;
    font-family: "Roboto", sans-serif;
    margin-left: 20px;
  }

  p {
    color: #18181898;
    font-size: 1rem;
    font-family: "Roboto", sans-serif;
    margin-bottom: 2rem;
  }

  /* input {
    width: 40%;
    padding: 0 1.5rem;
    height: 2rem;
    border-radius: 0.25rem;
    background-color: #e7e9ee;
    border: 1px solid #d7d7d7;
    font-weight: 400;
    font-size: 1rem;
    color: #18181898;
    margin-bottom: 15px;

    ::placeholder{
      color: #b3b3b3;
    }
  } */

 
`;

export const BtnEditar = styled.button`
  width: 20%;
    height: 2rem;
    padding: 0 1.5rem;
    background-color: #0472a4;
    color: #FFF;
    border-radius: 0.25rem;
    border: 0;
    font-size: 1.1rem;
    font-family: "Roboto", sans-serif;
    margin-top: 0.5rem;

    &:hover {
    transform: scale(1.05);
    transition: all 0.5s ease-in-out;
    background-color: #33cc95;
    margin-left: 2px;
  }
`;

export const BtnExluir = styled.button`
  width: 20%;
  height: 2rem;
  padding: 0 1.5rem;
  background-color: #d42813;
  color: #FFF;
  border-radius: 0.25rem;
  border: 0;
  font-size: 1.1rem;
  font-family: "Roboto", sans-serif;
  margin-top: 0.5rem;

  &:hover {
  transform: scale(1.05);
  transition: all 0.5s ease-in-out;
  background-color: #f12;
  margin-left: 2px;
  }
`;

export const BtnImprimir = styled.button`
  width: 97%;
  align-items: center;
  justify-content: center;
  height: 2rem;
  padding: 0 1.5rem;
  background-color: #0c4663;
  color: #FFF;
  border-radius: 0.25rem;
  border: 0;
  font-size: 1.1rem;
  font-family: "Roboto", sans-serif;
  margin-top: 0.5rem;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

    &:hover {
    transform: scale(1.05);
    transition: all 0.5s ease-in-out;
    background-color: #33cc95;
    margin-left: 2px;
  }
`;

export const InputModalOc = styled.input`
  width: 180px;
  padding: 0 1.5rem;
  height: 2rem;
  border-radius: 0.25rem;
  background-color: #e7e9ee;
  border: 1px solid #d7d7d7;
  font-weight: 400;
  font-size: 1rem;
  color: #18181898;
  margin-bottom: 15px;

::placeholder{
  color: #b3b3b3;
}
`;

export const AreaSelectCC = styled.div`
margin-bottom: 20px;
padding: 0 1.5rem;
width:180px;
height: 2rem;
align-items: center;
justify-content: center;
display: flex;
border-radius:0.2rem;
border: 0.5px solid #18181898;
background-color: #e7e9ee;
`;

export const SelectCC = styled.select`
height: 1.8rem;
width: 200px;
align-items: center;
justify-content: center;
color: #18181898;
border: none;
font-style: normal;
font-family: "Roboto", sans-serif;
font-weight: 400;
background-color: #e7e9ee;
`;

export const InputObs = styled.textarea`
margin-bottom: 30px;
height: 100px;
width: 100%;
border-radius: 0.2rem;
color: #18181898;
padding: 0.7rem 1rem;
border: 0.5px solid #18181898;
font-size: 16px;
resize: none;
font-family: "Roboto", sans-serif;
font-weight: 400;
overflow: auto;
`;

export const ContainerDoc = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  /* background-color: #3ec; */
`;

export const BarDoc = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: #000;
  height: 1px;
  margin-top: 20px;
  margin-bottom: 10px;
`;

export const TitleDoc = styled.h1`
color: #000;
font-size: 18px;
font-family: "Roboto", sans-serif;
font-style: normal;
font-weight: bold;
margin-left: 0px;
`;

export const DescriptionDoc = styled.h1`
color: #18181898;
font-size: 16px;
font-family: "Roboto", sans-serif;
font-style: normal;
font-weight: 400;
margin-left: 10px;
`;

export const LineDocRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 10px;
  /* background-color: #f12; */
`;

export const LineDocColumn = styled.div`
  display: flex;
  flex-direction: column;
  /* width: 100%; */
  margin-top: 10px;
  /* background-color: #f12; */
`;

export const AreaInsumo = styled.div`
display: flex;

flex-direction: column;
align-items: flex-start;
border: solid 2px #34496d;

`;

export const AreaInsumoModal = styled.div`
display: flex;
width: 100%;
min-height: 100px;
flex-direction: column;
align-items: flex-start;
border-radius: 0.6rem;
border: 0.5px solid #18181898;
margin-bottom: 20px;
padding: 10px 0px 0px 10px;
box-shadow: 0px 2px 5px 1px #18181840;
`;

export const TitleList = styled.h5`
color: #00000090;
font-size: 12px;
font-family: "Roboto", sans-serif;
margin-left: 5px;
/* background-color: #f12; */
`;


export const TextData = styled.h4`
color: #18181898;
font-size: 14px;
font-family: "Roboto", sans-serif;
margin-top: 1px;
margin-bottom: 0;
`;

export const TextList = styled.h5`
color: #18181898;
font-size: 12px;
font-family: "Roboto", sans-serif;
font-style: italic;
font-weight: 400;
/* background-color: #f12; */

`;

export const AreaBtnPagination = styled.div`
  display: flex;
  flex-direction: row;
  height: 45px;
  align-items: flex-end;
  justify-content: center;
  margin-bottom: 0px;
  padding-bottom: 10px;
  background-color: #FFF;

  
  position: fixed;
  bottom: 0;
  width: 100vw;
  padding-right: 270px;
  /* height: 40px; */
`;

export const CardHeader = styled.div`
background-color: #0472A4;
width: 100%;
padding: 5px;
`;

export const CardFooter = styled.div`
width: 100%;
padding: 5px;
border-color: #15151598;

`;

export const Input = styled.input `
border-Radius: 4px;
padding: 5px;
height: 32px;
width: 180px;
border-Width: 0.5px;
border-color: #15151598;
background-color: #e7e9ee;
border-style: "solid";
font-family: "Roboto";
margin-Bottom: 20px,
`;

export const Title = styled.h4 `
color: #f0f0f0;
font-size: 1.5rem;
font-family: "Roboto", sans-serif;
margin-top: 20px;  
background-color: #18181898;
padding:10px;
border-radius: 5px;
`;

export const BarTitle = styled.div`
  display: flex;
  flex-direction: row;
  width: 195px;
  background-color: #18181898;
  height: 4px;
  margin-top: 0px;
  margin-bottom: 0px;
  margin-bottom: 2rem;
  border-radius: 4px;
  box-shadow: 0px 2px 2px 1px #18181840;
`;

export const BtnParcelaNaoPaga = styled.button`
  margin-top: 10px;
  height: 30px;
  width: 100%;
  border-radius: 4px;
  border-width: 0.5px;
  background-color: #F08214;
`;

export const BtnParcelaPaga= styled.button`
  margin-top: 10px;
  height: 30px;
  width: 100%;
  border-radius: 4px;
  border-width: 0.5px;
  background-color: #3FB318;
`;

export const TextPago = styled.h5`
color: #18181898;
font-size: 14px;
font-family: "Roboto", sans-serif;
margin-top: 1px;
margin-bottom: 0;
`;