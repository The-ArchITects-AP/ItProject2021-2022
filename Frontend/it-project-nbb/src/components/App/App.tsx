import React, { ChangeEventHandler, MouseEventHandler, useEffect, useState } from "react";
import styles from './App.module.css';
import Header from "../Header/Header";
import { AccountingView, NameView } from "../../types";
import HomePage from "../../pages/HomePage/HomePage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HistoryPage from "../../pages/HistoryPage/HistoryPage";

const App = () => {

  return (
    <BrowserRouter>
      <div className={styles.app}>
        <Header />
        <div>
          <Switch>
            <Route path='/history'>
              <HistoryPage />
            </Route>
            <Route path='/' exact>
              <HomePage />
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;