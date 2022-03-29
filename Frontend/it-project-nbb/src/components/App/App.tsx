import React, { ChangeEventHandler, useState } from "react";
import styles from './App.module.css';
import Header from "../Header/Header";
import { RootObject } from "../../types";

//voorlopig staat alle code in de App.tsx file (later opsplitsen in file per component)

const App = () => {
  const [vatNumber1, setVatNumber1] = useState<string>("");
  const [vatNumber2, setVatNumber2] = useState<string>("");
  const [referenceNumberData1, setReferenceNumberData1] = useState<RootObject>();
  const [referenceNumberData2, setReferenceNumberData2] = useState<RootObject>();
  const [updating, setUpdating] = useState<boolean>(true);

  const handleVatNumber1Change: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setVatNumber1(event.target.value);
    getReferenceNumber1(vatNumber1);
  };

  const handleVatNumber2Change: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setVatNumber2(event.target.value);
    getReferenceNumber2(vatNumber2);
  };

  const handleOnClick: React.MouseEventHandler<HTMLInputElement> = (
    event
  ) => { };

  //fetch NBB API via Mockoon
  //ondernemingsnummer voorlopig hardcoded in url
  //url met variabele: `http://localhost:3000/legalEntity/${vatNumber}/references`
  const fetchReferenceData = async (vatNumber: string) => {
    let response = await fetch(
      "http://localhost:3000/legalEntity/0123456789/references",
      {
        method: "GET",
      }
    );
    let json = await response.json();

    return json;
  }

  const getReferenceNumber1 = async (vatNumber: string) => {
    setUpdating(true);
    let json = await fetchReferenceData(vatNumber);
    setReferenceNumberData1(json as RootObject);
    setUpdating(false);
  };

  const getReferenceNumber2 = async (vatNumber: string) => {
    setUpdating(true);
    let json = await fetchReferenceData(vatNumber);
    setReferenceNumberData2(json as RootObject);
    setUpdating(false);
  };

  return (
    <div className={styles.app}>
      <Header />
      <InputForm handleVatNumber1Change={handleVatNumber1Change} handleVatNumber2Change={handleVatNumber2Change} handleOnClick={handleOnClick} />
      {!referenceNumberData1 || updating ? (
        <div></div>
      ) : (
        <PrintDetailsCompany referenceNumberData={referenceNumberData1} />
      )}
      {!referenceNumberData2 || updating ? (
        <div></div>
      ) : (
        <PrintDetailsCompany referenceNumberData={referenceNumberData2} />
      )}
    </div>
  );
};

//types handlerfuncties nog definiëren
interface InputFormProps {
  handleVatNumber1Change: any,
  handleVatNumber2Change: any,
  handleOnClick: any
}

const InputForm = ({ handleVatNumber1Change, handleVatNumber2Change, handleOnClick }: InputFormProps) => {
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
    </div>
  )
}

interface PrintDetailsCompanyProps {
  referenceNumberData: RootObject
}

const PrintDetailsCompany = ({ referenceNumberData }: PrintDetailsCompanyProps) => {
  return (
    <div className={styles.flexboxContainer}>
      <div className={styles.flexboxItem}>
        <p className={styles.title}>
          <strong>Naam</strong>
        </p>
        <p>
          {referenceNumberData.EnterpriseName}
        </p>
      </div>
      <div className={styles.flexboxItem}>
        <p className={styles.title}>
          <strong>Adres</strong>
        </p>
        <p>
          {referenceNumberData.Address.Street}{" "}
          {referenceNumberData.Address.Number}<br />
          {referenceNumberData.Address.PostalCode}{" "}
          {referenceNumberData.Address.City}
        </p>
      </div>
    </div>
  )
}

export default App;
