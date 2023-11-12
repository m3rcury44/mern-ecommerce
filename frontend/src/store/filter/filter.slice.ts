import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IFilterState {
    currentPage: number
    sortByPrice: string
    sortByBrand: string[]
    searchByMinPrice: string
    searchByMaxPrice: string
}

const initialState: IFilterState = {
    currentPage: 1,
    sortByPrice: '',
    sortByBrand: [],
    searchByMinPrice: '0',
    searchByMaxPrice: '999999'
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload
        },
        setSortByPrice(state, action: PayloadAction<string>) {
            state.sortByPrice = action.payload
        },
        setSortByBrand(state, action: PayloadAction<string[]>) {
            state.sortByBrand = action.payload
        },
        setSearchByMinPrice(state, action: PayloadAction<string>) {
            state.searchByMinPrice = action.payload
        },
        setSearchByMaxPrice(state, action: PayloadAction<string>) {
            state.searchByMaxPrice = action.payload
        },
        setFilters(state, action) {
            state.currentPage = action.payload.currentPage
            state.sortByPrice = action.payload.sortByPrice
            state.sortByBrand = action.payload.sortByBrand
            state.searchByMinPrice = action.payload.searchByMinPrice
            state.searchByMaxPrice = action.payload.searchByMaxPrice
        }
    }
})

export const {
    setCurrentPage,
    setSortByPrice,
    setSortByBrand,
    setSearchByMinPrice,
    setSearchByMaxPrice,
    setFilters
} = filterSlice.actions

export default filterSlice.reducer