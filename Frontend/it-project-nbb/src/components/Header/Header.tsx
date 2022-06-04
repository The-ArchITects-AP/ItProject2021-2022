import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.imageContainer}>
                <a href="/"><img src="LogoTheArchitects.png" alt="Logo The ArchITects" /></a>
            </div>
            <div>
                <ul>
                    <li><NavLink exact to="/history" activeClassName={styles.activeLink}>Zoekgeschiedenis</NavLink></li>
                </ul>
            </div>
        </div>
    )
}

export default Header;