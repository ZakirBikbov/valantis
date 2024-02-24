import styles from "./Navbar.module.css"
import Search from "./Search/Search"

const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <h1>Valantis</h1>
            <Search />
        </div>
    )
}

export default Navbar