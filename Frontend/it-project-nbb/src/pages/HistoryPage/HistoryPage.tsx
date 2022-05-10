import { Link } from 'react-router-dom';
import { NameView } from '../../types';
import styles from './HistoryPage.module.css';

//tijdelijke code voor nabootsen database 

interface HistoryPageProps {
    referenceNumberData1: NameView | undefined,
    referenceNumberData2: NameView | undefined
}

const HistoryPage = ({ referenceNumberData1, referenceNumberData2 }: HistoryPageProps) => {
    return (
        <div>
            <Link className={styles.back} to="/">back</Link>
            <SearchBar />
            <GetSearchList referenceNumberData1={referenceNumberData1} referenceNumberData2={referenceNumberData2} />
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
                placeholder="Zoek"
            />
            <button
                type="submit">
                Zoek
            </button>
        </div>
    );
}

interface GetSearchListProps {
    referenceNumberData1: NameView | undefined,
    referenceNumberData2: NameView | undefined
}

const GetSearchList = ({ referenceNumberData1, referenceNumberData2 }: GetSearchListProps) => {
    return (
        <div>
            <div className={styles.flexboxContainer}>
                <div>
                    {!referenceNumberData1 ? (
                        <div></div>
                    ) : (
                        <PrintSearchList referenceNumberData={referenceNumberData1} />
                    )}
                    {!referenceNumberData2 ? (
                        <div></div>
                    ) : (
                        <PrintSearchList referenceNumberData={referenceNumberData2} />
                    )}
                </div>
            </div>
        </div>
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