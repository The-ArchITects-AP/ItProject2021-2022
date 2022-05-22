import { ChangeEventHandler, MouseEventHandler, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FullView } from '../../types';
import styles from './HistoryPage.module.css';

const HistoryPage = () => {
    const [searchVariable, setSearchVariable] = useState<string>("");
    const [searchResult, setSearchResult] = useState<FullView>();
    const [latestDbEntries, setLatestDbEntries] = useState<FullView[]>();
    const [updating, setUpdating] = useState<boolean>(false);

    const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (
        event
      ) => {
        setSearchVariable(event.target.value);
      };

    const handleOnClick: MouseEventHandler<HTMLButtonElement> = (
        event
    ) => {
        doSearch(searchVariable);
    };

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

    const doSearch = async (searchVariable: string) => {
        setUpdating(true);
        let url = `https://nbb-architects-api.azurewebsites.net/search/searchquery/${searchVariable}`;
        console.log(url);
        let response = await fetch(url,
            {
                method: "GET",
            }
        );
        console.log(response);

        let json = await response.json();
        console.log(json);

        setSearchResult(json as FullView);
        console.log(latestDbEntries);
        setUpdating(false);
    };

    return (
        <div>
            <Link className={styles.back} to="/">back</Link>
            <SearchBar searchVariable={searchVariable} handleSearchChange={handleSearchChange} handleOnClick={handleOnClick} />
            <div className={styles.flexboxContainer}>
                <div>
                    {!latestDbEntries ? (
                        <div></div>
                    ) : (
                        <GetLatestDbEntries latestDbEntries={latestDbEntries} />
                    )}
                </div>
                <div>
                    {!searchResult ? (
                        <div></div>
                    ) : (
                        <PrintSearchData searchResult={searchResult} />
                    )}
                </div>
            </div>
        </div>
    );
}

interface SearchBarProps {
    searchVariable: string,
    handleSearchChange: ChangeEventHandler<HTMLInputElement>,
    handleOnClick: MouseEventHandler<HTMLButtonElement>
}

const SearchBar = ({ searchVariable, handleSearchChange, handleOnClick }: SearchBarProps) => {
    return (
        <div className={styles.inputForm}>
            <input
                type="string"
                id="search"
                name="search"
                value={searchVariable}
                placeholder="Ondernemingsnummer of bedrijfsnaam"
                title="Gelieve een ondernemingsnummer in te voeren of een bedrijfsnaam"
                onChange={handleSearchChange}
                required
            />
            <button
                type="submit"
                onClick={handleOnClick}>
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

interface PrintSearchDataProps {
    searchResult: FullView
}

//component nog aanpassen: voorlopig om te testen
const PrintSearchData = ({ searchResult }: PrintSearchDataProps) => {
    return (
        <div className={styles.flexboxContainer}>
                <div className={styles.flexboxItem}>
                    <p className={styles.title}>
                        <strong>Naam</strong>
                    </p>
                    <p>
                        {searchResult.enterpriseName}
                    </p>
                </div>
                <div className={styles.flexboxItem}>
                    <p className={styles.address}>
                        <strong>Adres</strong>
                    </p>
                    <p>
                        {searchResult.street}{" "}
                        {searchResult.number}<br />
                        {searchResult.postalCode}{" "}
                        {searchResult.city}
                    </p>
                </div>
                <div className={styles.flexboxItem}>
                    <p className={styles.title}>
                        <strong>Datum neerlegging</strong>
                    </p>
                    <p>
                        {searchResult.depositDate}
                    </p>
                </div>
                <div className={styles.flexboxItem}>
                    <p className={styles.title}>
                        <strong>Eigen Vermogen</strong>
                    </p>
                    <p>
                        {searchResult.eigenVermogen}
                    </p>
                </div>
                <div className={styles.flexboxItem}>
                    <p className={styles.title}>
                        <strong>Schulden</strong>
                    </p>
                    <p>
                        {searchResult.schulden}
                    </p>
                </div>
                <div className={styles.flexboxItem}>
                    <p className={styles.title}>
                        <strong>Bedrijfswinst</strong>
                    </p>
                    <p>
                        {searchResult.bedrijfswinst}
                    </p>
                </div>
            </div>
    );
}

export default HistoryPage;