import { ChangeEventHandler, MouseEventHandler, useEffect, useState } from 'react';
import InputForm from '../../components/InputForm/InputForm';
import PrintAccountingData from '../../components/PrintAccountingData/PrintAccountingData';
import PrintDetailsCompany from '../../components/PrintDetailsCompany/PrintDetailsCompany';
import { AccountingView, NameView } from '../../types';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [vatNumber1, setVatNumber1] = useState<string>("");
  const [vatNumber2, setVatNumber2] = useState<string>("");
  const [referenceNumberData1, setReferenceNumberData1] = useState<NameView>();
  const [referenceNumberData2, setReferenceNumberData2] = useState<NameView>();
  const [accountingData1, setAccountingData1] = useState<AccountingView>();
  const [accountingData2, setAccountingData2] = useState<AccountingView>();
  const [updating, setUpdating] = useState<boolean>(false);
  const [updating1, setUpdating1] = useState<boolean>(false);
  const [updating2, setUpdating2] = useState<boolean>(false);

  const handleVatNumber1Change: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {    
    setReferenceNumberData1(undefined);
    setReferenceNumberData2(undefined);
    setAccountingData1(undefined);    
    setAccountingData2(undefined);
    setVatNumber2("");
    setVatNumber1(event.target.value);
  };

  const handleVatNumber2Change: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setVatNumber2(event.target.value);
  };

  const handleOnClick: MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    getAccountingData1(vatNumber1);
    getAccountingData2(vatNumber2);
  };

  useEffect(() => {
    if (vatNumber1.length === 10) {
      getReferenceNumber1(vatNumber1)
    }
  }, [vatNumber1])

  useEffect(() => {
    if (vatNumber2.length === 10) {
      getReferenceNumber2(vatNumber2);
    }
  }, [vatNumber2])

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
    setUpdating1(true);
    let json = await fetchReferenceData(vatNumber);
    setReferenceNumberData1(json as NameView);
    setUpdating1(false);
    console.log(referenceNumberData1);
  };

  const getReferenceNumber2 = async (vatNumber: string) => {
    setUpdating2(true);
    let json = await fetchReferenceData(vatNumber);
    setReferenceNumberData2(json as NameView);
    setUpdating2(false);
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
      <InputForm handleVatNumber1Change={handleVatNumber1Change} handleVatNumber2Change={handleVatNumber2Change} handleOnClick={handleOnClick} vatNumber1={vatNumber1} vatNumber2={vatNumber2} />
      <div className={styles.flexboxContainer}>
        <div>
          {!referenceNumberData1 || updating1 ? (
            <div className={styles.loading}>{updating1 ? (<div>loading...</div>) : (<div></div>) }</div>
          ) : (
            <PrintDetailsCompany referenceNumberData={referenceNumberData1} />
          )}
          {!referenceNumberData2 || updating2 ? (
            <div></div>
          ) : (
            <PrintDetailsCompany referenceNumberData={referenceNumberData2} />
          )}
        </div>
        <div>
          {!accountingData1 || !accountingData2 || updating ? (
            <div></div>
          ) : (
            <PrintAccountingData accountingData1={accountingData1} accountingData2={accountingData2} />
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;