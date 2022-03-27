import React, { ChangeEventHandler, useEffect, useState } from "react";
import "./App.css";
import { RootObject, TestMockoon } from "./types";

//voorlopig staat alle code in de App-component (componenten pas opsplitsen als de volledige structuur in orde is)

const App = () => {
  const [vatNumber1, setVatNumber1] = useState<string>("");
  const [vatNumber2, setVatNumber2] = useState<string>("");
  const [referenceNumberData, setReferenceNumberData] = useState<RootObject>();
  const [updating, setUpdating] = useState<boolean>(true);

  const handleVatNumber1Change: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setVatNumber1(event.target.value);
  };

  const handleVatNumber2Change: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setVatNumber2(event.target.value);
  };

  const handleOnClick: React.MouseEventHandler<HTMLInputElement> = (
    event
  ) => {};

  //fetch NBB API via Mockoon
  //fetch nog niet gekoppeld aan button click
  //ondernemingsnummer voorlopig hardcoded in url
  useEffect(() => {
    getReferenceNumber();
  }, []);

  const getReferenceNumber = async () => {
    setUpdating(true);

    let response = await fetch(
      "http://localhost:3000/legalEntity/0123456789/references",
      {
        method: "GET",
      }
    );
    let json = await response.json();

    setReferenceNumberData(json as RootObject);
    setUpdating(false);
    console.log(referenceNumberData);
  };

  return (
    <div>
      <input
        type="string"
        id="vatNumber1"
        name="vatNumber1"
        placeholder="Ondernemingsnummer 1"
        onBlur={handleVatNumber1Change} //QIN: onChange veranderd naar onBlur, het tegenovergestelde van onFocus + value verwijderd, onnodig
      />
      <input
        type="string"
        id="vatNumber2"
        name="vatNumber2"
        placeholder="Ondernemingsnummer 2"
        onBlur={handleVatNumber2Change} //QIN: onChange veranderd naar onBlur, het tegenovergestelde van onFocus + value verwijderd, onnodig
      />
      <input
        type="button"
        id="submit"
        value="Vergelijk"
        onClick={handleOnClick}
      />
      <div>
        Ondernemingsnummer 1: {vatNumber1} - Ondernemingsnummer 2: {vatNumber2}
      </div>
      <div>
        {!referenceNumberData || updating ? (
          <div>Loading data...........</div>
        ) : (
          <div>
            <p>
              <strong>Naam</strong> {referenceNumberData.EnterpriseName}
            </p>
            <p>
              <strong>Adres</strong> {referenceNumberData.Address.Street}{" "}
              {referenceNumberData.Address.Number}
            </p>
            <p>
              {referenceNumberData.Address.PostalCode}{" "}
              {referenceNumberData.Address.City}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
