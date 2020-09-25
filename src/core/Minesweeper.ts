interface Settings {
  rows: number;
  columns: number;
  mines: number;
}

export type Board = Array<Cell[]> | undefined;

export type Cell = number;

class Minesweeper {
  private board: Board;
  private rows: number;
  private columns: number;
  private mines: number;

  constructor(settings?: Settings) {
    this.board = undefined;
    this.rows = settings?.rows || 8;
    this.columns = settings?.columns || 10;
    this.mines = settings?.mines || 10;

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
    const newBoard: Board = new Array(this.columns).fill(
      new Array(this.rows).fill(null)
    );

    const minesCoords = this.getCoordsWithMines();

    console.log(minesCoords);

    minesCoords.forEach(([x, y]: [number, number]) => {
      newBoard[x][y] = 10;
    });

    this.board = newBoard;
    return this.board;
  }

  /**
   * getCoordsWithMines returns random X,Y positions per each mine the board should have
   *
   * @returns Array<[number, number]>
   */
  private getCoordsWithMines(): Array<[number, number]> {
    let mineCount = this.mines;
    const result: Array<[number, number]> = [];

    while (mineCount > 0) {
      // Get a random [X, Y] position
      const randomXCoord = this.getRandomCoord(0, this.columns - 1);
      const randomYCoord = this.getRandomCoord(0, this.rows - 1);

      result.push([randomXCoord, randomYCoord]);

      mineCount -= 1;
    }

    return result;
  }

  /**
   * Random mine activator is a helper function that returns the probability
   * for a cell to have a mine. It generates a random number between 0 and 1 and returns
   * true if the number is higher than 0.7;
   */
  private getRandomCoord(min: number, max: number): number {
    let randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    return randomNumber;
  }

  /**
   * revealCell is triggered when a user clicks on a cell to reveal its contents.
   * If the selected cell is flagged, cell should not be revealed.
   * Should also evaluate if the user clicked on a field with a mine and end the game.
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
