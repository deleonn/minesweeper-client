import React from "react";
import styled from "styled-components";

const Container = styled.div``;

const Button = styled.button`
  border-radius: 0.4rem;
  background: #e5e4ec;
  box-shadow: 5px 5px 10px #c3c2c9, -5px -5px 10px #ffffff;
  border: none;
  padding: 0.6rem 1.5rem;
  outline: none;
  margin: 0 0.6rem;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }

  &:active {
    background: linear-gradient(145deg, #cecdd4, #f5f4fd);
  }
`;

function Actions() {
  return (
    <Container>
      <Button style={{ color: "#4444ee" }}>New Game</Button>
      <Button style={{ color: "#de4bab" }}>Save Game</Button>
      <Button style={{ color: "#a34bde" }}>Load Game</Button>
    </Container>
  );
}

export default Actions;
