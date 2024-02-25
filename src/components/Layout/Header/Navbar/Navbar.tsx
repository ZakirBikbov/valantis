import { useNavigate } from "react-router-dom"
import styles from "./Navbar.module.css"
import Search from "./Search/Search"


const Navbar = () => {

    const navigate = useNavigate()

    return (
        <div className={styles.navbar}>
            <h1
                style={{ cursor: "pointer" }}
                onClick={() => navigate('/')}
            >Valantis</h1>
            <Search />
        </div>
    )
}

export default Navbar