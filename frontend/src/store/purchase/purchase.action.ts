import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const fetchPurchase = createAsyncThunk(
    "purchase/fetchPurchase",
    async () => {
        const res = await axios.post(`/purchase`);
        return res.data;
    });

export const fetchGetPurchaseItems = createAsyncThunk(
    "purchase/fetchGetPurchaseItems",
    async (limit: number) => {
        const res = await axios.get(`/purchase?limit=${limit}`);
        return res.data;
    });