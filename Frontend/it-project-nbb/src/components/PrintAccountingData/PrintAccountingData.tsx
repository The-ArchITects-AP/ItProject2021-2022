import { AccountingView } from "../../types";
import styles from './PrintAccountingData.module.css';

interface PrintAccountingDataProps {
  accountingData1: AccountingView,
  accountingData2: AccountingView
}

const PrintAccountingData = ({ accountingData1, accountingData2 }: PrintAccountingDataProps) => {
  var boolEigenVermogen, boolSchulden, boolBedrijfswinst;

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

  return (
    <div>
      <div className={styles.flexboxContainer}>
        <div className={styles.flexboxItem}>
          <p><strong>Datum neerlegging</strong></p>
          <p><span>{accountingData1.depositDate}</span></p>
        </div>
        <div className={styles.flexboxItem}>
          <p><strong>Eigen Vermogen</strong></p>
          {accountingData1.eigenVermogen === "geen data beschikbaar" ? (
            <p><span>{accountingData1.eigenVermogen}</span></p>
          ) : (
            <p style={boolEigenVermogen ? { color: "green" } : { color: "red" }}>
              <span>{Number(accountingData1.eigenVermogen).toLocaleString('nl-BE', { maximumFractionDigits: 0 })} EUR</span>
            </p>
          )}
        </div>
        <div className={styles.flexboxItem}>
          <p><strong>Schulden</strong></p>
          {accountingData1.schulden === "geen data beschikbaar" ? (
            <p><span>{accountingData1.schulden}</span></p>
          ) : (
            <p style={boolSchulden ? { color: "red" } : { color: "green" }}>
              <span>{Number(accountingData1.schulden).toLocaleString('nl-BE', { maximumFractionDigits: 0 })} EUR</span>
            </p>
          )}
        </div>
        <div className={styles.flexboxItem}>
          <p><strong>Bedrijfswinst</strong></p>
          {accountingData1.bedrijfswinst === "geen data beschikbaar" ? (
            <p><span>{accountingData1.bedrijfswinst}</span></p>
          ) : (
            <p style={boolBedrijfswinst ? { color: "green" } : { color: "red" }}>
              <span>{Number(accountingData1.bedrijfswinst).toLocaleString('nl-BE', { maximumFractionDigits: 0 })} EUR</span>
            </p>
          )}
        </div>
      </div>

      <div className={styles.flexboxContainer}>
        <div className={styles.flexboxItem}>
          <p><strong>Datum neerlegging</strong></p>
          <p><span>{accountingData2.depositDate}</span></p>
        </div>
        <div className={styles.flexboxItem}>
          <p><strong>Eigen Vermogen</strong></p>
          {accountingData2.eigenVermogen === "geen data beschikbaar" ? (
            <p><span>{accountingData2.eigenVermogen}</span></p>
          ) : (
            <p style={boolEigenVermogen ? { color: "red" } : { color: "green" }}>
              <span>{Number(accountingData2.eigenVermogen).toLocaleString('nl-BE', { maximumFractionDigits: 0 })} EUR</span>
            </p>
          )}
        </div>
        <div className={styles.flexboxItem}>
          <p><strong>Schulden</strong></p>
          {accountingData2.schulden === "geen data beschikbaar" ? (
            <p><span>{accountingData2.schulden}</span></p>
          ) : (
            <p style={boolSchulden ? { color: "green" } : { color: "red" }}>
              <span>{Number(accountingData2.schulden).toLocaleString('nl-BE', { maximumFractionDigits: 0 })} EUR</span>
            </p>
          )}
        </div>
        <div className={styles.flexboxItem}>
          <p><strong>Bedrijfswinst</strong></p>
          {accountingData2.bedrijfswinst === 'geen data beschikbaar' ? (
            <p><span>{accountingData2.bedrijfswinst}</span></p>
          ) : (
            <p style={boolBedrijfswinst ? { color: "red" } : { color: "green" }}>
              <span>{Number(accountingData2.bedrijfswinst).toLocaleString('nl-BE', { maximumFractionDigits: 0 })} EUR</span>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default PrintAccountingData;