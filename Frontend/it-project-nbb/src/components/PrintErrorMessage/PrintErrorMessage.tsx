import styles from './PrintErrorMessage.module.css';

interface PrintErrorMessageProps {
    errorMessage: string
}

const PrintErrorMessage = ({ errorMessage }: PrintErrorMessageProps) => {
    return (
        <div className={styles.messageContainer}>
            <img src="IconError.png" alt="Error icon"/>
            <div>{errorMessage}</div>
        </div>
    );
}

export default PrintErrorMessage;