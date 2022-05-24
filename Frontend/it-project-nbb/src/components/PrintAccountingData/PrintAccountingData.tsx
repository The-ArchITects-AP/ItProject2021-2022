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
        <div className={styles.flexboxItem}>
          <p><strong>Datum neerlegging</strong></p>
          <p><span>{accountingData1.depositDate}</span></p>
        </div>
        <div className={styles.flexboxItem}>
          <p><strong>Eigen Vermogen</strong></p>
          <p style={boolEigenVermogen ? { color: "green" } : { color: "red" }}><span>{Number(accountingData1.eigenVermogen).toLocaleString('nl-BE', { maximumFractionDigits: 0 })} EUR</span></p>
        </div>
        <div className={styles.flexboxItem}>
          <p><strong>Schulden</strong></p>
          <p style={boolSchulden ? { color: "red" } : { color: "green" }}><span>{Number(accountingData1.schulden).toLocaleString('nl-BE', { maximumFractionDigits: 0 })} EUR</span></p>
        </div>
        <div className={styles.flexboxItem}>
          <p><strong>Bedrijfswinst</strong></p>
          <p style={boolBedrijfswinst ? { color: "green" } : { color: "red" }}><span>{Number(accountingData1.bedrijfswinst).toLocaleString('nl-BE', { maximumFractionDigits: 0 })} EUR</span></p>
        </div>
      </div>
      <div className={styles.flexboxContainer}>
        <div className={styles.flexboxItem}>
          <p><strong>Datum neerlegging</strong></p>
          <p><span>{accountingData2.depositDate}</span></p>
        </div>
        <div className={styles.flexboxItem}>
          <p><strong>Eigen Vermogen</strong></p>
          <p style={boolEigenVermogen ? { color: "red" } : { color: "green" }}><span>{Number(accountingData2.eigenVermogen).toLocaleString('nl-BE', { maximumFractionDigits: 0 })} EUR</span></p>
        </div>
        <div className={styles.flexboxItem}>
          <p><strong>Schulden</strong></p>
          <p style={boolSchulden ? { color: "green" } : { color: "red" }}><span>{Number(accountingData2.schulden).toLocaleString('nl-BE', { maximumFractionDigits: 0 })} EUR</span></p>
        </div>
        <div className={styles.flexboxItem}>
          <p><strong>Bedrijfswinst</strong></p>
          <p style={boolBedrijfswinst ? { color: "red" } : { color: "green" }}><span>{Number(accountingData2.bedrijfswinst).toLocaleString('nl-BE', { maximumFractionDigits: 0 })} EUR</span></p>
        </div>
      </div>
    </div>
  )
}

export default PrintAccountingData;