import { ShippingAddressInterface } from './ShippingAddressInterface';
// import { CartItemInterface } from './CartItemInterface';
import { OrderItemInterface } from './OrderItemInterface';
import { UserInfoInterface } from './UserInfoInterface';

export interface OrderInterface {
    _id?: string;
    orderItems: OrderItemInterface[];
    shippingAddress: ShippingAddressInterface;
    paymentMethod: string;
    paymentResult?: string;
    itemsPrice: string;
    shippingPrice: string;
    taxPrice: string;
    totalPrice: string;
    user?: UserInfoInterface;
    isDelivered?: boolean,
    deliveredAt?: string,
    isPaid?: boolean,
    paidAt?: string,
    createdAt?: string,
    updatedAt?: string,
}
