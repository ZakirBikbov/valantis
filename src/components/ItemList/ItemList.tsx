import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../store/store"
import ItemCard from "../ItemCard/ItemCard"
import { clear, getIds } from "../../store/item.slice"
import styles from "./ItemList.module.css"
import PaginationControls from "./PaginationControls/PaginationControls"

const ItemList = () => {
    const { itemList, searchText, loading, selectFilterKey } = useAppSelector(store => store.item)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getIds({
            newSelectFilterKey: selectFilterKey,
            newSearchText: searchText,
            offset: 0
        }))
        console.log(searchText.length)
        return () => {
            dispatch(clear())
        }
    }, [])

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