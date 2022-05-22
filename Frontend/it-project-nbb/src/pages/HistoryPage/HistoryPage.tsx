import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NameView } from '../../types';
import styles from './HistoryPage.module.css';

const HistoryPage = () => {
    const [latestDbEntries, setLatestDbEntries] = useState<NameView[]>();
    const [updating, setUpdating] = useState<boolean>(false);

    useEffect(() => {
        fetchLatestDbEntries();
    }, [])

    const fetchLatestDbEntries = async () => {
        setUpdating(true);
        let url = `http://nbb-architects-api.azurewebsites.net/search/all`;
        console.log(url);
        let response = await fetch(url,
            {
                method: "GET",
            }
        );
        console.log(response);

        let json = await response.json();
        console.log(json);

        setLatestDbEntries(json as NameView[]);
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
    latestDbEntries: NameView[]
}

const GetLatestDbEntries = ({ latestDbEntries }: GetLatestDbEntriesProps) => {
    return (
        <div>
            <p>{latestDbEntries[0].enterpriseName}</p>
            <p>{latestDbEntries[1].enterpriseName}</p>
            <p>{latestDbEntries[2].enterpriseName}</p>
            <p>{latestDbEntries[3].enterpriseName}</p>
        </div>
    );
}

export default HistoryPage;