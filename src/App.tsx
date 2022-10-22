import React from "react";
import styled from "styled-components";
import { CalculationForm } from "./Components/CalculationForm/CalculationForm";

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  margin-top: 5rem;
`;

function App() {
  return (
    <Center>
      <CalculationForm />
    </Center>
  );
}

export default App;
