import { ChangeEventHandler, MouseEventHandler } from 'react';
import InputForm from '../../components/InputForm/InputForm';
import PrintAccountingData from '../../components/PrintAccountingData/PrintAccountingData';
import PrintDetailsCompany from '../../components/PrintDetailsCompany/PrintDetailsCompany';
import { AccountingView, NameView } from '../../types';
import styles from './HomePage.module.css';

interface HomePageProps {
    handleVatNumber1Change: ChangeEventHandler<HTMLInputElement>,
    handleVatNumber2Change: ChangeEventHandler<HTMLInputElement>,
    handleOnClick: MouseEventHandler<HTMLButtonElement>,
    referenceNumberData1: NameView | undefined,
    referenceNumberData2: NameView | undefined,
    accountingData1: AccountingView | undefined,
    accountingData2: AccountingView | undefined,
    updating: boolean,
    updating1: boolean,
    updating2: boolean  
}

const HomePage = ({ handleVatNumber1Change, handleVatNumber2Change, handleOnClick, referenceNumberData1, referenceNumberData2, accountingData1, accountingData2, updating, updating1, updating2 }: HomePageProps) => {
    return (
    <div className={styles.app}>
      <InputForm handleVatNumber1Change={handleVatNumber1Change} handleVatNumber2Change={handleVatNumber2Change} handleOnClick={handleOnClick} />
      <div className={styles.flexboxContainer}>
        <div>
          {!referenceNumberData1 || updating1 ? (
            <div className={styles.loading}>{!updating1 ? (<div></div>) : (<div>loading</div>)}</div>
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