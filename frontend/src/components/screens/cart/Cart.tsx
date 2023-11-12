import React from 'react';
import CartList from "./cart-list/CartList";
import SavedForLater from "../../shared/saved-for-later/SavedForLater";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {selectIsAuth} from "../../../store/auth/auth.slice";
import NotAuth from "../../shared/not-auth/NotAuth";

const Cart = () => {

    const isAuth = useAppSelector(selectIsAuth)
    const {status} = useAppSelector(state => state.cart)

    if (!isAuth && status === 'error') {
        return <NotAuth/>
    }

    return (
        <div style={{display: 'grid', gridGap: '20px'}}>
            <CartList/>
            <SavedForLater/>
        </div>
    );
};

export default Cart;