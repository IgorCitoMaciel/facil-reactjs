import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const AreaLogo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
  
`;

export const MediumCube = styled.div`
  height: 60px;
  width: 45px;
  border: 7px groove #0472a4;
  border-radius: 7px;
`;

export const HighCube = styled.div`
  height: 80px;
  width: 65px;
  border: 7px groove #0472a4;
  border-radius: 7px;
`;

export const LowCube = styled.div`
  height: 40px;
  width: 40px;
  border: 7px groove #0472a4;
  border-radius: 7px;
`;

export const Title = styled.h1`
  color: #f9f9f9;
  font-size: 2.0rem;
  margin-top: 5px;
  font-family: sans-serif;
`;