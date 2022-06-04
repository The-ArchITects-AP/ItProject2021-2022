import { ChangeEventHandler, MouseEventHandler } from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
    searchVariable: string,
    handleSearchChange: ChangeEventHandler<HTMLInputElement>,
    handleOnClick: MouseEventHandler<HTMLButtonElement>
}

const SearchBar = ({ searchVariable, handleSearchChange, handleOnClick }: SearchBarProps) => {
    return (
        <div className={styles.searchBar}>
            <input
                type="string"
                id="search"
                name="search"
                value={searchVariable}
                placeholder="Ondernemingsnummer of bedrijfsnaam"
                title="Gelieve een ondernemingsnummer of een bedrijfsnaam in te voeren"
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

export default SearchBar;