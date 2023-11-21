import { DropdownItem } from './types';

type DropdownMenuProps = {
  items: Array<DropdownItem>;
  /**
   * apply a highlighted CSS style and set the aria-selected
   * attribute to the currently selected item
   */
  selectedIndex: number;
  onItemClick: (item: DropdownItem, index: number) => void;
};

export function DropdownMenu({
  items,
  onItemClick,
  selectedIndex,
}: DropdownMenuProps) {
  return (
    <div className="dropdown-menu" role="listbox">
      {items.map((item, index) => (
        <div
          key={index}
          onClick={() => onItemClick(item, index)}
          className="item-container"
          style={{ color: selectedIndex === index ? 'red' : 'black' }}
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
