import React from "react";
import styled from "styled-components";
import { Board, Cell, Col, Row } from "./components";
import Actions from "./components/Actions";
import Timer from "./components/Timer";
import Minesweeper, {
  Board as BoardType,
  Cell as CellType,
  GameState,
} from "./core/Minesweeper";

const MainContent = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #e5e4ec;
`;

function App() {
  const [minesweeper] = React.useState<Minesweeper>(new Minesweeper());
  const [board, setBoard] = React.useState<BoardType>(minesweeper.getBoard());

  React.useEffect(() => {
    minesweeper.addEventListener("movement", setBoard);
  }, [minesweeper]);

  function revealCell(x: number, y: number) {
    minesweeper.revealCell(x, y);
  }

  function placeFlag(event: React.MouseEvent, x: number, y: number) {
    event.preventDefault();
    minesweeper.placeFlag(x, y);
  }

  return (
    <MainContent>
      <Actions />
      <Board>
        <Row>
          {board?.map((col: any[], xIdx: number) => {
            return (
              <Col key={xIdx}>
                {col.map((el: CellType, yIdx: number) => {
                  return (
                    <Cell
                      key={yIdx}
                      onClick={() => revealCell(xIdx, yIdx)}
                      onContextMenu={(event) => placeFlag(event, xIdx, yIdx)}
                    >
                      {el}
                    </Cell>
                  );
                })}
              </Col>
            );
          })}
        </Row>
      </Board>
    </MainContent>
  );
}

export default App;
