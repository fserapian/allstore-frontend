import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartStateInterface } from '../types/CartStateInterface';
import { CartItemInterface } from '../types/CartItemInterface';

const initialState: CartStateInterface = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart') as string)
    : { cartItems: [], itemsPrice: '', shippingPrice: '', totalPrice: '' };

const addDecimals = (num: number): string => {
    return (Math.round(num * 100) / 100).toFixed(2);
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

            // Calculate items price
            state.itemsPrice = addDecimals(state.cartItems.reduce((acc: number, i: CartItemInterface) => acc + i.price * i.qty, 0));
            // Calculate shipping price (If order over $100 then it is free, otherwise it is $10)
            state.shippingPrice = addDecimals(Number(state.itemsPrice) > 100 ? 0 : 10);
            // Calculate tax price (15%)
            state.taxPrice = addDecimals(Number(state.itemsPrice) * 0.15);
            // Calculate total price
            state.totalPrice = (Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)).toFixed(2);

            localStorage.setItem('cart', JSON.stringify(state));
        },
    },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
