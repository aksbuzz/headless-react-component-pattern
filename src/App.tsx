import './App.css';
import { FadeIn } from './FadeIn';
import { Dropdown as DropdownV1 } from './dropdown/v1/Dropdown';
import { Dropdown as DropdownV2 } from './dropdown/v2/Dropdown';
import { Dropdown as DropdownV3 } from './dropdown/v3/Dropdown';

const items = [
  { text: 'Value1', description: 'Description1' },
  { text: 'Value2', description: 'Description2' },
  { text: 'Value3', description: 'Description3' },
  { text: 'Value4', description: 'Description4' },
  { text: 'Value5', description: 'Description5' },
];

const items3 = [
  { label: 'Label1', value: 'Value1' },
  { label: 'Label2', value: 'Value2' },
  { label: 'Label3', value: 'Value3' },
  { label: 'Label4', value: 'Value4' },
  { label: 'Label5', value: 'Value5' },
];

function App() {
  return (
    <>
      <h1>Dropdown v1</h1>
      <DropdownV1 items={items} />
      <h1>Dropdown v2</h1>
      <DropdownV2 items={items} />
      <h1>Dropdown v3</h1>
      <FadeIn>
        <DropdownV3 items={items3}>
          <DropdownV3.Trigger>Select an option...</DropdownV3.Trigger>
          <DropdownV3.List>
            {items3.map((item, index) => (
              <DropdownV3.Item index={index} item={item} key={index} />
            ))}
          </DropdownV3.List>
        </DropdownV3>
      </FadeIn>
    </>
  );
}

export default App;
