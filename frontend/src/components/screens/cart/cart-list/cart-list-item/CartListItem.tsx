import React, {ChangeEvent, FC, useCallback, useEffect, useState} from 'react';
import classes from "./CartListItem.module.scss";
import {Link} from "react-router-dom";
import MyButton from "../../../../UI/buttons/my-button/MyButton";
import {useAppDispatch} from "../../../../../hooks/useAppDispatch";
import {
    fetchMinusItem,
    fetchPlusItem,
    fetchRemoveFromCart,
    fetchSetQuantityItem
} from "../../../../../store/cart/cart.action";
import {fetchAddToFavorites, fetchGetFullFavorites} from "../../../../../store/favorites/favorites.action";
import Popup, {IPopup} from "../../../../shared/popup/Popup";
import {useAppSelector} from "../../../../../hooks/useAppSelector";
import {ICart} from "../../../../../types/cart.interface";
import Skeleton from "../../../../UI/skeleton/Skeleton";
import {isInFavorites} from "../../../../../store/favorites/favorites.slice";
import {optimizedImg} from "../../../../../utils/optimizedImg";
import debounce from "lodash.debounce";

const CartListItem: FC<{ item: ICart, status: string }> = ({item, status}) => {

    const [quantity, setQuantity] = useState(item.quantity)
    const [debouncedQuantity, setDebouncedQuantity] = useState(item.quantity)

    const dispatch = useAppDispatch()

    const productId = useAppSelector(state => isInFavorites({state, id: item.productId}))

    useEffect(() => {
        setDebouncedQuantity(item.quantity)
    }, [item.quantity])

    const removeFromCart = () => {
        dispatch(fetchRemoveFromCart(item._id))
    }

    const moveToFavorites = async () => {
        if (productId) {
            dispatch(fetchRemoveFromCart(item._id))
        } else {
            await dispatch(fetchAddToFavorites({productId: item.productId}))
            dispatch(fetchGetFullFavorites())
            dispatch(fetchRemoveFromCart(item._id))
        }
    }

    const plusItem = () => {
        setDebouncedQuantity(item.quantity + 1)
        dispatch(fetchPlusItem(item._id))
    }

    const minusItem = () => {
        setDebouncedQuantity(item.quantity - 1)
        dispatch(fetchMinusItem(item._id))
    }

    const setQuantityItem = useCallback(debounce((number: number) => {
        setQuantity(number)
        dispatch(fetchSetQuantityItem({quantity: number, cartItemId: item._id}))
    }, 100), [dispatch])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const numQuantity = Number(e.target.value)
        if (numQuantity > 999) {
            return
        }

        setDebouncedQuantity(numQuantity)
        setQuantityItem(numQuantity)
    }

    const popupData: IPopup = {
        firstBtn: {
            onClick: removeFromCart,
            text: 'Remove'
        },
        secondBtn: {
            onClick: moveToFavorites,
            text: 'Move to favorites'
        }
    }

    if (status === 'full cart loading') {
        return <div className={classes.adaptiveSkeleton}><Skeleton/></div>
    }

    return (
        <div className={classes.cartItem}>
            <div style={{display: 'flex', justifyContent: 'space-between', gap: '10px'}}>
                <div style={{display: 'flex'}}>
                    <Link to={`/category/${item.category}/${item.href}`}>
                        <img src={optimizedImg(item.img)} alt={item.title}/>
                    </Link>
                    <div className={classes.cartItemInfo}>
                        <Link to={`/category/${item.category}/${item.href}`}>
                            <h4>{item.title}</h4>
                        </Link>
                        <div className={classes.cartItemInfoDesc}>
                            <p>Size: {item.size}, Color: {item.color},
                                Material: {item.material}</p>
                        </div>
                        <MyButton onClick={removeFromCart} style={{color: '#FA3434'}}>Remove</MyButton>
                        <MyButton onClick={moveToFavorites} style={{color: '#0D6EFD'}}>Move to
                            favorites</MyButton>
                    </div>
                </div>
                <div className={classes.popupMenu}>
                    <Popup popupData={popupData}/>
                </div>
            </div>
            <div className={classes.cartItemPrice}>
                <div className={classes.countBtns}>
                    <button onClick={minusItem}
                            style={{borderBottomLeftRadius: '6px', borderTopLeftRadius: '6px'}}>-
                    </button>
                    <input value={debouncedQuantity} onChange={handleChange} type="number"
                           inputMode='numeric'/>
                    <button onClick={plusItem}
                            style={{borderBottomRightRadius: '6px', borderTopRightRadius: '6px'}}>+
                    </button>
                </div>
                <h4>${(item.price * item.quantity).toFixed(2)}</h4>
            </div>
        </div>
    );
};

export default CartListItem;