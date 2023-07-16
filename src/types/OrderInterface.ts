import { ShippingAddressInterface } from './ShippingAddressInterface';
import { CartItemInterface } from './CartItemInterface';

export interface OrderInterface {
    _id?: string;
    orderItems: CartItemInterface[];
    shippingAddress: ShippingAddressInterface;
    paymentMethod: string;
    paymentResult?: string;
    itemsPrice: string;
    shippingPrice: string;
    taxPrice: string;
    totalPrice: string;
}
