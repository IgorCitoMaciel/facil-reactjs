import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  background-color: #f5f5f5;
`;

export const TextCard = styled.h3`
  color: #18181898;
  font-size: 1.5rem;
  font-family: "Roboto", sans-serif;
  margin-bottom: 2rem;
`;

export const BtnDeslogar = styled.button`
  background-color: #d42813;
  color: #f5f5f5;
  border-radius: 0.25rem;
  border: 0;
  font-size: 1rem;
  font-family: "Roboto", sans-serif;
  margin-top: 0.5rem;
  width: 100%;
  height: 35px;
  cursor: pointer;

  &:hover {
    //transform: scale(1.05);
    transition: all 0.5s ease-in-out;
    background-color: #f12;
  }
`;
