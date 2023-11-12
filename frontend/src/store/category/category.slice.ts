import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICatalog} from "../../types/category.interface";
import {getCategory, getCategoryPage, getMainPageCategories} from "./category.action";

interface CatalogState {
    list: ICatalog[];
    isLoading: boolean;
    error: string
}

const initialState: CatalogState = {
    list: [],
    isLoading: false,
    error: '',
};


const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCategory.fulfilled, (state, action: PayloadAction<ICatalog[]>) => {
                state.isLoading = false;
                state.list = action.payload;
            })
            .addCase(getCategory.rejected, (state, action: any) => {
                state.isLoading = false;
                state.error = action.payload
            })
            .addCase(getMainPageCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMainPageCategories.fulfilled, (state, action: PayloadAction<ICatalog[]>) => {
                state.isLoading = false;
                state.list = action.payload;
            })
            .addCase(getMainPageCategories.rejected, (state, action: any) => {
                state.isLoading = false;
                state.error = action.payload
            })
            .addCase(getCategoryPage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCategoryPage.fulfilled, (state, action: PayloadAction<ICatalog[]>) => {
                state.isLoading = false;
                state.list = action.payload;
            })
            .addCase(getCategoryPage.rejected, (state, action: any) => {
                state.isLoading = false;
                state.error = action.payload
            })
    },
});

export default categorySlice.reducer;


