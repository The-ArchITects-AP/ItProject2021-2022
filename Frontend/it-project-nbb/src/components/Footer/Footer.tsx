import styles from './Footer.module.css';

const Footer = () => {
    const datum = new Date();
    var jaar = datum.getFullYear();

    return (
        <div className={styles.footer}>
            <p>&copy; {jaar} The Architects | info@the-architects.be</p>
        </div>
    )
}

export default Footer;