import { FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../store/store"
import { getIds, setSearchText, setSelectFilterKey } from "../../../../../store/item.slice";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Search.module.css"

const Search = () => {
    const { searchText, selectFilterKey } = useAppSelector(store => store.item)

    const [newSelectFilterKey, setNewSelectFilterKey] = useState(selectFilterKey)
    const [newSearchText, setNewSearchText] = useState(searchText)

    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        dispatch(setSelectFilterKey(newSelectFilterKey))
        dispatch(setSearchText(newSearchText))
        if (location.pathname === '/valantis/items/') {
            dispatch(getIds({
                newSelectFilterKey,
                newSearchText,
                offset: 0
            }))
        } else {
            navigate('/valantis/items/')
        }
    }

    useEffect(() => {
        if (location.pathname === '/valantis/') {
            setNewSelectFilterKey('product')
            setNewSearchText('')
        }
    }, [location.pathname])

    return (
        <form
            className={styles.form}
            onSubmit={e => handleSubmit(e)}
        >
            <select
                className={styles.selectFilter}
                value={newSelectFilterKey}
                onChange={e => setNewSelectFilterKey(e.target.value)}
            >
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