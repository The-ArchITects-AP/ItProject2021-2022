import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "../Header/Header";
import HomePage from "../../pages/HomePage/HomePage";
import HistoryPage from "../../pages/HistoryPage/HistoryPage";
import Footer from "../Footer/Footer";
import styles from './App.module.css';

const App = () => {
  return (
    <BrowserRouter basename='/ItProject2022-2023'>
      <div className={styles.app}>
        <Header />
        <div className={styles.main}>
          <Switch>
            <Route path='/history'>
              <HistoryPage />
            </Route>
            <Route path='/' exact>
              <HomePage />
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;