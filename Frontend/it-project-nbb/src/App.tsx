import React, { ChangeEventHandler, useEffect, useState } from 'react';
import './App.css';
import { Timezone } from './types';

//voorlopig staat alle code in de App-component (componenten pas opsplitsen als de volledige structuur in orde is)

const App = () => {
  const [vatNumber1, setVatNumber1] = useState<string>('');
  const [vatNumber2, setVatNumber2] = useState<string>('');

  //voor test met WorldTimeApi
  const [timezone, setTimezone] = useState<Timezone>();
  const [updating, setUpdating] = useState<boolean>(true);

  const handleVatNumber1Change: ChangeEventHandler<HTMLInputElement> = (event) => {
    setVatNumber1(event.target.value);
  }

  const handleVatNumber2Change: ChangeEventHandler<HTMLInputElement> = (event) => {
    setVatNumber2(event.target.value);
  }

  const handleOnClick: React.MouseEventHandler<HTMLInputElement> = (event) => {
  }

  //fetch WorldTimeApi: werkende API testen (NBB down)
  useEffect(() => {
    getTimezone();
  }, []);

  const getTimezone = async () => {
    setUpdating(true);

    let response = await fetch('http://worldtimeapi.org/api/ip', {
      method: 'GET',
    });
    let json = await response.json();

    setTimezone(json as Timezone);
    setUpdating(false);
  }

  //incl. output voor test met WorldTimeApi (achteraf deleten)
  return (
    <div>
      <input type="string" id="vatNumber1" name="vatNumber1" placeholder="Ondernemingsnummer 1" onChange={handleVatNumber1Change} value={vatNumber1} />
      <input type="string" id="vatNumber2" name="vatNumber2" placeholder="Ondernemingsnummer 2" onChange={handleVatNumber2Change} value={vatNumber2} />
      <input type="button" id="submit" value="Vergelijk" onClick={handleOnClick} />
      <div>
        <p>
          Ondernemingsnummer 1: {vatNumber1} - Ondernemingsnummer 2: {vatNumber2}
        </p>
        <div>
          {!timezone || updating ? <div>Loading data</div> :
            <div>
              <p>Timezone: <span>{timezone.timezone}</span></p>
              <p>Abbreviation: <span>{timezone.abbreviation}</span></p>
              <p>DateTime: <span>{timezone.datetime}</span></p>
              <p>Client IP: <span>{timezone.client_ip}</span></p>
            </div>}
        </div>
      </div>
    </div>
  );
}

export default App;
