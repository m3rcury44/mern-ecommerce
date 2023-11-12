import {createSlice} from "@reduxjs/toolkit";
import {ICart} from "../../types/cart.interface";
import {promocodes} from "../../components/screens/cart/cart-list/CartList";
import {
    fetchAddToCart,
    fetchGetCart,
    fetchGetFullCart,
    fetchMinusItem,
    fetchPlusItem,
    fetchRemoveAllFromCart,
    fetchRemoveFromCart,
    fetchSetQuantityItem
} from "./cart.action";

interface ICartState {
    items: ICart[]
    totalQuantity: number
    discount: number
    totalPrice: number
    status: string
}

const initialState: ICartState = {
    items: [],
    totalQuantity: 0,
    discount: 0,
    totalPrice: 0.00,
    status: 'loading',
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        activateCoupon(state, action) {
            const couponExists = promocodes.find(promo => promo.coupon === action.payload);
            state.discount = couponExists ? 0 : 5
            state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.quantity + sum, 0) - state.discount;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchAddToCart.pending, state => {
                state.status = 'loading'
            })
            .addCase(fetchAddToCart.fulfilled, (state, action) => {
                state.totalQuantity = action.payload
            })
            .addCase(fetchAddToCart.rejected, state => {
                state.status = 'error'
            })
            .addCase(fetchPlusItem.pending, state => {
                state.status = 'loading'
            })
            .addCase(fetchPlusItem.fulfilled, (state, action) => {
                const findItem = state.items.find(obj => obj._id === action.meta.arg)

                if (findItem) {
                    findItem.quantity++
                    state.totalQuantity++
                }

                state.totalPrice = state.items.reduce((sum, item) => item.price * item.quantity + sum, 0)
                state.status = 'loaded'
            })
            .addCase(fetchPlusItem.rejected, state => {
                state.status = 'error'
            })
            .addCase(fetchMinusItem.pending, state => {
                state.status = 'loading'
            })
            .addCase(fetchMinusItem.fulfilled, (state, action) => {
                const findItem = state.items.find(obj => obj._id === action.meta.arg)

                if (findItem) {
                    findItem.quantity--
                    if (findItem.quantity === 0) {
                        state.items = state.items.filter(item => item._id !== action.meta.arg)
                        state.discount = 0
                    }
                }

                state.totalQuantity--
                state.totalPrice = state.items.reduce((sum, item) => item.price * item.quantity + sum, 0)
                state.status = 'loaded'
            })
            .addCase(fetchMinusItem.rejected, state => {
                state.status = 'error'
            })
            .addCase(fetchSetQuantityItem.pending, state => {
                state.status = 'loading'
            })
            .addCase(fetchSetQuantityItem.fulfilled, (state, action) => {
                const findItem = state.items.find(obj => obj._id === action.meta.arg.cartItemId)

                if (findItem) {
                    findItem.quantity = Number(action.meta.arg.quantity)
                    if (findItem.quantity <= 0) {
                        state.items = state.items.filter(item => item._id !== action.meta.arg.cartItemId)
                        state.discount = 0
                    }
                }

                state.totalQuantity = state.items.reduce((sum, item) => item.quantity + sum, 0)
                state.totalPrice = state.items.reduce((sum, item) => item.price * item.quantity + sum, 0)
                state.status = 'loaded'
            })
            .addCase(fetchSetQuantityItem.rejected, state => {
                state.status = 'error'
            })
            .addCase(fetchGetFullCart.pending, state => {
                state.status = 'full cart loading'
            })
            .addCase(fetchGetFullCart.fulfilled, (state, action) => {
                state.status = 'loaded'
                state.items = action.payload
                state.totalPrice = Array.isArray(state.items) ? state.items.reduce((sum, item) => item.price * item.quantity + sum, 0) : state.totalPrice
            })
            .addCase(fetchGetFullCart.rejected, state => {
                state.status = 'error'
            })
            .addCase(fetchGetCart.pending, state => {
                state.status = 'loading'
            })
            .addCase(fetchGetCart.fulfilled, (state, action) => {
                state.totalQuantity = action.payload
            })
            .addCase(fetchGetCart.rejected, state => {
                state.status = 'error'
            })
            .addCase(fetchRemoveFromCart.pending, (state, action) => {
                const findItem = state.items.find(obj => obj._id === action.meta.arg)

                if (findItem) {
                    state.totalQuantity = state.totalQuantity - findItem.quantity
                }

                if (state.items) {
                    state.items = state.items.filter(obj => obj._id !== action.meta.arg)
                }

                state.totalPrice = state.items.reduce((sum, item) => item.price * item.quantity + sum, 0)
                state.discount = 0
            })
            .addCase(fetchRemoveAllFromCart.fulfilled, state => {
                state.items = []
                state.totalQuantity = 0
                state.totalPrice = 0.00
                state.discount = 0
            })
    }
})

export const {
    activateCoupon
} = cartSlice.actions

export default cartSlice.reducer