import React, {FC} from 'react';
import classes from './AddToCartBtn.module.scss'
import {useAppDispatch} from "../../../../hooks/useAppDispatch";
import {fetchAddToCart} from "../../../../store/cart/cart.action";

const AddToCartBtn: FC<{ id: string }> = ({id}) => {

    const dispatch = useAppDispatch()

    const addToCart = () => {
        dispatch(fetchAddToCart({productId: id}))
    }

    return (
        <button className={classes.addToCartBtn} onClick={addToCart}>
            Add to cart
        </button>
    );
};

export default AddToCartBtn;