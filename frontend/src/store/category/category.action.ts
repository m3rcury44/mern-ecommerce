import {createAsyncThunk} from "@reduxjs/toolkit";
import {ICatalog} from "../../types/category.interface";
import axios from "../../utils/axios";

export const getCategory = createAsyncThunk(
    "category/getCategory",
    async (_, thunkAPI) => {
        try {
            const res = await axios.get<ICatalog[]>('/category');
            return res.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    });

export const getMainPageCategories = createAsyncThunk(
    "category/getMainPageCategories",
    async (_, thunkAPI) => {
        try {
            const res = await axios.get<ICatalog[]>('/category/getMainCategories');
            return res.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    });

export const getCategoryPage = createAsyncThunk(
    "category/getCategoryPage",
    async (_, thunkAPI) => {
        try {
            const res = await axios.get<ICatalog[]>(`/category/getCategoryPage`);
            return res.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    });