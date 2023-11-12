import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import {toast} from "react-toastify";

export const fetchGetReviews = createAsyncThunk(
    "reviews/fetchGetReviews",
    async (productId: string) => {
        try {
            const res = await axios.get(`/products/reviews/${productId}`)
            return res.data
        } catch (err) {
            toast.error(err.message)
        }
    }
)

export const fetchSendReview = createAsyncThunk(
    "reviews/fetchSendReview",
    async (params: { productId: string, text: string }) => {
        try {
            const res = await axios.post('/products/reviews/add', params)
            return res.data
        } catch (err) {
            toast.error(err.message)
        }
    }
)

export const fetchDeleteReview = createAsyncThunk(
    "reviews/fetchDeleteReview",
    async (id: string) => {
        try {
            const res = await axios.delete(`/products/reviews/${id}`)
            return res.data
        } catch (err) {
            toast.error(err.message)
        }
    }
)