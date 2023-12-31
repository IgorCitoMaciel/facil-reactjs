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
//width:75vw;
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
padding: 30px 30px;
display: flex;
flex-direction: column;
//background-color: #1bb;
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

// export const Table = styled.table`
// border-collapse: collapse;
// margin: 25px 0;
// font-size: 0.9em;
// font-family: sans-serif;
// min-width: 400px;
// box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
// `;

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

export const TdCheck = styled.h5`
  padding: 5px 10px;
  border-bottom: 0.5px solid #dddddd;
`;

export const Thh = styled.td`
  padding: 5px 12px;
  background-color: #0472a4;
  color:#fafafa;
`;

export const AreaContainerSelect = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-start;
`;


export const AreaSelectVenvimento = styled.div`
margin-bottom: 5px;
width:240px;
height: 40px;
align-items: center;
justify-content: center;
display: flex;
border-radius:0.2rem;
border: 0.5px solid #18181898;
`;

export const SelectVencimento = styled.select`
height: 33px;
width: 220px;
align-items: center;
justify-content: center;
color: #18181898;
border: none;
font-style: normal;
font-family: "Roboto", sans-serif;
font-weight: 400;
`;

export const AreaImg = styled.div`
display:flex;
flex-direction: column;
align-items: center;
width: 100%;
height: 400px; 
padding: 0px 350px;
//background-color: #1ec;
resize: none;
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
}

span {
  margin-left: 10px;
}
`;

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






// AREA CUSTOM PAGINATION

export const AreaBtnPagination = styled.div`
  display: flex;
  flex-direction: row;
  height: 45px;
  align-items: flex-end;
  justify-content: center;
  margin-bottom: 0px;
  padding-bottom: 10px;
  background-color: #FFF;
  padding-top: 20px;

  position: fixed;
  bottom: 0;
  width: 100vw;
  padding-right: 270px;
`;

export const BtnVoltar = styled.button`
  width: 90px;
  border: 0;
  background-color: #0472a4;
  border-radius: 2px;
  cursor: pointer;
  box-shadow: 0px 2px 5px 1px #18181840;

  &:hover {
    filter: brightness(0.9);

}
`;

export const BtnTexto = styled.h1`
  font-size: 1rem;
  padding: 5px 10px;
  color: #fff;
`;

export const PageText = styled.h1`
  font-size: 1rem;
  padding: 5px 20px;
  color: #0472a4;
`;

export const BtnAvancar = styled.button`
  //padding: 5px 10px;
  width: 90px;
  border: 0;
  background-color: #0472a4;
  border-radius: 2px;
  cursor: pointer;
  box-shadow: 0px 2px 5px 1px #18181840;

  &:hover {
    filter: brightness(0.9);

}
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
  margin-top: 50px;
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

export const BtnImprimir = styled.button`
  width: 97%;
  align-items: center;
  justify-content: center;
  height: 2rem;
  padding: 0 1.5rem;
  background-color: #13c;
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

export const PesquisaInsumo = styled.input`
height: 33px;
width: 220px;
padding: 0 0.5rem;
border-radius: 0.25rem;
font-weight: 400;
font-size: 1rem;
color: #18181898;

border: none;
font-style: normal;
font-family: "Roboto", sans-serif;
font-weight: 400;
`;
