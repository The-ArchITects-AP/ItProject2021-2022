import { AccountingView } from "../../types";
import styles from './PrintAccountingData.module.css';

interface PrintAccountingDataProps {
    accountingData1: AccountingView,
    accountingData2: AccountingView
  }
  
  const PrintAccountingData = ({ accountingData1, accountingData2 }: PrintAccountingDataProps) => {
    var boolEigenVermogen;
    var boolSchulden;
    var boolBedrijfswinst;
    if (Number(accountingData1.eigenVermogen) > Number(accountingData2.eigenVermogen)) {
      boolEigenVermogen = true;
    }
    else {
      boolEigenVermogen = false;
    }
    if (Number(accountingData1.schulden) > Number(accountingData2.schulden)) {
      boolSchulden = true;
    }
    else {
      boolSchulden = false;
    }
    if (Number(accountingData1.bedrijfswinst) > Number(accountingData2.bedrijfswinst)) {
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
          <p style={boolEigenVermogen ? { color: "green" } : { color: "red" }}>{Number(accountingData1.eigenVermogen).toLocaleString('nl-BE', { maximumFractionDigits: 0 })} EUR</p>
          <p><span>Schulden</span></p>
          <p style={boolSchulden ? { color: "red" } : { color: "green" }}>{Number(accountingData1.schulden).toLocaleString('nl-BE', { maximumFractionDigits: 0 })} EUR</p>
          <p><span>Bedrijfswinst</span></p>
          <p style={boolBedrijfswinst ? { color: "green" } : { color: "red" }}>{Number(accountingData1.bedrijfswinst).toLocaleString('nl-BE', { maximumFractionDigits: 0 })} EUR</p>
        </div>
        <div className={styles.flexboxContainer}>
          <p><span>Datum neerlegging</span> {accountingData2.depositDate}</p>
          <p><span>Eigen Vermogen</span></p>
          <p style={boolEigenVermogen ? { color: "red" } : { color: "green" }}>{Number(accountingData2.eigenVermogen).toLocaleString('nl-BE', { maximumFractionDigits: 0 })} EUR</p>
          <p><span>Schulden</span></p>
          <p style={boolSchulden ? { color: "green" } : { color: "red" }}>{Number(accountingData2.schulden).toLocaleString('nl-BE', { maximumFractionDigits: 0 })} EUR</p>
          <p><span>Bedrijfswinst</span></p>
          <p style={boolBedrijfswinst ? { color: "red" } : { color: "green" }}>{Number(accountingData2.bedrijfswinst).toLocaleString('nl-BE', { maximumFractionDigits: 0 })} EUR</p>
        </div>
      </div>
    )
  }

  export default PrintAccountingData;