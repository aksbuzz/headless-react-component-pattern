export type CellState = null | 'X' | 'O';
export type TicTacToeBoard = CellState[];
export type TicTacToeState = {
  boards: TicTacToeBoard[];
  currentBoardIndex: number;
};
