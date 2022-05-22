import styles from './PrintErrorMessage.module.css';

interface PrintErrorMessageProps {
    errorMessage: string
}

const PrintErrorMessage = ({ errorMessage }: PrintErrorMessageProps) => {
    return (
        <div>
            <p>{errorMessage}</p>
        </div>
    );
}

export default PrintErrorMessage;