import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../store/store"
import ItemCard from "../ItemCard/ItemCard"
import { getIds } from "../../store/item.slice"
import styles from "./ItemList.module.css"
import PaginationControls from "./PaginationControls/PaginationControls"

const ItemList = () => {
    const { itemList } = useAppSelector(store => store.item)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getIds({
            newSearchText: '',
            offset: 0
        }))
    }, [])

    return (
        <div className={styles.itemList}>
            {itemList.length > 40 && <PaginationControls />}
            {itemList.map(item => <ItemCard key={item.id} data={item} />)}
            {itemList.length > 40 && <PaginationControls />}
        </div >
    )
}

export default ItemList