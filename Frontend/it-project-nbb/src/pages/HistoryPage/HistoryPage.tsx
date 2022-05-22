import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FullView } from '../../types';
import styles from './HistoryPage.module.css';

const HistoryPage = () => {
    const [latestDbEntries, setLatestDbEntries] = useState<FullView[]>();
    const [updating, setUpdating] = useState<boolean>(false);

    useEffect(() => {
        fetchLatestDbEntries();
    }, [])

    const fetchLatestDbEntries = async () => {
        setUpdating(true);
        let url = `https://nbb-architects-api.azurewebsites.net/search/alldata`;
        console.log(url);
        let response = await fetch(url,
            {
                method: "GET",
            }
        );
        console.log(response);

        let json = await response.json();
        console.log(json);

        setLatestDbEntries(json as FullView[]);
        console.log(latestDbEntries);
        setUpdating(false);
    };

    return (
        <div>
            <Link className={styles.back} to="/">back</Link>
            <SearchBar />
            <div className={styles.flexboxContainer}>
                <div>
                    {!latestDbEntries ? (
                        <div></div>
                    ) : (
                        <GetLatestDbEntries latestDbEntries={latestDbEntries} />
                    )}
                </div>
            </div>
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

interface GetLatestDbEntriesProps {
    latestDbEntries: FullView[]
}

const GetLatestDbEntries = ({ latestDbEntries }: GetLatestDbEntriesProps) => {
    return (
        <div>{latestDbEntries.map((companyDetails: FullView) => {
            return <div className={styles.flexboxContainer} key={companyDetails.enterpriseName}>
                <div className={styles.flexboxItem}>
                    <p className={styles.title}>
                        <strong>Naam</strong>
                    </p>
                    <p>
                        {companyDetails.enterpriseName}
                    </p>
                </div>
                <div className={styles.flexboxItem}>
                    <p className={styles.address}>
                        <strong>Adres</strong>
                    </p>
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

export default HistoryPage;