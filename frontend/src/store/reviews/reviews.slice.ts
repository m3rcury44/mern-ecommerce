import {createSlice} from "@reduxjs/toolkit";
import {fetchDeleteReview, fetchGetReviews, fetchSendReview} from "./reviews.action";
import {IReviews} from "../../types/product.interface";

interface IInitialState {
    items: null | IReviews,
    status: string
}

const initialState: IInitialState = {
    items: null,
    status: ''
}

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchGetReviews.pending, state => {
                state.status = 'loading'
            })
            .addCase(fetchGetReviews.fulfilled, (state, action) => {
                state.status = 'loaded'
                state.items = action.payload
            })
            .addCase(fetchGetReviews.rejected, state => {
                state.status = 'error'
            })
            .addCase(fetchSendReview.pending, state => {
                state.status = 'loading'
            })
            .addCase(fetchSendReview.fulfilled, (state, action) => {
                state.status = 'loaded'
                state.items = action.payload
            })
            .addCase(fetchSendReview.rejected, state => {
                state.status = 'error'
            })
            .addCase(fetchDeleteReview.pending, state => {
                state.status = 'delete loading'
            })
            .addCase(fetchDeleteReview.fulfilled, (state, action) => {
                state.status = 'loaded'
                if (state.items) {
                    state.items.reviews = state.items.reviews.filter(item => item._id !== action.meta.arg)
                }
            })
            .addCase(fetchDeleteReview.rejected, state => {
                state.status = 'error'
            })
    }
})

export default reviewsSlice.reducer