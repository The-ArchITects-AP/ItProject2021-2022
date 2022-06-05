import { ChangeEventHandler, MouseEventHandler, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FullView } from '../../types';
import SearchBar from '../../components/SearchBar/SearchBar';
import PrintLatestDbEntries from '../../components/PrintLatestDbEntries/PrintLatestDbEntries';
import PrintSearchResult from '../../components/PrintSearchResult/PrintSearchResult';
import PrintNoSearchResult from '../../components/PrintNoSearchResult/PrintNoSearchResult';
import styles from './HistoryPage.module.css';

const HistoryPage = () => {
    const [searchVariable, setSearchVariable] = useState<string>("");
    const [searchResult, setSearchResult] = useState<FullView>();
    const [latestDbEntries, setLatestDbEntries] = useState<FullView[]>();
    const [chosenDbEntry, setchosenDbEntry] = useState<FullView>();
    const [noSearchResult, setNoSearchResult] = useState<string>("");
    const [updating, setUpdating] = useState<boolean>(false);

    const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (
        event
    ) => {
        setSearchResult(undefined);
        setSearchVariable(event.target.value);
        setNoSearchResult("");
    };

    const handleOnClick: MouseEventHandler<HTMLButtonElement> = (
        event
    ) => {
        getSearchResult(searchVariable);
        setchosenDbEntry(undefined);
    };

    const showAccountingDetails = (companyDetails: FullView) => {
        setchosenDbEntry(companyDetails);
        setSearchResult(undefined);
        setNoSearchResult("");
    }

    useEffect(() => {
        getLatestDbEntries();
    }, [])

    const getLatestDbEntries = async () => {
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
        setUpdating(false);
    };

    const getSearchResult = async (searchVariable: string) => {
        setUpdating(true);
        let url = `https://nbb-architects-api.azurewebsites.net/search/searchquery/${searchVariable}`;
        console.log(url);
        let response = await fetch(url,
            {
                method: "GET",
            }
        );
        console.log(response);
        console.log(response.status);

        if (response.status === 404) {
            setNoSearchResult("Geen zoekresultaat gevonden");
        }

        let json = await response.json();
        console.log(json);

        setSearchResult(json as FullView);
        setUpdating(false);
    };

    return (
        <div>
            <Link className={styles.back} to="/">Terug</Link>
            <SearchBar searchVariable={searchVariable} handleSearchChange={handleSearchChange} handleOnClick={handleOnClick} />
            <div className={styles.historyPageContainer}>
                <div className={styles.latestDbEntriesContainer}>
                    {!latestDbEntries ? (
                        <div>loading...</div>
                    ) : (
                        <PrintLatestDbEntries latestDbEntries={latestDbEntries} showAccountingDetails={showAccountingDetails} />
                    )}
                </div>
                <div>
                    {!noSearchResult ? (
                        <div></div>
                    ) : (
                        <PrintNoSearchResult noSearchResult={noSearchResult} />
                    )}
                </div>
                <div>
                    {!searchResult ? (
                        <div></div>
                    ) : (
                        <PrintSearchResult searchResult={searchResult} />
                    )}
                </div>
                <div>
                    {!chosenDbEntry ? (
                        <div></div>
                    ) : (
                        <PrintSearchResult searchResult={chosenDbEntry} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default HistoryPage;