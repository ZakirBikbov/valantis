import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../store/store"
import ItemCard from "../ItemCard/ItemCard"
import { getIds } from "../../store/item.slice"
import styles from "./ItemList.module.css"

const ItemList = () => {
    const { itemList, offset } = useAppSelector(store => store.item)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getIds(0))
    }, [])

    return (
        <div className={styles.itemList}>
            <div className={styles.paginationControl}>
                <button className={styles.navBtn} onClick={() => dispatch(getIds(offset - 50))}>Prev</button>
                <button className={styles.navBtn} onClick={() => dispatch(getIds(offset + 50))}>Next</button>
            </div>
            {itemList.map(item => <ItemCard key={item.id} data={item} />)}
            <div className={styles.paginationControl}>
                <button className={styles.navBtn} onClick={() => dispatch(getIds(offset - 50))}>Prev</button>
                <button className={styles.navBtn} onClick={() => dispatch(getIds(offset + 50))}>Next</button>
            </div>
        </div >
    )
}

export default ItemList