import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../store/store";
import { clear, getItems } from "../store/item.slice";

const Item = () => {
    const { itemList, loading } = useAppSelector(store => store.item)
    const params = useParams()

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getItems([params.id] as string[]))
        return () => {
            dispatch(clear())
        }
    }, [])

    const itemData: React.CSSProperties = {
        margin: '20px 15px',
    }

    return (
        <>
            {loading ?
                <div className="loading">
                    <div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                </div>
                :
                <div style={itemData}>
                    <p><strong>Название:</strong>{` ${itemList[0] && itemList[0].product}`}</p>
                    <p><strong>Брэнд:</strong>{` ${itemList[0] && itemList[0].brand}`}</p>
                    <p><strong>Цена:</strong>{` ${itemList[0] && itemList[0].price}`}</p>
                </div>
            }
        </>
    )
}

export default Item