import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  background-color: #f5f5f5;
`;

export const Input = styled.input `
  margin-bottom: 20px;
width:380px;
height: 45px;
align-items: center;
justify-content: center;
display: flex;
border-radius:0.2rem;
border: 0.5px solid #18181898;
padding-left: 20px;
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
flex-direction: column;
background-color: #fff;
border-radius: 5px;
border-top: 0.2em solid #0472a4;
box-shadow: 0px 5px 5px 1px #18181840;
overflow: hidden;
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
padding: 30px 60px;
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

export const InputOC = styled.input`
margin-bottom: 20px;
height: 45px;
width: 380px;
background-color: transparent;
border-radius: 0.2rem;
color: #00000099;
padding: 1rem;
border: 0.5px solid #15151598;
font-size: 16px;
::placeholder{
  color: rgba(255,255,255, 0.8);
  font-style: italic;
}
`;

export const AreaSelectCC = styled.div`
margin-bottom: 20px;
width:380px;
height: 45px;
align-items: center;
justify-content: center;
display: flex;
border-radius:0.2rem;
border: 0.5px solid #18181898;
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
box-shadow: 0px 2px 5px 1px #18181840;
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
  background-color: #0472a4;
  margin-top: 20px;
  height: 50px;
  width: 200px;
  border-radius: 0.2rem;
  font-size: 1.2rem;
  border: none;
  cursor: pointer;
  box-shadow: 0px 2px 5px 1px #18181840;

  &:hover {
    transform: scale(1.05);
    transition: all 0.5s ease-in-out;
    background-color: #33cc95;
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
//background-color: #f12;
//justify-content: space-between;
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
    transform: scale(1.06);
    transition: all 0.5s ease-in-out;
    //filter: brightness(0.9);
    border: 2px solid #0472a4;
  }
`;

export const BtnTextAdd = styled.h3`
color: #18181898;
font-size: 28px;
font-family: "Roboto", sans-serif;

/* &:hover {
    transform: scale(1.06);
    transition: all 0.5s ease-in-out;
    color: #0472a4;
  } */
`;

export const AreaTitleInsumo = styled.div`
display: flex;
width: 100%;
height: 40px;
flex-direction: row;
justify-content: space-between;
align-items: center;
//background-color: #f12;
margin-top: 20px;
`;

export const AreaInsumo = styled.div`
display: flex;
width: 100%;
height: 300px;
flex-direction: column;
align-items: flex-start;
border-radius: 0.2rem;
border: 0.5px solid #18181898;
margin-bottom: 20px;
padding: 10px 0px 0px 10px;
box-shadow: 0px 2px 5px 1px #18181840;
`;

export const BtnAddInsumo = styled.button`
  background-color: #0472a4;
  height: 30px;
  width: 160px;
  border-radius: 0.2rem;
  font-size: 1.2rem;
  border: none;
  cursor: pointer;
  box-shadow: 0px 2px 5px 1px #18181840;

  &:hover {
    transform: scale(1.05);
    transition: all 0.5s ease-in-out;
    background-color: #33cc95;
  }
`;

export const BtnDeleteInsumo = styled.button`
  background-color: #d42813;
  height: 30px;
  width: 160px;
  border-radius: 0.2rem;
  font-size: 1.2rem;
  border: none;
  margin-right: 30px;
  cursor: pointer;
  box-shadow: 0px 2px 5px 1px #18181840;

  &:hover {
    transform: scale(1.05);
    transition: all 0.5s ease-in-out;
    background-color: #f12;
  }
`;

export const TitleList = styled.h1`
color: #00000090;
font-size: 15px;
font-family: "Roboto", sans-serif;
margin-left: 20px;
/* background-color: #f12; */
`;

export const TextList = styled.h3`
color: #18181898;
font-size: 15px;
font-family: "Roboto", sans-serif;
font-style: italic;
font-weight: 400;
/* background-color: #f12; */
max-width: 220px;
`;

export const BtnRegistrarParcelas = styled.button`
  background-color: #0472a4;
  height: 30px;
  width: 160px;
  margin-bottom: 20px;
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

export const AreaParcelas = styled.div`
display: flex;
width: 100%;
height: 300px;
flex-direction: column;
align-items: flex-start;
/* border: solid 2px #34496d; */
margin-bottom: 20px;
/* padding: 10px 0px 0px 10px; */
`;

export const Table = styled.table`
  border-radius: 5px;
  border-spacing: 0;
  border-collapse: collapse;
  overflow: hidden;
  margin: 15px 0;
  font-size: 0.9em;
  font-family:'Roboto', sans-serif;
  min-width: 400px;
  width: 100%;
  height: 100%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  text-align: center;
  margin-bottom: 55px;

`;

export const Trr = styled.tr`
  padding: 5px 12px;
  border: 1px solid rgba(0, 0, 0, 0.15)
`;

export const Tdd = styled.td`
  padding: 5px 10px;
  width: 100px;
  border-bottom: 0.5px solid #dddddd;
`;

export const TdCheck = styled.td`
  padding: 5px 10px;
  border-bottom: 0.5px solid #dddddd;
`;

export const Thh = styled.td`
  padding: 5px 12px;
  background-color: #0472a4;
  color:#fafafa;
`;

export const BtnAprovar = styled.button`
align-items: center;
justify-content: center;
/* display: flex;
flex-direction: row; */
cursor: pointer;

&:hover {
  transform: scale(1.05);
  transition: all 0.5s ease-in-out;
  filter: brightness(0.9);
  /* background-color: #33cc95; */
}`;

export const BtnAprovado = styled.div`
align-items: center;
justify-content: center;
//width: 6rem;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
background-color: #0472a4;
border-radius: 2px;


span {
  margin-left: 2000px;
}

`;

export const TdText = styled.td`
  padding: 5px 10px;
  color: #fff;
  //border-bottom: 0.5px solid #dddddd;
`;

export const BtnListOc = styled.button`
width: 30px;
height: 30px;
justify-content: center;
align-items: center;
cursor: pointer;
`;