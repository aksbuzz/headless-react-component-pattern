type TriggerProps = {
  label: string;
  onClick: () => void;
};

export function DropdownTrigger({ label, onClick }: TriggerProps) {
  return (
    <div className="trigger" tabIndex={0} onClick={onClick}>
      <span className="selection">{label}</span>
    </div>
  );
}
