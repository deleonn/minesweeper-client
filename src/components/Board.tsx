import React from "react";
import styled from "styled-components";

interface Props {
  children: React.ReactChild | React.ReactChild[] | undefined;
}

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Board({ children }: Props) {
  return <Container>{children}</Container>;
}

export default Board;
