interface Settings {
  rows: number;
  columns: number;
  bombs: number;
}

export type Board = Array<Cell[]>;
export type Cell = number | null;
export type EventQueue = {
  movement: Array<EventHandler>;
  state: Array<EventHandler>;
};
export type GameState = "new" | "active" | "won" | "lost";
export type GameEvent = "movement" | "state";
export type EventHandler = (event: any) => void;

class Minesweeper {
  private board: Board = [];
  private solutionBoard: Board = [];
  private rows: number;
  private columns: number;
  private bombs: number;
  private eventQueue: EventQueue = {
    movement: [],
    state: [],
  };
  private gameState: GameState = "new";

  constructor(settings?: Settings) {
    this.columns = settings?.columns || 8; // x axis
    this.rows = settings?.rows || 8; // y axis
    this.bombs = settings?.bombs || 8 || (this.columns * this.rows) / 10;

    this.new();
  }

  /**
   * Create a new instance of the game and start a new board
   */
  public new(): void {
    this.initializeEmptyBoard();
  }

  /**
   * Saves the current state of the board with a timestamp
   *
   * @returns Promise<void>
   */
  public save() {}

  /**
   * Loads an existing state of a board
   *
   * @returns Promise<void>
   */
  public load() {}

  /**
   * X, Y generated grid
   */
  public getBoard(): Board {
    return this.board;
  }

  /**
   * Retuns the current gameState
   */
  public getGameState(): GameState {
    return this.gameState;
  }

  /**
   * Finish the game
   *
   * @returns Board
   */
  private gameOver(): Board {
    this.gameState = "lost";

    this.board = this.solutionBoard;
    this.dispatchEvent("movement");
    return this.board;
  }

  public initializeEmptyBoard(): Board {
    const newBoard: Board = [];

    for (let x = 0; x < this.columns; x++) {
      newBoard.push([]);
      for (let y = 0; y < this.rows; y++) {
        newBoard![x][y] = null;
      }
    }

    // Clone newBoard value instead of assigning to avoid referencing the same value.
    this.board = [...newBoard.map((r) => [...r])];
    this.solutionBoard = [...newBoard.map((r) => [...r])];

    return this.board;
  }

  /**
   * Generate a new board
   *
   * @returns Board
   */
  private generateBoard(x: number, y: number): Board {
    // Generate new board with bombs
    this.gameState = "active";
    // this.dispatchEvent("state");

    const bombsCoords = this.getCoordsWithBombs();

    bombsCoords.forEach(([x, y]) => {
      this.solutionBoard[x][y] = 10;

      // Iterate around the center of the currentPos and add +1 as a hint
      for (let xAxis = x - 1; xAxis < x + 2; xAxis++) {
        for (let yAxis = y - 1; yAxis < y + 2; yAxis++) {
          // Calculate out-of-bounds to place hints
          if (
            xAxis !== -1 &&
            yAxis !== -1 &&
            xAxis < this.columns &&
            yAxis < this.rows &&
            this.solutionBoard[xAxis][yAxis] !== 10
          ) {
            this.solutionBoard[xAxis][yAxis]! += 1;
          }
        }
      }
    });

    // Do first click reveal logic:
    // Check where the user clicked and update solutionBoard accordingly.
    // If the user clicked in a cell with zero value, reveal cells next to it.
    // Otherwise, just reveal that cell.

    const solutionBoardValue = this.solutionBoard[x][y];

    if (solutionBoardValue === 10) {
      return this.gameOver();
    }

    const boardClone = [...this.board.map((r) => [...r])];
    boardClone[x][y] = solutionBoardValue || 0;

    this.board = boardClone;

    // if (solutionBoardValue === null) {
    //   // Reveal zeroes around it
    //   this.revealZeros();
    //   return;
    // }

    this.dispatchEvent("movement");

    return this.board;
  }

  /**
   * Update the board based on the user's input
   */
  private updateBoard(x: number, y: number): Board {
    // Start updating board on user input after first click

    const solutionBoardValue = this.solutionBoard[x][y];

    if (solutionBoardValue === 10) {
      return this.gameOver();
    }

    // if (solutionBoardValue === 0) {
    //   // Reveal zeroes around it
    //   return;
    // }
    const boardClone = [...this.board.map((r) => [...r])];
    boardClone[x][y] = solutionBoardValue || 0;

    this.board = boardClone;

    this.dispatchEvent("movement");

    return this.board;
  }

  /**
   * getCoordsWithBombs returns random X,Y positions per each bomb the board should have
   *
   * @returns Array<[number, number]>
   */
  private getCoordsWithBombs(): Array<[number, number]> {
    let bombCount = this.bombs;
    const result: Array<[number, number]> = [];

    while (bombCount > 0) {
      // Get a random [X, Y] position
      const randomXCoord = this.getRandomCoord(0, this.columns - 1);
      const randomYCoord = this.getRandomCoord(0, this.rows - 1);

      if (
        !result.find(
          (res) => res[0] === randomXCoord && res[1] === randomYCoord
        )
      ) {
        result.push([randomXCoord, randomYCoord]);
        bombCount -= 1;
      }
    }

    console.log(result);

    return result;
  }

  /**
   * getRandomCoord is a helper function that returns a random coordinate
   * given min and max values. This function is used to randomly calculate
   * where to place bombs.
   */
  private getRandomCoord(min: number, max: number): number {
    let randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    return randomNumber;
  }

  /**
   * revealCell is triggered when a user clicks on a cell to reveal its contents.
   * If the selected cell is flagged, cell should not be revealed.
   * Should also evaluate if the user clicked on a field with a bomb and end the game.
   *
   * @param x X coordinate
   * @param y Y coordinate
   */
  public revealCell(x: number, y: number) {
    switch (this.gameState) {
      case "new":
        this.generateBoard(x, y);
        break;
      case "active":
        this.updateBoard(x, y);
        break;
    }
  }

  /**
   * placeFlag is triggered when a user decides to flag a cell.
   * Flagged cells are not revealed when clicked again.
   * A flagged cell can be unflagged.
   *
   * @param x
   * @param y
   */
  public placeFlag(x: number, y: number) {
    if (this.gameState === "new" || this.gameState === "active") {
      const boardClone = [...this.board.map((r) => [...r])];

      if (boardClone[x][y] === null) {
        boardClone[x][y] = 99;
      } else if (boardClone[x][y] == 99) {
        boardClone[x][y] = null;
      }

      this.board = boardClone;

      this.dispatchEvent("movement");
    }
  }

  /**
   * Register an event into the eventQueue
   *
   * @param event
   */
  public addEventListener(type: GameEvent, callback: EventHandler): void {
    if (type === "movement") {
      this.eventQueue.movement.push(callback);
    }
    if (type === "state") {
      this.eventQueue.state.push(callback);
    }
  }

  /**
   * Dispatch an event from the eventQueue
   *
   * @param event
   */
  public dispatchEvent(type: GameEvent): void {
    if (type === "movement") {
      this.eventQueue.movement.forEach((callback) => callback(this.board));
    }
  }
}

export default Minesweeper;
