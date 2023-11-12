import {createSlice} from "@reduxjs/toolkit";
import {
    fetchAddToFavorites,
    fetchGetFavorites,
    fetchGetFullFavorites,
    fetchRemoveFromFavorites
} from "./favorites.action";
import {IFavorites} from "../../types/favorites.interface";
import {RootState} from "../store";

interface IFavoritesState {
    data: IFavorites[]
    status: string
}

const initialState: IFavoritesState = {
    data: [],
    status: 'loading'
}

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchAddToFavorites.pending, state => {
                state.status = 'loading'
            })
            .addCase(fetchAddToFavorites.fulfilled, (state, action) => {
                state.status = 'loaded'
                state.data = action.payload
            })
            .addCase(fetchAddToFavorites.rejected, state => {
                state.status = 'error'
            })
            .addCase(fetchGetFullFavorites.pending, state => {
                state.status = 'loading'
            })
            .addCase(fetchGetFullFavorites.fulfilled, (state, action) => {
                state.status = 'loaded'
                state.data = action.payload
            })
            .addCase(fetchGetFullFavorites.rejected, state => {
                state.status = 'error'
            })
            .addCase(fetchGetFavorites.pending, state => {
                state.status = 'loading'
            })
            .addCase(fetchGetFavorites.fulfilled, (state, action) => {
                state.data = action.payload
            })
            .addCase(fetchGetFavorites.rejected, state => {
                state.status = 'error'
            })
            .addCase(fetchRemoveFromFavorites.pending, (state, action) => {
                if (state.data) {
                    state.data = state.data.filter(obj => obj.productId !== action.meta.arg)
                }
            })
    }
})

export const isInFavorites = ({state, id}: {
    state: RootState,
    id: string
}) => state.favorites.data.find(item => item.productId === id)

export default favoritesSlice.reducer