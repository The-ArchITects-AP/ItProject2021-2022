import styles from './PrintErrorMessage.module.css';

interface PrintErrorMessageProps {
    statusNotFound: string
}

const PrintErrorMessage = ({ statusNotFound }: PrintErrorMessageProps) => {
    return (
        <div>
            <p>{statusNotFound}</p>
        </div>
    );
}

export default PrintErrorMessage;