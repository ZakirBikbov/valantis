import { FC } from "react"
import { IItem } from "../../interfaces/item.interface"
import styles from "./ItemCard.module.css"
import { useNavigate } from "react-router-dom"

const ItemCard: FC<{ data: IItem }> = ({ data }) => {
    const { id, brand, price, product } = data

    const navigate = useNavigate()
    return (
        <div className={styles.itemCard} onClick={() => navigate(`/items/${id}`)}>
            <p>{id}</p>
            <p>{product}</p>
            <p>{brand}</p>
            <p>{price}</p>
        </div>
    )
}

export default ItemCard