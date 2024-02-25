import { FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../store/store"
import { getIds } from "../../../../../store/item.slice";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Search.module.css"

const Search = () => {
    const { searchText, selectFilterKey } = useAppSelector(store => store.item)

    const [newSearchText, setNewSearchText] = useState(searchText)
    const [newSelectFilterKey, setNewSelectFilterKey] = useState(selectFilterKey)

    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (location.pathname === '/valantis/') {
            dispatch(getIds({
                newSelectFilterKey,
                newSearchText,
                offset: 0
            }))
        } else {
            navigate('/valantis/')
        }
    }

    return (
        <form
            className={styles.form}
            onSubmit={e => handleSubmit(e)}
        >
            <select className={styles.selectFilter} onChange={e => setNewSelectFilterKey(e.target.value)}>
                <option value={'product'}>Название</option>
                <option value={'brand'}>Брэнд</option>
                <option value={'price'}>Цена</option>
            </select>
            <input
                className={styles.formControl}
                value={newSearchText}
                onChange={e => setNewSearchText(e.target.value)}
                type="search"
                placeholder="Search"
                aria-label="Search" />
            <button className={styles.searchBtn} type="submit">Search</button>
        </form >
    )
}

export default Search