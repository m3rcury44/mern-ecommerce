import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IProduct} from "../../types/product.interface";
import {ICatalog} from "../../types/category.interface";

export const api = createApi({
    reducerPath: 'api',
    tagTypes: ["Product", "Profile"],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL
    }),
    endpoints: builder => ({
        getProduct: builder.query<IProduct, string>({
            query: (href) => `/products/getOne/${href}`,
            providesTags: ["Product"]
        }),
        filterProducts: builder.query<{
            products: IProduct[],
            category: ICatalog,
            filteredLength: number,
            categoryLength: number
        }, {
            currentPage: number;
            currentCategory: string;
            sortByPrice: string
            sortByBrand: string[]
            searchByMinPrice: string
            searchByMaxPrice: string
        }>({
            query: ({
                        currentPage,
                        currentCategory,
                        sortByPrice,
                        sortByBrand,
                        searchByMinPrice,
                        searchByMaxPrice
                    }) => {
                const brandQuery = Array.isArray(sortByBrand)
                    ? sortByBrand.map(brand => `&brand=${brand}`).join('')
                    : `&brand=${sortByBrand}`;

                return `/products/filters?category=${currentCategory}${brandQuery}&page=${currentPage}&searchByMinPrice=${searchByMinPrice}&searchByMaxPrice=${searchByMaxPrice}&sortByPrice=${sortByPrice}`
            },
            providesTags: ['Product'],
        })
    })
})

export const {
    useGetProductQuery,
    useFilterProductsQuery
} = api