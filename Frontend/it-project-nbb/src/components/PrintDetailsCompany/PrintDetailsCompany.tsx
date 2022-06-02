import { NameView } from "../../types";
import styles from './PrintDetailsCompany.module.css';

interface PrintDetailsCompanyProps {
  referenceNumberData: NameView
}

const PrintDetailsCompany = ({ referenceNumberData }: PrintDetailsCompanyProps) => {
  return (
    <div className={styles.flexboxContainer}>
      <div className={styles.flexboxItem}>
        <p className={styles.name}>Naam</p>
        <p>{referenceNumberData.enterpriseName}</p>
      </div>
      <div className={styles.flexboxItem}>
        <p className={styles.address}>Adres</p>
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

export default PrintDetailsCompany;