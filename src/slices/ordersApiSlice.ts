import { apiSlice } from './apiSlice';
import { ORDERS_URL, PAYPAL_URL } from '../constants';
import { OrderInterface } from '../types/OrderInterface';

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation<OrderInterface, OrderInterface>({
            query: (order: OrderInterface) => ({
                url: ORDERS_URL,
                method: 'POST',
                body: order,
            }),
        }),
        getOrderDetails: builder.query<OrderInterface, string | undefined>({
            query: (id: string | undefined) => ({
                url: `${ORDERS_URL}/${id}`,
            }),
            keepUnusedDataFor: 5,
        }),
        payOrder: builder.mutation<OrderInterface, any>({
            query: ({ orderId, details }) => ({
                url: `${ORDERS_URL}/${orderId}/pay`,
                method: 'PUT',
                body: { ...details },
            }),
        }),
        getPayPalClientId: builder.query<{ clientId: string }, void>({
            query: () => ({
                url: PAYPAL_URL,
            }),
            keepUnusedDataFor: 5,
        }),
        getMyOrders: builder.query<OrderInterface[], void>({
            query: () => ({
                url: `${ORDERS_URL}/mine`,
            }),
        }),
        getOrders: builder.query<OrderInterface[], void>({
            query: () => ({
                url: ORDERS_URL,
            }),
        }),
        deliverOrder: builder.mutation<OrderInterface, string | undefined>({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}/deliver`,
                method: 'PUT',
            }),
        }),
    }),
});

export const {
    useCreateOrderMutation,
    useGetOrderDetailsQuery,
    usePayOrderMutation,
    useGetPayPalClientIdQuery,
    useGetMyOrdersQuery,
    useGetOrdersQuery,
    useDeliverOrderMutation,
} = ordersApiSlice;
