import {createSlice} from "@reduxjs/toolkit";
import {fetchGetPurchaseItems, fetchPurchase} from "./purchase.action";
import {IPurchaseItem} from "../../types/purchase.interface";

interface IInitialState {
    items: IPurchaseItem[],
    status: string
}

const initialState: IInitialState = {
    items: [],
    status: 'loading'
}

const purchaseSlice = createSlice({
    name: 'purchase',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchPurchase.pending, state => {
                state.status = 'loading'
            })
            .addCase(fetchPurchase.fulfilled, (state, action) => {
                state.items = action.payload
                state.status = 'loaded'
            })
            .addCase(fetchPurchase.rejected, state => {
                state.status = 'error'
            })
            .addCase(fetchGetPurchaseItems.pending, state => {
                state.status = 'loading'
            })
            .addCase(fetchGetPurchaseItems.fulfilled, (state, action) => {
                state.items = action.payload
                state.status = 'loaded'
            })
            .addCase(fetchGetPurchaseItems.rejected, state => {
                state.status = 'error'
            })
    }
})

export default purchaseSlice.reducer