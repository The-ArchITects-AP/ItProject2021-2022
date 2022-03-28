import React, { ChangeEventHandler, useState } from "react";
import { RootObject } from "./types";
import styles from './App.module.css';

//voorlopig staat alle code in de App.tsx file (later opsplitsen in file per component)

const App = () => {
  const [vatNumber1, setVatNumber1] = useState<string>("");
  const [vatNumber2, setVatNumber2] = useState<string>("");
  const [referenceNumberData, setReferenceNumberData] = useState<RootObject>();
  const [updating, setUpdating] = useState<boolean>(true);

  const handleVatNumber1Change: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setVatNumber1(event.target.value);
    getReferenceNumber(vatNumber1);
  };

  const handleVatNumber2Change: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setVatNumber2(event.target.value);
    getReferenceNumber(vatNumber2);
  };

  const handleOnClick: React.MouseEventHandler<HTMLInputElement> = (
    event
  ) => { };

  //fetch NBB API via Mockoon
  //fetch gekoppeld aan input field ondernemingsnummers
  //ondernemingsnummer voorlopig hardcoded in url
  //url met variabele: `http://localhost:3000/legalEntity/${vatNumber}/references`
  const getReferenceNumber = async (vatNumber: string) => {
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
    <div className={styles.app}>
      <Header />
      <InputForm handleVatNumber1Change={handleVatNumber1Change} handleVatNumber2Change={handleVatNumber2Change} handleOnClick={handleOnClick} vatNumber1={vatNumber1} vatNumber2={vatNumber2} />
      {!referenceNumberData || updating ? (
        <div></div>
      ) : (
        <PrintDetailsCompany referenceNumberData={referenceNumberData} />
      )}
    </div>
  );
};

interface InputFormProps {
  handleVatNumber1Change: any,
  handleVatNumber2Change: any,
  handleOnClick: any,
  vatNumber1: string,
  vatNumber2: string
}

const InputForm = ({ handleVatNumber1Change, handleVatNumber2Change, handleOnClick, vatNumber1, vatNumber2 }: InputFormProps) => {
  return (
    <div className={styles.inputForm}>
      <input
        type="string"
        id="vatNumber1"
        name="vatNumber1"
        placeholder="Ondernemingsnummer 1"
        onBlur={handleVatNumber1Change}
      />
      <input
        type="string"
        id="vatNumber2"
        name="vatNumber2"
        placeholder="Ondernemingsnummer 2"
        onBlur={handleVatNumber2Change}
      />
      <button
        type="submit"
        onClick={handleOnClick}>
        Vergelijk
      </button>
      <div>
        Ondernemingsnummer 1: {vatNumber1} - Ondernemingsnummer 2: {vatNumber2}
      </div>
    </div>
  )
}

interface PrintDetailsCompanyProps {
  referenceNumberData: RootObject
}

const PrintDetailsCompany = ({ referenceNumberData }: PrintDetailsCompanyProps) => {
  return (
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
  )
}

const Header = () => {
  return (
    <div className={styles.header}>
      LOGO
    </div>
  )
}

export default App;
