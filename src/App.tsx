import React from "react";
import { Board, Cell, Col, Row } from "./components";
import Minesweeper, {
  Board as BoardType,
  Cell as CellType,
  GameState,
} from "./core/Minesweeper";

function App() {
  const [minesweeper] = React.useState<Minesweeper>(new Minesweeper());
  const [board, setBoard] = React.useState<BoardType | undefined>(
    minesweeper.getBoard()
  );
  const [gameState, setGameState] = React.useState<GameState>(
    minesweeper.getGameState()
  );

  React.useEffect(() => {
    minesweeper.addEventListener("movement", setBoard);
    minesweeper.addEventListener("state", setGameState);
  }, [minesweeper]);

  function revealCell(x: number, y: number) {
    minesweeper.revealCell(x, y);
  }

  return (
    <div>
      <p style={{ position: "absolute", left: "2rem", top: "2rem" }}>
        Game State: {gameState}
      </p>
      <Board>
        <Row>
          {board?.map((col: any[], xIdx: number) => {
            return (
              <Col key={xIdx}>
                {col.map((el: CellType, yIdx: number) => {
                  return (
                    <Cell key={yIdx} onClick={() => revealCell(xIdx, yIdx)}>
                      {el !== 0 ? el : ""}
                    </Cell>
                  );
                })}
              </Col>
            );
          })}
        </Row>
      </Board>
    </div>
  );
}

export default App;
