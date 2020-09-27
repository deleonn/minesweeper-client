import React from "react";
import styled from "styled-components";

interface Props {
  children: React.ReactChild | React.ReactChild[] | undefined;
}

const Container = styled.div`
  padding: 3rem 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Board({ children }: Props) {
  return <Container>{children}</Container>;
}

export default Board;
