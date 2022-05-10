import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
    return (
        <div className={styles.header}>
            <img src="LogoTheArchitects.png" alt="Logo The ArchITects" width="200" height="" />
            <div>
                <ul>
                    <li><NavLink exact to="/history" activeClassName={styles.activeLink}>Zoekgeschiedenis</NavLink></li>
                </ul>
            </div>
        </div>
    )
}

export default Header;