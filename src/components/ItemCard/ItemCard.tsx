import { FC } from "react"
import { IItem } from "../../interfaces/item.interface"
import styles from "./ItemCard.module.css"

const ItemCard: FC<{ data: IItem }> = ({ data }) => {
    const { brand, price, product } = data
    return (
        <div className={styles.itemCard}>
            <p>{product}</p>
            <p>{brand}</p>
            <p>{price}</p>
        </div>
    )
}

export default ItemCard