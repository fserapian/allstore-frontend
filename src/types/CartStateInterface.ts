import { CartItemInterface } from './CartItemInterface';

export interface CartStateInterface {
    cartItems: CartItemInterface[];
    itemsPrice: string;
    shippingPrice: string;
    taxPrice: string;
    totalPrice: string;
}
