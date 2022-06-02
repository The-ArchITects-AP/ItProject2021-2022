import { FullView } from '../../types';
import styles from './PrintLatestDbEntries.module.css';

interface PrintLatestDbEntriesProps {
    latestDbEntries: FullView[],
    showAccountingDetails: any
}

const PrintLatestDbEntries = ({ latestDbEntries, showAccountingDetails }: PrintLatestDbEntriesProps) => { 
    return (
        <div>{latestDbEntries.map((companyDetails: FullView) => {
            return <div className={styles.flexboxContainer} onClick={() => showAccountingDetails(companyDetails)}>
                <div className={styles.flexboxItem}>
                    <p className={styles.name}>Naam</p>
                    <p>{companyDetails.enterpriseName}</p>
                </div>
                <div className={styles.flexboxItem}>
                    <p className={styles.address}>Adres</p>
                    <p>
                        {companyDetails.street}{' '}
                        {companyDetails.number}<br />
                        {companyDetails.postalCode}{' '}
                        {companyDetails.city}
                    </p>
                </div>
            </div>
        })}
        </div>
    );
}
export default PrintLatestDbEntries;