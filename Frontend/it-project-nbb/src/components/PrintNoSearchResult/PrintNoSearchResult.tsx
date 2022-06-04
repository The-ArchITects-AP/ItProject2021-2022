import styles from './PrintNoSearchResult.module.css';

interface PrintNoSearchResultProps {
    noSearchResult: string
}

const PrintNoSearchResult = ({ noSearchResult }: PrintNoSearchResultProps) => {
    return (
        <div className={styles.messageContainer}>
            <div>{noSearchResult}</div>
        </div>
    );
}

export default PrintNoSearchResult;