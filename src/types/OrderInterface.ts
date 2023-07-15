import { OrderItemInterface } from './OrderItemInterface';
import { ShippingAddressInterface } from './ShippingAddressInterface';

export interface OrderInterface {
    orderItems: OrderItemInterface[];
    shippingAddress: ShippingAddressInterface;
    paymentMethod: string;
    paymentResult?: string;
    itemsPrice: number;
    taxPrice: string;
    shippingPrice: string;
    totalPrice: string;
}
