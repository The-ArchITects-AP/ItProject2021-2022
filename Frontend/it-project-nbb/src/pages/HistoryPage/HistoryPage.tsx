import { Link } from 'react-router-dom';
import { NameView } from '../../types';
import styles from './HistoryPage.module.css';

//tijdelijke code voor nabootsen database 

const HistoryPage = () => {
    return (
        <div>
            <Link className={styles.back} to="/">back</Link>
            <SearchBar />
            <GetSearchList />
        </div>
    );
}

const SearchBar = () => {
    return (
        <div className={styles.inputForm}>
            <input
                type="string"
                id="search"
                name="search"
                placeholder="Ondernemingsnummer"
            />
            <button
                type="submit">
                Zoek
            </button>
        </div>
    );
}

interface GetSearchListProps {
}

const GetSearchList = () => {
    return (
       <div></div>
    );
}

interface PrintSearchListProps {
    referenceNumberData: NameView | undefined
}

const PrintSearchList = ({ referenceNumberData }: PrintSearchListProps) => {
    return (
        <div className={styles.printCompany}>
            <p className={styles.printCompanyDetail}>
                <strong>{referenceNumberData?.enterpriseName}</strong><br />
                {referenceNumberData?.street}{" "}
                {referenceNumberData?.number}<br />
                {referenceNumberData?.postalCode}{" "}
                {referenceNumberData?.city}
            </p>
        </div>
    );
}

export default HistoryPage;