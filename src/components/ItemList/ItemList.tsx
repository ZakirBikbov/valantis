import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { clear, getIds } from "../../store/item.slice"
import ItemCard from "../ItemCard/ItemCard"
import PaginationControls from "./PaginationControls/PaginationControls"
import styles from "./ItemList.module.css"

const ItemList = () => {
    const { itemList, searchText, loading, selectFilterKey } = useAppSelector(store => store.item)
    const location = useLocation()

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (location.pathname === '/valantis/items/') {
            dispatch(getIds({
                newSelectFilterKey: selectFilterKey,
                newSearchText: searchText,
                offset: 0
            }))
        } else {
            dispatch(getIds({
                newSelectFilterKey: 'product',
                newSearchText: '',
                offset: 0
            }))
        }
        return () => {
            dispatch(clear())
        }
    }, [location.pathname])

    return (
        <>
            {loading ?
                <div className="loading">
                    <div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                </div>
                :
                <div className={styles.itemList}>
                    {searchText.length === 0 && <PaginationControls />}
                    {itemList.map(item => <ItemCard key={item.id} data={item} />)}
                    {searchText.length === 0 && <PaginationControls />}
                </div>
            }
        </>
    )
}

export default ItemList