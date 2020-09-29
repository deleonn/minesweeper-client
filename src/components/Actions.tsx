import React from "react";
import styled from "styled-components";
import NeuButton from "./NeuButton";

interface Props {
  startGame: () => void;
}

const Container = styled.div``;

function Actions({ startGame }: Props) {
  return (
    <Container>
      <NeuButton style={{ color: "#4444ee" }} onClick={startGame}>
        New Game
      </NeuButton>
    </Container>
  );
}

export default Actions;
