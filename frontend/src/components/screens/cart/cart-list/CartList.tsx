import React, {ChangeEvent, useEffect, useState} from 'react';
import MyButton from "../../../UI/buttons/my-button/MyButton";
import {Link, useNavigate} from "react-router-dom";
import classes from './CartList.module.scss'
import {useAppDispatch} from "../../../../hooks/useAppDispatch";
import {useAppSelector} from "../../../../hooks/useAppSelector";
import {activateCoupon} from "../../../../store/cart/cart.slice";
import MyInput from "../../../UI/input/MyInput";
import CartListItem from "./cart-list-item/CartListItem";
import {fetchGetCart, fetchGetFullCart, fetchRemoveAllFromCart} from "../../../../store/cart/cart.action";
import EmptyComponent from "../../../shared/empty-component/EmptyComponent";
import {fetchPurchase} from "../../../../store/purchase/purchase.action";
import {toast} from "react-toastify";

export const promocodes = [
    {coupon: "5dollarsdiscount"},
    {coupon: "m1ng4s0v"},
    {coupon: "naletko"},
]

const CartList = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const {items, totalQuantity, totalPrice, discount, status} = useAppSelector(state => state.cart)

    useEffect(() => {
        dispatch(fetchGetFullCart())
    }, [dispatch])

    const errorMessage = () => toast.error("Your cart is empty")

    const removeAllFromCart = async () => {
        if (items.length) {
            await dispatch(fetchRemoveAllFromCart())
            dispatch(fetchGetFullCart())
        } else {
            return errorMessage()
        }
    }

    const purchase = async () => {
        if (!items.length) {
            return errorMessage()
        }

        await dispatch(fetchPurchase())
        dispatch(fetchGetCart())

        navigate('/profile')

        return toast.success('Congratulations on your purchase')
    }

    const [value, setValue] = useState('')

    const couponExists = promocodes.some(promo => promo.coupon === value);

    const onClickActivateCoupon = () => {
        if (couponExists && totalQuantity) {
            dispatch(activateCoupon(items));
        }
    }

    const onChangeCoupon = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const subtotal = (totalPrice + discount).toFixed(2)

    return (
        <>
            <h3 className={classes.title}>
                My cart ({totalQuantity})
            </h3>
            <section className={classes.cartList}>
                <div className={classes.cart}>
                    {status.includes('loading') && !items.length ? <span></span> : ''}
                    {!items?.length && !status.includes('loading') ?
                        <EmptyComponent text='cart'/> : items.map(item => (
                            <CartListItem key={item._id} item={item} status={status}/>
                        ))}
                    <div className={classes.cartBtns}>
                        <Link to='/'>
                            <MyButton className={classes.backBtn}>
                                Back to shop
                            </MyButton>
                        </Link>
                        <MyButton onClick={removeAllFromCart} className={classes.removeBtn}>Remove all</MyButton>
                    </div>
                </div>
                <div>
                    <div className={classes.coupon}>
                        <p>Have a coupon?</p>
                        <div className={classes.enterCoupon}>
                            <MyInput value={value} onChange={onChangeCoupon} placeholder='Add coupon'/>
                            <button onClick={onClickActivateCoupon}>Apply</button>
                        </div>
                        {couponExists ? <div style={{fontSize: '12px', color: '#09901a'}}>* the coupon exists</div>
                            : <div style={{fontSize: '12px'}}>* enter the coupon</div>}
                    </div>
                    <div className={classes.checkout}>
                        <div className={classes.price}>
                            <div className={classes.priceCalculating}>
                                <p>Subtotal:</p>
                                <p>${subtotal}</p>
                            </div>
                            <div className={classes.priceCalculating}>
                                <p>Discount:</p>
                                <p style={{color: '#00B517'}}>- ${discount}</p>
                            </div>
                        </div>
                        <div className={classes.purchase}>
                            <div className={classes.totalPrice}>
                                <h6>Total:</h6>
                                <h4 style={{
                                    fontSize: '20px',
                                    lineHeight: '28px'
                                }}>${totalPrice.toFixed(2)}</h4>
                            </div>
                            <MyButton onClick={purchase}>Checkout</MyButton>
                        </div>
                        <div className={classes.payMethods}>
                            <img src="/images/cart-icons/americanexpress.svg"
                                 alt="americanexpress"/>
                            <img src="/images/cart-icons/mastercard.svg" alt="mastercard"/>
                            <img src="/images/cart-icons/paypal.svg" alt="paypal"/>
                            <img src="/images/cart-icons/visa.svg" alt="visa"/>
                            <img src="/images/cart-icons/applepay.svg" alt="applepay"/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CartList;