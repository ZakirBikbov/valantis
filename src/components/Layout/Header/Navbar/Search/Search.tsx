import { FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../store/store"
import { getIds } from "../../../../../store/item.slice";
import styles from "./Search.module.css"

const Search = () => {
    const { searchText } = useAppSelector(store => store.item)

    const [newSearchText, setNewSearchText] = useState(searchText);

    const dispatch = useAppDispatch()

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        dispatch(getIds({
            newSearchText,
            offset: 0
        }))
    }

    return (
        <form
            className={styles.form}
            onSubmit={e => handleSubmit(e)}
        >
            <input
                className={styles.formControl}
                value={newSearchText}
                onChange={e => setNewSearchText(e.target.value)}
                type="search"
                placeholder="Search"
                aria-label="Search" />
            <button className={styles.searchBtn} type="submit">Search</button>
        </form>
    )
}

export default Search