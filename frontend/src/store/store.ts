import {combineReducers, configureStore} from "@reduxjs/toolkit";
import categorySlice from "./category/category.slice";
import productsSlice from "./products/products.slice";
import {api} from "./api/api";
import searchSlice from "./search/search.slice";
import filterSlice from "./filter/filter.slice";
import cartSlice from "./cart/cart.slice";
import favoritesSlice from "./favorites/favorites.slice";
import authSlice from "./auth/auth.slice";
import purchaseSlice from "./purchase/purchase.slice";
import reviewsSlice from "./reviews/reviews.slice";

const rootReducer = combineReducers({
    category: categorySlice,
    products: productsSlice,
    reviews: reviewsSlice,
    search: searchSlice,
    filter: filterSlice,
    cart: cartSlice,
    favorites: favoritesSlice,
    auth: authSlice,
    purchase: purchaseSlice,
    [api.reducerPath]: api.reducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
