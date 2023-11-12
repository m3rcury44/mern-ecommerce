import {createSlice} from '@reduxjs/toolkit';
import {fetchSearchQuery} from "./search.action";
import {IProduct} from "../../types/product.interface";

interface SearchState {
    data: IProduct[] | null,
    status: string
}

const initialState: SearchState = {
    data: null,
    status: ''
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchSearchQuery.pending, state => {
                state.status = 'loading'
            })
            .addCase(fetchSearchQuery.fulfilled, (state, action) => {
                state.status = 'loaded'
                state.data = action.payload
            })
            .addCase(fetchSearchQuery.rejected, state => {
                state.status = 'error'
            })
    }
});

export default searchSlice.reducer;
