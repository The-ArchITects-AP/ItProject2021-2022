import { FullView } from '../../types';
import styles from './PrintSearchResult.module.css';

interface PrintSearchResultProps {
    searchResult: FullView
}

const PrintSearchResult = ({ searchResult }: PrintSearchResultProps) => {
    return (
        <div className={styles.searchResultContainer}>
            <div className={styles.flexboxItem}>
                <p className={styles.title}><strong>Naam</strong></p>
                <p>{searchResult.enterpriseName}</p>
            </div>
            <div className={styles.flexboxItem}>
                <p className={styles.address}><strong>Adres</strong></p>
                <p>
                    {searchResult.street}{" "}
                    {searchResult.number}<br />
                    {searchResult.postalCode}{" "}
                    {searchResult.city}
                </p>
            </div>
            <div className={styles.flexboxItem}>
                <p className={styles.title}><strong>Datum neerlegging</strong></p>
                <p>{searchResult.depositDate}</p>
            </div>
            <div className={styles.flexboxItem}>
                <p className={styles.title}><strong>Eigen Vermogen</strong></p>
                {searchResult.eigenVermogen === 'geen data beschikbaar' ? (
                    <p>{searchResult.eigenVermogen}</p>
                ) : (
                    <p>{Number(searchResult.eigenVermogen).toLocaleString('nl-BE', { maximumFractionDigits: 0 })} EUR</p>
                )}
            </div>
            <div className={styles.flexboxItem}>
                <p className={styles.title}><strong>Schulden</strong></p>
                {searchResult.schulden === 'geen data beschikbaar' ? (
                    <p>{searchResult.schulden}</p>
                ) : (
                    <p>{Number(searchResult.schulden).toLocaleString('nl-BE', { maximumFractionDigits: 0 })} EUR</p>
                )}
            </div>
            <div className={styles.flexboxItem}>
                <p className={styles.title}><strong>Bedrijfswinst</strong></p>
                {searchResult.bedrijfswinst === 'geen data beschikbaar' ? (
                    <p>{searchResult.bedrijfswinst}</p>
                ) : (
                    <p>{Number(searchResult.bedrijfswinst).toLocaleString('nl-BE', { maximumFractionDigits: 0 })} EUR</p>
                )}
            </div>
        </div>
    );
}

export default PrintSearchResult;