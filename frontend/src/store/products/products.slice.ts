import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IProduct} from "../../types/product.interface";
import {getMainPageProducts, getRcmdItems} from "./products.action";

interface IProductsState {
    list: IProduct[];
    rcmdList: IProduct[];
    isLoading: boolean;
    error: string
}

const initialState: IProductsState = {
    list: [],
    rcmdList: [],
    isLoading: true,
    error: ''
};


const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMainPageProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMainPageProducts.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
                state.isLoading = false;
                state.list = action.payload;
            })
            .addCase(getMainPageProducts.rejected, (state, action: any) => {
                state.isLoading = false;
                state.error = action.payload
            })
            .addCase(getRcmdItems.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getRcmdItems.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
                state.isLoading = false;
                state.rcmdList = action.payload;
            })
            .addCase(getRcmdItems.rejected, (state, action: any) => {
                state.isLoading = false;
                state.error = action.payload
            })
    },
});
export default productsSlice.reducer;


