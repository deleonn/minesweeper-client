import React from "react";
import { Board, Cell, Col, Row } from "./components";
import Minesweeper, {
  Board as BoardType,
  Cell as CellType,
} from "./core/Minesweeper";

function App() {
  const [board, setBoard] = React.useState<BoardType | undefined>(undefined);

  React.useEffect(() => {
    const minesweeper = new Minesweeper();
    setBoard(minesweeper.getBoard());
  }, []);

  function getCoords(x: number, y: number) {
    return [x, y];
  }

  function returnBoard() {
    const cols = board?.map((col: any[], xIdx: number) => {
      return (
        <Row key={xIdx}>
          {col.map((el: CellType, yIdx: number) => {
            return (
              <Cell key={yIdx} onClick={() => getCoords(xIdx, yIdx)}>
                {el === 10 ? "true" : ""}
              </Cell>
            );
          })}
        </Row>
      );
    });

    return <Col>{cols}</Col>;
  }

  return (
    <div>
      <Board>{returnBoard()}</Board>
    </div>
  );
}

export default App;
