import React, { ChangeEventHandler, MouseEventHandler, useState } from "react";
import styles from './App.module.css';
import Header from "../Header/Header";
import { AccountingView, NameView } from "../../types";

//voorlopig staat alle code in de App.tsx file (later opsplitsen in file per component)

const App = () => {
  const [vatNumber1, setVatNumber1] = useState<string>("");
  const [vatNumber2, setVatNumber2] = useState<string>("");
  const [referenceNumberData1, setReferenceNumberData1] = useState<NameView>();
  const [referenceNumberData2, setReferenceNumberData2] = useState<NameView>();
  const [accountingData1, setAccountingData1] = useState<AccountingView>();
  const [accountingData2, setAccountingData2] = useState<AccountingView>();
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
  ) => {
    getAccountingData1(vatNumber1);
    getAccountingData2(vatNumber2);
  };

  //methode haalt bedrijfsgegevens op bij API 
  const fetchReferenceData = async (vatNumber: string) => {
    let url = `https://nbb-architects-api.azurewebsites.net/home/gegevens/${vatNumber}`;
    console.log(url);
    let response = await fetch(url,
      {
        method: "GET",
      }
    );
    console.log(response);
    let json = await response.json();

    console.log(json);
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

  //methode haalt accounting data op bij API 
  const fetchAccountingData = async (vatNumber: string) => {
    let url = `https://nbb-architects-api.azurewebsites.net/home/accountingdata/${vatNumber}`;
    console.log(url);
    let response = await fetch(url,
      {
        method: "GET",
      }
    );
    console.log(response);
    let json = await response.json();

    console.log(json);
    return json;
  }

  const getAccountingData1 = async (vatNumber: string) => {
    setUpdating(true);
    let json = await fetchAccountingData(vatNumber);
    setAccountingData1(json as AccountingView);
    setUpdating(false);
  };

  const getAccountingData2 = async (vatNumber: string) => {
    setUpdating(true);
    let json = await fetchAccountingData(vatNumber);
    setAccountingData2(json as AccountingView);
    setUpdating(false);
  };

  return (
    <div className={styles.app}>
      <Header />
      <InputForm handleVatNumber1Change={handleVatNumber1Change} handleVatNumber2Change={handleVatNumber2Change} handleOnClick={handleOnClick} />
      <div className={styles.flexboxContainer}>
        <div>
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
        <div>
          {!accountingData1 || updating ? (
            <div></div>
          ) : (
            <PrintAccountingData accountingData={accountingData1} />
          )}
          {!accountingData2 || updating ? (
            <div></div>
          ) : (
            <PrintAccountingData accountingData={accountingData2} />
          )}
        </div>

        <div>
          {!accountingData1 || !accountingData2 || updating ? (
            <div></div>
          ) : (
            <PrintAccountingData2 accountingData1={accountingData1} accountingData2={accountingData2} />
          )}
        </div>

      </div>
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
  );
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
          {referenceNumberData.enterpriseName}
        </p>
      </div>
      <div className={styles.flexboxItem}>
        <p className={styles.address}>
          <strong>Adres</strong>
        </p>
        <p>
          {referenceNumberData.street}{" "}
          {referenceNumberData.number}<br />
          {referenceNumberData.postalCode}{" "}
          {referenceNumberData.city}
        </p>
      </div>
    </div>
  );
}

//onderstaande methode PrintAccountingData verwijderen als PrintAccountingData2 (vergelijking met kleur) voldoende getest is 

interface PrintAccountingDataProps {
  accountingData: AccountingView
}

const PrintAccountingData = ({ accountingData }: PrintAccountingDataProps) => {
  return (
    <div className={styles.flexboxContainer}>
      <div>
        <p><span>Datum neerlegging</span> {accountingData.depositDate}</p>
        <p><span>Eigen Vermogen</span> {accountingData.eigenVermogen} EUR</p>
        <p><span>Schulden</span> {accountingData.schulden} EUR</p>
        <p><span>Bedrijfswinst</span> {accountingData.bedrijfswinst} EUR</p>
      </div>
    </div>
  )
}

interface PrintAccountingDataProps2 {
  accountingData1: AccountingView,
  accountingData2: AccountingView
}

const PrintAccountingData2 = ({ accountingData1, accountingData2 }: PrintAccountingDataProps2) => {
  var boolEigenVermogen;
  var boolSchulden;
  var boolBedrijfswinst;
  if (Number(accountingData1.eigenVermogen) > Number(accountingData2.eigenVermogen)){
    boolEigenVermogen = true;
  }
  else {
    boolEigenVermogen = false;
  }
  if (Number(accountingData1.schulden) > Number(accountingData2.schulden)){
    boolSchulden = true;
  }
  else {
    boolSchulden = false;
  }
  if (Number(accountingData1.bedrijfswinst) > Number(accountingData2.bedrijfswinst)){
    boolBedrijfswinst = true;
  }
  else {
    boolBedrijfswinst = false;
  }
  console.log(boolEigenVermogen);  
  console.log(boolSchulden);  
  console.log(boolBedrijfswinst);
  
  return (
    <div>
      <div className={styles.flexboxContainer}>
        <p><span>Datum neerlegging</span> {accountingData1.depositDate}</p>
        <p><span>Eigen Vermogen</span></p>
        <p style={ boolEigenVermogen ? {color: "green"} : {color:"red"} }>{Number(accountingData1.eigenVermogen).toLocaleString('nl-BE', { maximumFractionDigits: 0 })} EUR</p>
        <p><span>Schulden</span></p>
        <p style={ boolSchulden ? {color: "red"} : {color:"green"} }>{Number(accountingData1.schulden).toLocaleString('nl-BE', { maximumFractionDigits: 0 })} EUR</p>
        <p><span>Bedrijfswinst</span></p>
        <p style={ boolBedrijfswinst ? {color: "green"} : {color:"red"} }>{Number(accountingData1.bedrijfswinst).toLocaleString('nl-BE', { maximumFractionDigits: 0 })} EUR</p>
      </div>
      <div className={styles.flexboxContainer}>
        <p><span>Datum neerlegging</span> {accountingData2.depositDate}</p>
        <p><span>Eigen Vermogen</span></p>
        <p style={ boolEigenVermogen ? {color: "red"} : {color:"green"} }>{Number(accountingData2.eigenVermogen).toLocaleString('nl-BE', { maximumFractionDigits: 0 })} EUR</p>
        <p><span>Schulden</span></p>
        <p style={ boolSchulden ? {color: "green"} : {color:"red"} }>{Number(accountingData2.schulden).toLocaleString('nl-BE', { maximumFractionDigits: 0 })} EUR</p>
        <p><span>Bedrijfswinst</span></p>
        <p style={ boolBedrijfswinst ? {color: "red"} : {color:"green"} }>{Number(accountingData2.bedrijfswinst).toLocaleString('nl-BE', { maximumFractionDigits: 0 })} EUR</p>
      </div>
    </div>
  )
}

export default App;
