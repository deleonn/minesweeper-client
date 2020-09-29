import React from "react";
import styled from "styled-components";
import { Board, Cell, Col, Row } from "./components";
import Actions from "./components/Actions";
import Modal from "./components/Modal";
import Timer from "./components/Timer";
import useModal from "./components/useModal";
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
  const [minesweeper] = React.useState<Minesweeper>(new Minesweeper("medium"));
  const [board, setBoard] = React.useState<BoardType>(minesweeper.getBoard());
  const [gameState, setGameState] = React.useState<GameState>(
    minesweeper.getGameState()
  );
  const { isShowing, toggle } = useModal();

  React.useEffect(() => {
    minesweeper.addEventListener("movement", setBoard);
    minesweeper.addEventListener("state", setGameState);
    console.info(
      `INSTRUCTIONS: Right click to reveal cell, left click to place a flag. Have fun!`
    );

    const gameParameters = localStorage.getItem("game_instance");

    if (gameParameters) {
      console.log("Restoring game parameters");
      minesweeper.restoreGameParameters(JSON.parse(gameParameters));
      setBoard(minesweeper.getBoard());
    }
  }, [minesweeper]);

  React.useEffect(() => {
    if (gameState === "lost" || gameState === "won") {
      toggle();
    }
  }, [gameState]);

  React.useEffect(() => {
    localStorage.setItem(
      "game_instance",
      JSON.stringify(minesweeper.getCurrentGameParameters())
    );
  }, [board]);

  function revealCell(x: number, y: number) {
    minesweeper.revealCell(x, y);
  }

  function placeFlag(event: React.MouseEvent, x: number, y: number) {
    event.preventDefault();
    minesweeper.placeFlag(x, y);
  }

  function startNewGame() {
    minesweeper.new();
  }

  return (
    <MainContent>
      {gameState === "active" && <Timer />}
      <Actions startGame={startNewGame} />
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
      <Modal isShowing={isShowing} hide={toggle} state={gameState} />
    </MainContent>
  );
}

export default App;
