import { DropdownItem } from './types';

type DropdownMenuProps = {
  items: Array<DropdownItem>;
  onItemClick: (item: DropdownItem) => void;
};

export function DropdownMenu({ items, onItemClick }: DropdownMenuProps) {
  return (
    <div className="dropdown-menu">
      {items.map((item, index) => (
        <div
          key={index}
          onClick={() => onItemClick(item)}
          className="item-container"
        >
          {item.icon && <img src={item.icon} alt={item.text} />}
          <div className="details">
            <div>{item.text}</div>
            <small>{item.description}</small>
          </div>
        </div>
      ))}
    </div>
  );
}
