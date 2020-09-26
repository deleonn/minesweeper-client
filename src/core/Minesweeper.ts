interface Settings {
  rows: number;
  columns: number;
  bombs: number;
}

export type Board = Array<Cell[]> | undefined;

export type Cell = number;

class Minesweeper {
  private board: Board;
  private rows: number;
  private columns: number;
  private bombs: number;

  constructor(settings?: Settings) {
    this.board = undefined;
    this.columns = settings?.columns || 8; // x axis
    this.rows = settings?.rows || 10; // y axis
    this.bombs = settings?.bombs || 10 || (this.columns * this.rows) / 10;

    this.new();
  }

  /**
   * Create a new instance of the game and start a new board
   */
  public new(): void {
    this.generateBoard();
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
   * Generate a new board
   *
   * @returns Board
   */
  private generateBoard(): Board {
    const newBoard: Board = [];

    for (let x = 0; x < this.columns; x++) {
      newBoard.push([]);
      for (let y = 0; y < this.rows; y++) {
        newBoard![x][y] = 0;
      }
    }

    const bombsCoords = this.getCoordsWithBombs();

    bombsCoords.forEach(([x, y]) => {
      newBoard[x][y] = 10;

      // Iterate around the center of the currentPos and add +1 as a hint
      for (let xAxis = x - 1; xAxis < x + 2; xAxis++) {
        for (let yAxis = y - 1; yAxis < y + 2; yAxis++) {
          // Calculate out-of-bounds to place hints
          if (
            xAxis !== -1 &&
            yAxis !== -1 &&
            xAxis < this.columns &&
            yAxis < this.rows &&
            newBoard[xAxis][yAxis] !== 10
          ) {
            console.log("xAxis", xAxis);
            console.log("yAxis", yAxis);
            newBoard[xAxis][yAxis] += 1;
          }
        }
      }
    });

    this.board = newBoard;
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

      result.push([randomXCoord, randomYCoord]);

      bombCount -= 1;
    }

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
  public revealCell(x: number, y: number) {}

  /**
   * placeFlag is triggered when a user decides to flag a cell.
   * Flagged cells are not revealed when clicked again.
   * A flagged cell can be unflagged.
   *
   * @param x
   * @param y
   */
  public placeFlag(x: number, y: number) {}
}

export default Minesweeper;
