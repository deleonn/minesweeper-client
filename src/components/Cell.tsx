import React from "react";
import styled, { css } from "styled-components";
const bomb = require("./bomb.svg") as string;

interface Props {
  children: any;
  onClick: () => void;
}

const CellContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: white;
  border-radius: 10px;
  background: #e5e4ec;
  box-shadow: 5px 5px 20px #c3c2c9, -5px -5px 20px #ffffff;
  margin: 10px;
  width: 50px;
  height: 50px;
  border: none;
  outline: none;
  font-size: 1.6rem;
  &:hover {
    cursor: pointer;
  }

  ${({ children }) => {
    switch (children) {
      case 0:
        return css`
          background: linear-gradient(145deg, #cecdd4, #f5f4fd);
          color: transparent;
        `;
      case 1:
        return css`
          background: linear-gradient(145deg, #cecdd4, #f5f4fd);
          color: #4444ee;
        `;
      case 2:
        return css`
          background: linear-gradient(145deg, #cecdd4, #f5f4fd);
          color: #4bde81;
        `;
      case 3:
        return css`
          background: linear-gradient(145deg, #cecdd4, #f5f4fd);
          color: #b52727;
        `;
      case 4:
        return css`
          background: linear-gradient(145deg, #cecdd4, #f5f4fd);
          color: #de9c4b;
        `;
      case 5:
        return css`
          background: linear-gradient(145deg, #cecdd4, #f5f4fd);
          color: #ff8787;
        `;
      case 6:
        return css`
          background: linear-gradient(145deg, #cecdd4, #f5f4fd);
          color: #de4bab;
        `;
      case 7:
        return css`
          background: linear-gradient(145deg, #cecdd4, #f5f4fd);
          color: #a34bde;
        `;
      case 8:
        return css`
          background: linear-gradient(145deg, #cecdd4, #f5f4fd);
          color: #5d2d8c;
        `;
      case 9:
        return css`
          background: linear-gradient(145deg, #cecdd4, #f5f4fd);
          color: #6e2020;
        `;
      case 10:
        return css`
          background: linear-gradient(145deg, #cecdd4, #f5f4fd);
          color: #64de4b;
        `;
    }
  }}
`;

const Bomb = styled.img`
  width: 1.2rem;
  height: 1.2rem;
`;

function Cell({ children, onClick }: Props) {
  function handleClick() {
    onClick();
  }

  return (
    <CellContainer onClick={handleClick}>
      {children === 10 ? <Bomb src={bomb} /> : children}
    </CellContainer>
  );
}

export default Cell;
