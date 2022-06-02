import { FullView } from '../../types';
import styles from './PrintLatestDbEntries.module.css';

interface PrintLatestDbEntriesProps {
    latestDbEntries: FullView[],
    showAccountingDetails: any
}

const PrintLatestDbEntries = ({ latestDbEntries, showAccountingDetails }: PrintLatestDbEntriesProps) => { 
    return (
        <div>{latestDbEntries.map((companyDetails: FullView) => {
            return <div className={styles.flexboxContainer} key={companyDetails.enterpriseName} onClick={() => showAccountingDetails(companyDetails)}>
                <div className={styles.flexboxItem}>
                    <p className={styles.title}><strong>Naam</strong></p>
                    <p>{companyDetails.enterpriseName}</p>
                </div>
                <div className={styles.flexboxItem2}>
                    <p className={styles.address}><strong>Adres</strong></p>
                    <p>
                        {companyDetails.street}{" "}
                        {companyDetails.number}<br />
                        {companyDetails.postalCode}{" "}
                        {companyDetails.city}
                    </p>
                </div>
            </div>
        })}
        </div>
    );
}
export default PrintLatestDbEntries;