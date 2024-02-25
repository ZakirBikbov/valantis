import { getIds } from "../../../store/item.slice"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import styles from "./PaginationControls.module.css"

const PaginationControls = () => {
    const { offset, searchText, selectFilterKey } = useAppSelector(store => store.item)

    const dispatch = useAppDispatch()

    return (
        <div className={styles.paginationControl}>
            <button
                className={styles.navBtn}
                onClick={() => dispatch(getIds({
                    newSelectFilterKey: selectFilterKey,
                    newSearchText: searchText,
                    offset: offset - 50
                }))}
            >Prev</button>
            <button
                className={styles.navBtn}
                onClick={() => dispatch(getIds({
                    newSelectFilterKey: selectFilterKey,
                    newSearchText: searchText,
                    offset: offset + 50
                }))}
            >Next</button>
        </div >
    )
}

export default PaginationControls