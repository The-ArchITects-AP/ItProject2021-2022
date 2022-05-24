import { ChangeEventHandler, MouseEventHandler, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FullView } from '../../types';
import styles from './HistoryPage.module.css';

//componenten splitsen na feedback Sprintreview 4 

const HistoryPage = () => {
    const [searchVariable, setSearchVariable] = useState<string>("");
    const [searchResult, setSearchResult] = useState<FullView>();
    const [latestDbEntries, setLatestDbEntries] = useState<FullView[]>();
    const [enterpriseName, setEnterpriseName] = useState<string>("");
    const [showChosenDbEntry, setShowChosenDbEntry] = useState<boolean>(false);
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

    const handleShowDetails: MouseEventHandler<HTMLButtonElement> = (
        event
    ) => {
        setShowChosenDbEntry(true);
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
            <Link className={styles.back} to="/">Back</Link>
            <SearchBar searchVariable={searchVariable} handleSearchChange={handleSearchChange} handleOnClick={handleOnClick} />
            <div className={styles.flexboxContainerRender}>
                <div>
                    {!latestDbEntries ? (
                        <div>loading...</div>
                    ) : (
                        <GetLatestDbEntries latestDbEntries={latestDbEntries} setEnterpriseName={setEnterpriseName} handleShowDetails={handleShowDetails} />
                    )}
                </div>
                <div>
                    {!searchResult ? (
                        <div></div>
                    ) : (
                        <PrintSearchData searchResult={searchResult} />
                    )}
                </div>
                <div>
                    {showChosenDbEntry && latestDbEntries ? (
                        <PrintDetails latestDbEntries={latestDbEntries} />
                    ) : (
                        <div></div>
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
    latestDbEntries: FullView[],
    setEnterpriseName: any,
    handleShowDetails: MouseEventHandler<HTMLButtonElement>
}

//component aanpassen: tonen accounting data na klik 
const GetLatestDbEntries = ({ latestDbEntries, setEnterpriseName, handleShowDetails }: GetLatestDbEntriesProps) => {
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
                <div className={styles.flexboxItem2}>
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
    //<div className={styles.flexboxItem2}></div>
    //<button onClick={handleShowDetails}>accounting details</button>
    //</div>
}

interface ParamsTypes {
    enterpriseName: string
}

interface PrintDetailsProps {
    latestDbEntries: FullView[]
}

const PrintDetails = ({ latestDbEntries}: PrintDetailsProps) => {
    let { enterpriseName } = useParams<ParamsTypes>();

    let dbEntry = latestDbEntries.find(dbEntry => dbEntry.enterpriseName === enterpriseName);

    if (dbEntry === undefined) {
        return <div>Database entry not found</div>
    }

    return (
        <PrintSearchData searchResult={dbEntry} />
    );
}

interface PrintSearchDataProps {
    searchResult: FullView
}

//component nog herschrijven: voorlopig om te testen
const PrintSearchData = ({ searchResult }: PrintSearchDataProps) => {
    return (
        <div className={styles.searchResultContainer}>
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
                    {Number(searchResult.eigenVermogen).toLocaleString('nl-BE', { maximumFractionDigits: 0 })} EUR
                </p>
            </div>
            <div className={styles.flexboxItem}>
                <p className={styles.title}>
                    <strong>Schulden</strong>
                </p>
                <p>
                    {Number(searchResult.schulden).toLocaleString('nl-BE', { maximumFractionDigits: 0 })} EUR
                </p>
            </div>
            <div className={styles.flexboxItem}>
                <p className={styles.title}>
                    <strong>Bedrijfswinst</strong>
                </p>
                <p>
                    {Number(searchResult.bedrijfswinst).toLocaleString('nl-BE', { maximumFractionDigits: 0 })} EUR
                </p>
            </div>
        </div>
    );
}


export default HistoryPage;