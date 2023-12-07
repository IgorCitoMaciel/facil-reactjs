import styled from "styled-components";

export const Container = styled.form`

  h2 {
    color: #18181898;
    font-size: 1.5rem;
    font-family: "Roboto", sans-serif;
    margin-bottom: 2rem;
  }

  input {
    width: 100%;
    padding: 0 1.5rem;
    height: 3rem;
    border-radius: 0.25rem;
    background-color: #e7e9ee;
    border: 1px solid #d7d7d7;
    font-weight: 400;
    font-size: 1rem;
    color: #18181898;

    ::placeholder{
      color: #b3b3b3;
    }
  }
`;

export const BtnAdd = styled.button`
  width: 40%;
  height: 2.8rem;
  padding: 0 1.5rem;
  background-color: #0472a4;
  color: #FFF;
  border-radius: 0.25rem;
  border: 0;
  font-size: 1.1rem;
  font-family: "Roboto", sans-serif;
  margin-top: 1.5rem;

  &:hover {
  transform: scale(1.05);
  transition: all 0.5s ease-in-out;
  background-color: #33cc95;
}
`;

export const BtnExluir = styled.button`
  width: 40%;
  height: 2.8rem;
  padding: 0 1.5rem;
  background-color: #d42813;
  color: #FFF;
  border-radius: 0.25rem;
  border: 0;
  font-size: 1.1rem;
  font-family: "Roboto", sans-serif;
  margin-top: 1.5rem;

  &:hover {
    transform: scale(1.05);
    transition: all 0.5s ease-in-out;
    background-color: #f12;
  }
`;

export const TitleInput = styled.h3`
color: #000;
margin-bottom:5px;
font-family: "Roboto", sans-serif;
font-weight: 300;
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

