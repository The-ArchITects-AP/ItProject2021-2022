import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "../Header/Header";
import HomePage from "../../pages/HomePage/HomePage";
import HistoryPage from "../../pages/HistoryPage/HistoryPage";
import styles from './App.module.css';

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