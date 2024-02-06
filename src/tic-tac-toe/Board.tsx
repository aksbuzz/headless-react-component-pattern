import { Cell } from './Cell';
import { TicTacToeBoard } from './types';

type BoardProps = {
  board: TicTacToeBoard;
  finished: boolean;
  handlePlayerMove: (cellId: number) => void;
};

export function Board(props: BoardProps) {
  const { board, handlePlayerMove, finished } = props;

  const renderRow = (i: number, j: number, k: number) => {
    return (
      <div>
        <Cell value={board[i]} disabled={finished} onClick={() => handlePlayerMove(i)} />
        <Cell value={board[j]} disabled={finished} onClick={() => handlePlayerMove(j)} />
        <Cell value={board[k]} disabled={finished} onClick={() => handlePlayerMove(k)} />
      </div>
    );
  };

  return (
    <div>
      {renderRow(0, 1, 2)}
      {renderRow(3, 4, 5)}
      {renderRow(6, 7, 8)}
    </div>
  );
}
