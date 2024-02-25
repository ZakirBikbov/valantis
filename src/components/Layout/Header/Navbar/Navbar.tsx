import { Link } from "react-router-dom"
import Search from "./Search/Search"
import styles from "./Navbar.module.css"

const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <Link to="/valantis/" target="_self">
                <h1>Valantis</h1>
            </Link>
            <Search />
        </div>
    )
}

export default Navbar