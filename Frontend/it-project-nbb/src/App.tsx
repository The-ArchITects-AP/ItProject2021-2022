import React, { ChangeEventHandler, useState } from 'react';
import './App.css';

//voorlopig staat alle code in de App-component (componenten pas opsplitsen als de volledige structuur in orde is)

const App = () => {
  const [vatNumber1, setVatNumber1] = useState<string>('');
  const [vatNumber2, setVatNumber2] = useState<string>('');

  const handleVatNumber1Change: ChangeEventHandler<HTMLInputElement> = (event) => {
    setVatNumber1(event.target.value);
  }

  const handleVatNumber2Change: ChangeEventHandler<HTMLInputElement> = (event) => {
    setVatNumber2(event.target.value);
  }

  const handleOnClick: ChangeEventHandler<HTMLInputElement> = (event) => {
  }

  return (
    <div>      
      <input type="string" id="vatNumber1" name="vatNumber1" placeholder="Ondernemingsnummer 1" onChange={handleVatNumber1Change} value={vatNumber1}/>
      <input type="string" id="vatNumber2" name="vatNumber2" placeholder="Ondernemingsnummer 2" onChange={handleVatNumber2Change} value={vatNumber2}/>
      <input type="button" id="submit" value="Vergelijk" onChange={handleOnClick}/>
      <div>
      <p>
        Ondernemingsnummer 1: {vatNumber1} - Ondernemingsnummer 2: {vatNumber2}
      </p>
    </div>
    </div>
  );
}

export default App;
