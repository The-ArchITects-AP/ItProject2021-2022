import React, { ChangeEventHandler, useEffect, useState } from "react";
import "./App.css";
import { RootObject } from "./types";

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
    <div>
      <InputField handleVatNumber1Change={handleVatNumber1Change} handleVatNumber2Change={handleVatNumber2Change} handleOnClick={handleOnClick} vatNumber1={vatNumber1} vatNumber2={vatNumber2} />
      {!referenceNumberData || updating ? (
        <div></div>
      ) : (
        <PrintDetailsCompany referenceNumberData={referenceNumberData} />
      )}
    </div>
  );
};

interface InputFieldProps {
  handleVatNumber1Change: any,
  handleVatNumber2Change: any,
  handleOnClick: any,
  vatNumber1: string,
  vatNumber2: string
}

const InputField = ({ handleVatNumber1Change, handleVatNumber2Change, handleOnClick, vatNumber1, vatNumber2 }: InputFieldProps) => {
  return (
    <div>
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
      <input
        type="button"
        id="submit"
        value="Vergelijk"
        onClick={handleOnClick}
      />
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

export default App;
