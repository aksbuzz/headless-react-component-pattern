import { useCallback, useState } from 'react';
import { Board } from './Board';
import { History } from './History';
import { TicTacToeBoard, TicTacToeState } from './types';

const initialState: TicTacToeState = {
  boards: [Array(9).fill(null)],
  currentBoardIndex: 0,
};
const X_PLAYER = 'X';
const O_PLAYER = 'O';
const WIN_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function TicTacToe() {
  const [state, setState] = useState<TicTacToeState>(initialState);

  const { boards, currentBoardIndex } = state;
  const currentBoard = boards[currentBoardIndex];

  const winner = checkForWin(currentBoard);
  const isTie = checkForTie(currentBoard);
  const finished = winner !== null || isTie;
  const nextPlayer = getNextPlayer(currentBoard);
  const totalBoards = boards.length;

  const handlePlayerMove = useCallback(
    (cellId: number) => {
      const currentBoardCopy = [...currentBoard];
      currentBoardCopy[cellId] = nextPlayer;

      const nextState = {
        boards: [...boards, currentBoardCopy],
        currentBoardIndex: currentBoardIndex + 1,
      };

      setState(nextState);
    },
    [boards, currentBoard, currentBoardIndex, nextPlayer]
  );

  const handleSwitchBoard = useCallback((boardIndex: number) => {
    setState(prev => ({
      ...prev,
      currentBoardIndex: boardIndex,
    }));
  }, []);

  const handleRestartGame = useCallback(() => {
    setState(initialState);
  }, []);

  let status = `Player ${nextPlayer}'s turn`;
  if (finished) {
    status = isTie ? 'Tie!' : `Player ${winner} wins!`;
  }

  return (
    <div>
      <h1>{status}</h1>
      <Board board={currentBoard} {...{ handlePlayerMove, finished }} />
      <History {...{ currentBoardIndex, handleSwitchBoard, totalBoards }} />
      <button onClick={handleRestartGame} disabled={totalBoards <= 1}>
        Restart
      </button>
    </div>
  );
}

function checkForWin(board: TicTacToeBoard) {
  for (const winCombo of WIN_COMBOS) {
    // get the values of the cells from the board that are in the winCombo
    const [a, b, c] = winCombo.map(i => board[i]);
    if (a && a === b && a === c) {
      return a;
    }
  }

  return null;
}

function checkForTie(board: TicTacToeBoard) {
  const filledCellsLength = board.filter(cell => cell !== null).length;
  if (filledCellsLength === board.length) {
    return true;
  }

  return false;
}

function getNextPlayer(board: TicTacToeBoard) {
  const filledCellsLength = board.filter(cell => cell !== null).length;
  return filledCellsLength % 2 === 0 ? X_PLAYER : O_PLAYER;
}
