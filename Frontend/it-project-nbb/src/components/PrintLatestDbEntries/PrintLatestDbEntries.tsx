import { FullView } from '../../types';
import styles from './PrintLatestDbEntries.module.css';

interface PrintLatestDbEntriesProps {
    latestDbEntries: FullView[]
}

//component aanpassen: tonen accounting data na klik 
const PrintLatestDbEntries = ({ latestDbEntries }: PrintLatestDbEntriesProps) => {
    return (
        <div>{latestDbEntries.map((companyDetails: FullView) => {
            return <div className={styles.flexboxContainer} key={companyDetails.enterpriseName}>
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