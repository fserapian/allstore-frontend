import { CartItemInterface } from '../types/CartItemInterface';
import { CartStateInterface } from '../types/CartStateInterface';

export const addDecimals = (num: number): string => {
    return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state: CartStateInterface) => {
    // Calculate items price
    state.itemsPrice = addDecimals(state.cartItems.reduce((acc: number, i: CartItemInterface) => acc + i.price * i.qty, 0));
    // Calculate shipping price (If order over $100 then it is free, otherwise it is $10)
    state.shippingPrice = addDecimals(Number(state.itemsPrice) > 100 ? 0 : 10);
    // Calculate tax price (15%)
    state.taxPrice = addDecimals(Number(state.itemsPrice) * 0.15);
    // Calculate total price
    state.totalPrice = (Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)).toFixed(2);

    localStorage.setItem('cart', JSON.stringify(state));

    return state;
}
