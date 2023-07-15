import { apiSlice } from './apiSlice';
import { ORDERS_URL } from '../constants';
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
    }),
});

export const { useCreateOrderMutation } = ordersApiSlice;
