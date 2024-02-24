import Navbar from "./Navbar/Navbar"
import styles from "./Header.module.css"

const Header = () => {
    return (
        <header className={styles.header}>
            <div className="container">
                <Navbar />
            </div>
        </header>
    )
}

export default Header