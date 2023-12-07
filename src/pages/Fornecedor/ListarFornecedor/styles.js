import styled from "styled-components";
import { theme } from "../../../global/styles";

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
background-color: ${theme.colors.blueContent};
`;


export const AreaCampos = styled.div`
display: flex;
height: 100vh;
//width:75vw;
flex-direction: column;
background-color: #fff;
border-radius: 5px;
border-top: 0.2em solid #0472a4;
box-shadow: 0px 5px 5px 1px #18181840;
overflow: hidden;
//background-color: #f12;
`;

export const HeaderAreaCampos = styled.div`
display: flex;
height: 60px;
flex-direction: row;
padding: 20px;
background-color: transparent;
border-bottom: 0.05em solid #18181898;
align-items: center;
//background-color: #f12;
`;

export const AreaContainerCampos = styled.div`
padding: 30px 30px;
display: flex;
flex-direction: column;
`;

export const TitleInput = styled.h3`
color: #000;
margin-bottom:5px;
font-family: "Roboto", sans-serif;
font-weight: 300;
`;

export const Title = styled.h1`
color: #18181898;
font-size: 28px;
font-family: "Roboto", sans-serif;
font-style: italic;
margin-left: 40px;
`;


export const SelectCC = styled.select`
height: 38px;
width: 320px;
align-items: center;
justify-content: center;
color: #18181898;
border: none;
font-style: normal;
font-family: "Roboto", sans-serif;
font-weight: 400;
`;

export const AreaCimaInput = styled.div`
display: flex;
flex-wrap: wrap;
align-items: center;
justify-content: space-between;
padding-right: 0px;
//background-color: #1ec;
`;

export const InputObs = styled.textarea`
margin-bottom: 30px;
height: 200px;
width: 50%;
border-radius: 0.2rem;
color: #18181898;
padding: 1rem;
border: 0.5px solid #18181898;
font-size: 16px;
resize: none;
font-family: "Roboto", sans-serif;
font-weight: 400;
`;

export const AreaBtn = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
padding-right: 15px;
`;

export const BtnSalvar = styled.button`
  background-color: ${theme.colors.blueBtnSalvar};
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
    background-color: ${theme.colors.greenBtnSalvar};
  }
`;

export const BtnText = styled.h3`
color: #fff;
font-size: 18px;
font-family: "Roboto", sans-serif;
`;

export const AreaComponentBtnAdd = styled.div`
display: flex;
flex-direction: row;
align-items: flex-end;
`;

export const BtnAdd = styled.button`
  background-color: #fff;
  border: 0.2px solid #18181898;
  margin-left: 5px;
  margin-bottom: 20px;
  height: 45px;
  width: 50px;
  border-radius: 0.2rem;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    transition: all 0.5s ease-in-out;
    filter: brightness(0.9);
  }
`;

export const BtnTextAdd = styled.h3`
color: #18181898;
font-size: 28px;
font-family: "Roboto", sans-serif;
`;


export const TheadTr = styled.tr`
background-color: #0472a4;
color: #ffffff;
text-align: left;
`;

export const Th = styled.th`
padding: 12px 15px;
`;

export const Td = styled.td`
padding: 12px 15px;
`;

export const TbodyTr = styled.th`
border-bottom: 1px solid #dddddd;

&:nth-of-type(even){
  background-color: #f3f3f3;
}

&:last-of-type {
    border-bottom: 2px solid #009879;
}

.active-row {
    font-weight: bold;
    color: #009;
}
`;


export const Table = styled.table`
  border-radius: 5px;
  border-spacing: 0;
  border-collapse: collapse;
  overflow: hidden;
  margin: 25px 0;
  font-size: 0.9em;
  font-family:'Roboto', sans-serif;
  min-width: 400px;
  width: 100%;
  height: 100%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  text-align: center;

`;

export const Trr = styled.tr`
  padding: 5px 12px;
`;

export const Tdd = styled.td`
  padding: 5px 10px;
  border-bottom: 0.5px solid #dddddd;
`;

export const Thh = styled.td`
  padding: 5px 12px;
  background-color: #0472a4;
  color:#fafafa;
`;


export const AreaImg = styled.div`
display:flex;
flex-direction: column;
align-items: center;
width: 100%;
height: 400px; 
padding: 0px 250px;
//background-color: #1ec;
resize: both;
//object-fit: cover;
`;

export const TextImg = styled.h3`
color: #18181898;
font-size: 20px;
font-family: "Roboto", sans-serif;
`;

export const BtnListOc = styled.button`
width: 30px;
height: 30px;
justify-content: center;
align-items: center;
cursor: pointer;
`;

export const BtnCriar = styled.button`
  background-color: ${theme.colors.blueBtnSalvar};
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