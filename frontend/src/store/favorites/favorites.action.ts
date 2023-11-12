import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import {toast} from "react-toastify";

export const fetchAddToFavorites = createAsyncThunk(
    'favorites/fetchAddToFavorites',
    async (params: { productId: string }) => {
        const res = await axios.post('/favorites/add', params)
        return res.data
    }
)

export const fetchGetFullFavorites = createAsyncThunk(
    'favorites/fetchGetFullFavorites',
    async () => {
        const res = await axios.get('/favorites/getFull')
        return res.data
    }
)

export const fetchGetFavorites = createAsyncThunk(
    'favorites/fetchGetFavorites',
    async () => {
        const res = await axios.get('/favorites')
        return res.data
    }
)

export const fetchRemoveFromFavorites = createAsyncThunk(
    'favorites/fetchRemoveFromFavorites',
    async (id: string) => {
        try {
            const res = await axios.delete(`/favorites/${id}`)
            return res.data
        } catch (err) {
            toast.error(err.message)
        }
    }
)