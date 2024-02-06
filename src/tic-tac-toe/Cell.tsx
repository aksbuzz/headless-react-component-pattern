import { CellState } from './types';

type BoardCellProps = {
  value: CellState;
  onClick: () => void;
  disabled?: boolean;
};

export function Cell(props: BoardCellProps) {
  const { value, onClick, disabled } = props;

  return (
    <button onClick={onClick} disabled={disabled}>
      {value === null ? '.' : value}
    </button>
  );
}
