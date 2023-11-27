import { DropdownItem } from ".";
import { useDropdownContext } from "./DropdownContext";

type DropdownListItemProps = {
  index: number;
  item: DropdownItem
}

export function DropdownListItem(props: DropdownListItemProps) {
  const { index, item } = props;
  const { onItemClick, selectedIndex } = useDropdownContext()

  return (
    <div
      role="option"
      key={index}
      aria-selected={index === selectedIndex}
      onClick={() => onItemClick(item, index)}
      className="item-container"
      style={{ color: selectedIndex === index ? 'red' : 'black' }}
    >
      {item.icon && <img src={item.icon} alt={item.label} />}
      <div className="details">
        <div>{item.label}</div>
        <small>{item?.description}</small>
      </div>
    </div>
  );
}