import { useState } from 'react';
import './App.css';
import { FadeIn } from './FadeIn';
import { PinInput } from './PinInput';
import { Checkbox, CheckboxGroup } from './checkbox';
// import { Dropdown as DropdownV1 } from './dropdown/v1/Dropdown';
// import { Dropdown as DropdownV2 } from './dropdown/v2/Dropdown';
import { Dropdown as DropdownV3 } from './dropdown/v3/Dropdown';
import { Rating } from './rating';
import { Carousel } from './carousel';
// import { TicTacToe } from './tic-tac-toe';

// const items = [
//   { text: 'Value1', description: 'Description1' },
//   { text: 'Value2', description: 'Description2' },
//   { text: 'Value3', description: 'Description3' },
//   { text: 'Value4', description: 'Description4' },
//   { text: 'Value5', description: 'Description5' },
// ];

const items3 = [
  { label: 'Label1', value: 'Value1' },
  { label: 'Label2', value: 'Value2' },
  { label: 'Label3', value: 'Value3' },
  { label: 'Label4', value: 'Value4' },
  { label: 'Label5', value: 'Value5' },
];

function App() {
  const [otp, setOtp] = useState("")
  return (
    <>
      {/* <TicTacToe /> */}
      <Rating defaultValue={3.5} readonly />
      <PinInput value={otp} onChange={setOtp} />
      {/* <h1>Dropdown v1</h1>
      <DropdownV1 items={items} />
      <h1>Dropdown v2</h1>
      <DropdownV2 items={items} /> */}

      <Carousel items={carouselItems} />

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

      <Checkbox>Checkbox</Checkbox>
      <CheckboxGroup defaultValue={['sasuke']}>
        <Checkbox value="naruto">Naruto</Checkbox>
        <Checkbox value="sasuke">Sasuke</Checkbox>
        <Checkbox value="kakashi">Kakashi</Checkbox>
      </CheckboxGroup>
    </>
  );
}

export default App;

const carouselItems = [
  {
    url: 'https://images.unsplash.com/photo-1488372759477-a7f4aa078cb6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    placeholder: 'Carousel Item 1',
  },
  {
    url: 'https://images.unsplash.com/photo-1595147389795-37094173bfd8?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    placeholder: 'Carousel Item 2',
  },
  {
    url: "https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    placeholder: 'Carousel Item 3',
  }
];