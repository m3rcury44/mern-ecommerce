import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import {IProduct} from "../../types/product.interface";
import {toast} from "react-toastify";

export const fetchAddToCart = createAsyncThunk(
    "cart/fetchAddToCart",
    async (params: { productId: string | IProduct }) => {
        try {
            const res = await axios.post('/cart/add', params);
            return res.data;
        } catch (err) {
            toast.error('Failed to add item to cart')
        }
    });

export const fetchPlusItem = createAsyncThunk(
    "cart/fetchPlusItem",
    async (id: string) => {
        try {
            const res = await axios.patch(`/cart/plusItem/${id}`);
            return res.data;
        } catch (err) {
            toast.error(err.message)
        }
    });

export const fetchMinusItem = createAsyncThunk(
    "cart/fetchMinusItem",
    async (id: string) => {
        const res = await axios.patch(`/cart/minusItem/${id}`);
        return res.data;
    });

export const fetchSetQuantityItem = createAsyncThunk(
    "cart/fetchSetQuantityItem",
    async (params: { quantity: number, cartItemId: string }) => {
        const res = await axios.patch(`/cart/setQuantity`, params);
        return res.data;
    });

export const fetchGetFullCart = createAsyncThunk(
    "cart/fetchGetFullCart",
    async () => {
        const res = await axios.get('/cart/getFull');
        return res.data;
    });

export const fetchGetCart = createAsyncThunk(
    "cart/fetchGetCart",
    async () => {
        const res = await axios.get('/cart');
        return res.data;
    });

export const fetchRemoveFromCart = createAsyncThunk(
    "cart/fetchRemoveFromCart",
    async (id: string) => {
        const res = await axios.delete(`/cart/${id}`);
        return res.data;
    });

export const fetchRemoveAllFromCart = createAsyncThunk(
    "cart/fetchRemoveAllFromCart",
    async () => {
        try {
            const res = await axios.delete(`/cart/removeAll`);
            return res.data;
        } catch (err) {
            toast.error(err.message)
        }
    });