import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import {toast} from "react-toastify";

export const fetchSearchQuery = createAsyncThunk(
    "search/fetchSearchQuery",
    async (search: string) => {
        try {
            const res = await axios.get(`/products/search?query=${search}`)
            return res.data
        } catch (err) {
            toast.error(err.response.data.message)
        }
    }
)