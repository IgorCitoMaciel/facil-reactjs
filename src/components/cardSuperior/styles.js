import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  margin-bottom: 30px;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 120px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 3px 3px 5px 5px #18181840;
  padding: 10px;
  /* border: solid 2px #34496d; */
`;

export const CardContent = styled.div`
  display: flex; 
  width: 100%;
  flex-direction: row; 
  justify-content: space-between;
  align-items: center; 
  margin-bottom: 10px;
  padding: 0 15px;
`;

export const CardTitle = styled.h2`
  color: #207DF7;
  font-size: 1.5rem;
  font-family: "Roboto", sans-serif;
`;

export const CardSubTitle = styled.h2`
  color: #9F9F9F;
  width: 100%;
  padding: 0 20px;
  font-size: 0.9rem;
  font-family: "Roboto", sans-serif;
`;
