import { ChangeEventHandler, MouseEventHandler, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FullView } from '../../types';
import SearchBar from '../../components/SearchBar/SearchBar';
import PrintLatestDbEntries from '../../components/PrintLatestDbEntries/PrintLatestDbEntries';
import PrintSearchResult from '../../components/PrintSearchResult/PrintSearchResult';
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
        getSearchResult(searchVariable);
    };

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
        console.log(latestDbEntries);
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
                        <PrintLatestDbEntries latestDbEntries={latestDbEntries} />
                    )}
                </div>
                <div>
                    {!searchResult ? (
                        <div></div>
                    ) : (
                        <PrintSearchResult searchResult={searchResult} />
                    )}
                </div>               
            </div>
        </div>
    );
}

export default HistoryPage;