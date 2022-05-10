import React, { ChangeEventHandler, MouseEventHandler, useEffect, useState } from "react";
import styles from './App.module.css';
import Header from "../Header/Header";
import { AccountingView, NameView } from "../../types";
import HomePage from "../../pages/HomePage/HomePage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HistoryPage from "../../pages/HistoryPage/HistoryPage";

const App = () => {
  const [vatNumber1, setVatNumber1] = useState<string>("");
  const [vatNumber2, setVatNumber2] = useState<string>("");
  const [referenceNumberData1, setReferenceNumberData1] = useState<NameView>();
  const [referenceNumberData2, setReferenceNumberData2] = useState<NameView>();
  const [accountingData1, setAccountingData1] = useState<AccountingView>();
  const [accountingData2, setAccountingData2] = useState<AccountingView>();
  const [updating, setUpdating] = useState<boolean>(false);
  //loading nog verbeteren
  const [updating1, setUpdating1] = useState<boolean>(false);
  const [updating2, setUpdating2] = useState<boolean>(false);

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
    <BrowserRouter>
      <div className={styles.app}>
        <Header />
        <div>
          <Switch>
            <Route path='/history'>
              <HistoryPage referenceNumberData1={referenceNumberData1} referenceNumberData2={referenceNumberData2} />
            </Route>
            <Route path='/' exact>
              <HomePage handleVatNumber1Change={handleVatNumber1Change} handleVatNumber2Change={handleVatNumber2Change} handleOnClick={handleOnClick} referenceNumberData1={referenceNumberData1} referenceNumberData2={referenceNumberData2} accountingData1={accountingData1} accountingData2={accountingData2} updating={updating} updating1={updating1} updating2={updating2} />
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;