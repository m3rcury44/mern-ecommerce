import {createAsyncThunk} from "@reduxjs/toolkit";
import {IProduct} from "../../types/product.interface";
import axios from "../../utils/axios";

export const getMainPageProducts = createAsyncThunk<IProduct[]>(
    "products/getMainPageProducts",
    async (_, thunkAPI) => {
        try {
            const res = await axios.get('/products/getMainProducts');
            return res.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    });

export const getRcmdItems = createAsyncThunk<IProduct[]>(
    "products/getRcmdItems",
    async (_, thunkAPI) => {
        try {
            const res = await axios.get('/products/getRcmd');
            return res.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    });