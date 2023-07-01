import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CartStateInterface } from '../types/CartStateInterface';
import { CartItemInterface } from '../types/CartItemInterface';
import { updateCart } from '../utils/cartUtils';

const initialState: CartStateInterface = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart') as string)
    : { cartItems: [], itemsPrice: '', shippingPrice: '', totalPrice: '' };

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItemInterface>) => {
            const item: CartItemInterface = action.payload;
            const existItem = state.cartItems.find((i: CartItemInterface) => i._id === item._id);

            if (existItem) {
                state.cartItems = state.cartItems.map((i: CartItemInterface) => i._id === existItem._id ? item : i);
            } else {
                state.cartItems = [...state.cartItems, item];
            }

            updateCart(state);
        },
        deleteFromCart: (state, action: PayloadAction<string>) => {
            state.cartItems = state.cartItems.filter((item) => item._id !== action.payload);
        },
    },
});

export const { addToCart, deleteFromCart } = cartSlice.actions;
export default cartSlice.reducer;
