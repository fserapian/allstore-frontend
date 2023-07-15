import { CartItemInterface } from './CartItemInterface';
import { ShippingAddressInterface } from './ShippingAddressInterface';

export interface CartStateInterface {
    cartItems: CartItemInterface[];
    itemsPrice: string;
    shippingPrice: string;
    taxPrice: string;
    totalPrice: string;
    shippingAddress: ShippingAddressInterface;
    paymentMethod: string;
}
