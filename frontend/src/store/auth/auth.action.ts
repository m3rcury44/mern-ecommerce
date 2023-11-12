import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import {IUser} from "../../types/user.interface";

export const fetchLogin = createAsyncThunk(
    "auth/fetchLogin",
    async (params: { name: string; password: string; }) => {
        const res = await axios.post('/auth/login', params);
        return res.data;
    });

export const fetchLoginMe = createAsyncThunk(
    "auth/fetchLoginMe",
    async () => {
        const res = await axios.get<IUser>('/auth/me');
        return res.data;
    });

export const fetchRegister = createAsyncThunk(
    "auth/fetchRegister",
    async (params: { name: string; password: string; passwordAgain: string; }) => {
        const res = await axios.post('/auth/register', params);
        return res.data;
    });

export const fetchUploadImage = createAsyncThunk(
    "auth/fetchUploadImage",
    async (params: FormData) => {
        const res = await axios.patch('/auth/uploadImage', params);
        return res.data;
    });