type BoardHistoryProps = {
  totalBoards: number;
  currentBoardIndex: number;
  handleSwitchBoard: (boardIndex: number) => void;
};

export function History(props: BoardHistoryProps) {
  const { currentBoardIndex, handleSwitchBoard, totalBoards } = props;

  const buttons = Array(totalBoards)
    .fill(null)
    .map((_, index) => (
      <button
        key={index}
        disabled={index === currentBoardIndex}
        onClick={() => handleSwitchBoard(index)}
      >
        {index}
      </button>
    ));

  return <div>{buttons}</div>;
}
