import styled from "styled-components";

const Cell = styled.button`
  background: none;
  margin: 0;
  padding: 0;
  width: 40px;
  height: 40px;
  border: 2px solid black;
  &:hover {
    cursor: pointer;
    background: gray;
  }
`;

export default Cell;
