import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CartStateInterface } from '../types/CartStateInterface';
import { CartItemInterface } from '../types/CartItemInterface';
import { ShippingAddressInterface } from '../types/ShippingAddressInterface';
import { updateCart } from '../utils/cartUtils';

const initialState: CartStateInterface = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart') as string)
    : {
        cartItems: [],
        itemsPrice: '',
        shippingPrice: '',
        taxPrice: '',
        totalPrice: '',
        shippingAddress: { address: '', city: '', postalCode: '', country: '' },
        paymentMethod: '',
    };

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

            return updateCart(state);
        },
        deleteFromCart: (state, action: PayloadAction<string>) => {
            state.cartItems = state.cartItems.filter((item) => item._id !== action.payload);
            return updateCart(state);
        },
        saveShippingAddress: (state, action: PayloadAction<ShippingAddressInterface>) => {
            state.shippingAddress = action.payload;
            return updateCart(state);
        },
        savePaymentMethod: (state, action: PayloadAction<string>) => {
            state.paymentMethod = action.payload;
            return updateCart(state);
        },
        clearCartItems: (state) => {
            state.cartItems = [];
            return updateCart(state);
        },
    },
});

export const {
    addToCart,
    deleteFromCart,
    saveShippingAddress,
    savePaymentMethod,
    clearCartItems,
} = cartSlice.actions;
export default cartSlice.reducer;
