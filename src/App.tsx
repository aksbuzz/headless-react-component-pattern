import { FC } from 'react';
import { Dropdown as DropdownV1 } from './v1/Dropdown';
import { Dropdown as DropdownV2 } from './v2/Dropdown';

import './style.css';

const items = [
  { text: 'Value1', description: 'description1' },
  { text: 'Value2', description: 'description2' },
  { text: 'Value3', description: 'description3' },
  { text: 'Value4', description: 'description4' },
  { text: 'Value5', description: 'description5' },
];

export const App: FC<{ name: string }> = ({ name }) => {
  return (
    <div>
      <h1>Hello {name}!</h1>
      <p>Dropdown v1</p>
      <DropdownV1 items={items} />
      <p>Dropdown v2</p>
      <DropdownV2 items={items} />
    </div>
  );
};
