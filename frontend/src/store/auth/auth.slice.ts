import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchLogin, fetchLoginMe, fetchRegister, fetchUploadImage} from "./auth.action";
import {IUser} from "../../types/user.interface";
import {RootState} from "../store";

interface UserState {
    data: null | IUser;
    isLoading: boolean;
    error: string
}

const initialState: UserState = {
    data: null,
    isLoading: true,
    error: '',
};

const authSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        logout(state) {
            state.data = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogin.pending, (state) => {
                state.isLoading = true;
                state.data = null;
            })
            .addCase(fetchLogin.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchLogin.rejected, (state) => {
                state.isLoading = false;
                state.error = 'Something went wrong'
            })
            .addCase(fetchLoginMe.pending, (state) => {
                state.isLoading = true;
                state.data = null;
            })
            .addCase(fetchLoginMe.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchLoginMe.rejected, (state) => {
                state.isLoading = false;
                state.error = 'Something went wrong'
            })
            .addCase(fetchRegister.pending, (state) => {
                state.isLoading = true;
                state.data = null;
            })
            .addCase(fetchRegister.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchRegister.rejected, (state) => {
                state.isLoading = false;
                state.error = 'Something went wrong'
            })
            .addCase(fetchUploadImage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchUploadImage.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchUploadImage.rejected, (state) => {
                state.isLoading = false;
                state.error = 'Something went wrong'
            })
    },
});

export const selectIsAuth = (state: RootState) => Boolean(state.auth.data)

export const {logout} = authSlice.actions

export default authSlice.reducer;


