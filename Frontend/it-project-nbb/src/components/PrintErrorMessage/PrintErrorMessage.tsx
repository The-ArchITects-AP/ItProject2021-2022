import styles from './PrintErrorMessage.module.css';

interface PrintErrorMessageProps {
    errorMessage: string
}

const PrintErrorMessage = ({ errorMessage }: PrintErrorMessageProps) => {
    return (
        <div className={styles.messageContainer}>
            <img src="IconError.png" alt="Error icon" width="16" height="16" /><p>{errorMessage}</p>
        </div>
    );
}

export default PrintErrorMessage;