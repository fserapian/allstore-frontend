import { apiSlice } from './apiSlice';
import { PRODUCTS_URL } from '../constants';
import { ProductInterface } from '../types/ProductInterface';

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<ProductInterface[], void>({
            query: () => ({
                url: PRODUCTS_URL,
            }),
            keepUnusedDataFor: 5,
        }),
    }),
});

export const { useGetProductsQuery } = productsApiSlice;