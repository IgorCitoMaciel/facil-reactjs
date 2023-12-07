import styled from "styled-components";

export const Container = styled.div`
display: flex;
height: 100vh;
width: 100vw;
background-image: url("/bglogin.jpg");
background-position: center;
background-size: cover;
position: relative;
overflow: hidden;

`;

export const AreaImage = styled.div`
display: flex;
flex: 3;
justify-content: center;
align-items: center;
background-image: url("/engenharia.jpeg");
background-position: center;
background-size: cover;
position: relative;
overflow: hidden;
width: 100%;
height: 100%;
`;

export const AreaImageOverlay = styled.div`
width: 100%;
height: 100%;
opacity: 0.7;
background-color: #020f23;

`;

export const AreaTitle = styled.div`

display: flex;
flex-direction:column;
align-items: center;
margin-bottom: 50px;
`;

export const Title = styled.h1`
margin-bottom: 0px;
color: #fff;
`;

export const ContainerLogin = styled.div`
display: flex;
width: 100%;
place-items: center;
justify-content: center;
align-items: center;
`;

export const AreaLogin = styled.form`
display: flex;
height: 500px;
width: 500px;
flex-direction: column;
justify-content: center;
align-items: center;
background-color: #00265C;
box-shadow: 1px 2px 8px rgb(0 0 0 / 65%);
border-radius: 10px;
`;

export const AreaInput = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

export const Input = styled.input`
margin-bottom: 1.2rem;
height: 45px;
width: 350px;
background-color: #101026;
border-radius: 0.5rem;
color: #fff;
padding: 1rem;
border: 1px solid #0472a4;
::placeholder{
  color: rgba(255,255,255, 0.8);
  font-style: italic;
}
`;

export const ButtonLogar = styled.button`
  background-color: #D9841E;
  margin-top: 50px;
  height: 40px;
  width: 400px;
  border-radius: 0.5rem;
  font-size: 1.2rem;
  border: none;
  cursor: pointer;

  &:hover {
    background: #0472a4;  
    border-radius: 7px;
    box-shadow: 2px 3px 8px rgba(0, 0, 0, 0.65);
    color: white;
    transition: all .4s;
    transform: scale(1.05);
  }
`;

export const ButtonLogando = styled.button`
  background-color: #0472a4;
  margin-top: 50px;
  height: 40px;
  width: 400px;
  border-radius: 0.5rem;
  font-size: 1.2rem;
  border: none;
  /* cursor: pointer; */
`;

export const Textlogar = styled.h1`
font-size: 18px;
color: #f5f5f5;
`;

export const AreaSelect = styled.div`
background-color: #101026;
margin-top: 0px;
width:350px;
height: 41px;
align-items: center;
justify-content: center;
display: flex;
border-radius:0.5rem;
border: 1px solid #8a8a8a;
`;

export const Select = styled.select`
height: 40px;
width: 320px;
margin-top: 0px;
align-items: center;
justify-content: center;
background-color: #101026;
color: rgba(255,255,255, 0.8);
border: 1px solid;
border: none;
font-style: italic;
`;