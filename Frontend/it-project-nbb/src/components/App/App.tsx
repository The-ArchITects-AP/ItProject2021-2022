import React, { ChangeEventHandler, MouseEventHandler, useState } from "react";
import styles from './App.module.css';
import Header from "../Header/Header";
import { NameView } from "../../types";

//voorlopig staat alle code in de App.tsx file (later opsplitsen in file per component)

const App = () => {
  const [vatNumber1, setVatNumber1] = useState<string>("");
  const [vatNumber2, setVatNumber2] = useState<string>("");
  const [referenceNumberData1, setReferenceNumberData1] = useState<NameView>();
  const [referenceNumberData2, setReferenceNumberData2] = useState<NameView>();
  const [updating, setUpdating] = useState<boolean>(true);

  const handleVatNumber1Change: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setVatNumber1(event.target.value);
    console.log(vatNumber1);
    if (vatNumber1 !== "") {
      getReferenceNumber1(vatNumber1);
    }
  };

  const handleVatNumber2Change: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setVatNumber2(event.target.value);
    console.log(vatNumber2);
    if (vatNumber2 !== "") {
      getReferenceNumber2(vatNumber2);
    }
  };

  const handleOnClick: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => { };

  //methode haalt bedrijfsgegevens op bij API 
  const fetchReferenceData = async (vatNumber: string) => {
    let url = `https://nbb-architects-api.azurewebsites.net/home/gegevens/${vatNumber}`;
    console.log(url);
    let response = await fetch(url,
      {
        method: "GET",
        mode: 'no-cors', //geeft opaque response terug (Access-Control-Allow-Origin server side oplossen)
      }
    );
    console.log(response);
    let json = await response.json();

    return json;
  }

  const getReferenceNumber1 = async (vatNumber: string) => {
    setUpdating(true);
    let json = await fetchReferenceData(vatNumber);
    setReferenceNumberData1(json as NameView);
    setUpdating(false);
    console.log(referenceNumberData1);
  };

  const getReferenceNumber2 = async (vatNumber: string) => {
    setUpdating(true);
    let json = await fetchReferenceData(vatNumber);
    setReferenceNumberData2(json as NameView);
    setUpdating(false);
    console.log(referenceNumberData2);
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

interface InputFormProps {
  handleVatNumber1Change: ChangeEventHandler<HTMLInputElement>,
  handleVatNumber2Change: ChangeEventHandler<HTMLInputElement>,
  handleOnClick: MouseEventHandler<HTMLButtonElement>
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
  referenceNumberData: NameView
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
          {referenceNumberData.Street}{" "}
          {referenceNumberData.Number}<br />
          {referenceNumberData.PostalCode}{" "}
          {referenceNumberData.City}
        </p>
      </div>
    </div>
  )
}

export default App;
