import { apiSlice } from './apiSlice';
import { PRODUCTS_URL, UPLOAD_URL } from '../constants';
import { ProductInterface } from '../types/ProductInterface';

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<{ products: ProductInterface[], page: number, pages: number }, {
            pageNumber?: string
        }>({
            query: ({ pageNumber }) => ({
                url: PRODUCTS_URL,
                params: { pageNumber },
            }),
            providesTags: ['Product'],
            keepUnusedDataFor: 5,
        }),
        getProductDetails: builder.query<ProductInterface, string | undefined>({
            query: (id: string | undefined) => ({
                url: `${PRODUCTS_URL}/${id}`,
            }),
            providesTags: ['Product'],
            keepUnusedDataFor: 5,
        }),
        createProduct: builder.mutation<ProductInterface, void>({
            query: () => ({
                url: PRODUCTS_URL,
                method: 'POST',
            }),
            invalidatesTags: ['Product'],
        }),
        updateProduct: builder.mutation<ProductInterface, any>({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.productId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Product'],
        }),
        uploadProductImage: builder.mutation<any, any>({
            query: (data) => ({
                url: UPLOAD_URL,
                method: 'POST',
                body: data,
            }),
        }),
        deleteProduct: builder.mutation<{ message: string }, string | undefined>({
            query: (id: string | undefined) => ({
                url: `${PRODUCTS_URL}/${id}`,
                method: 'DELETE',
            }),
        }),
        createProductReview: builder.mutation<any, { productId?: string, rating: number, comment: string }>({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.productId}/reviews`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Product'],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductDetailsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useUploadProductImageMutation,
    useDeleteProductMutation,
    useCreateProductReviewMutation,
} = productsApiSlice;
