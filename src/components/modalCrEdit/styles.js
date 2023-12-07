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

export const BtnEditar = styled.button`
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
  margin-top: 5px;

::placeholder{
  color: #b3b3b3;
}
`;