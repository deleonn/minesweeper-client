import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { GameState } from "../core/Minesweeper";
import NeuButton from "./NeuButton";

interface Props {
  isShowing: boolean;
  hide: () => void;
  state: GameState | undefined;
}

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.36);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.p`
  opacity: 0.7;
  color: #de4bab;
  font-weight: bold;
`;

const Card = styled.div`
  min-width: 300px;
  min-height: 150px;
  padding: 1rem;
  background: #e5e4ec;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const Modal = ({ isShowing, hide, state }: Props) =>
  isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <Backdrop>
            <Card>
              {state === "lost" && (
                <Text>
                  You lost 😢 Click <i>New Game</i> to try again
                </Text>
              )}
              {state === "won" && <Text>You won! 🎉🙌</Text>}

              <NeuButton style={{ color: "#4444ee" }} onClick={hide}>
                Dismiss
              </NeuButton>
            </Card>
          </Backdrop>
        </React.Fragment>,
        document.body
      )
    : null;

export default Modal;
