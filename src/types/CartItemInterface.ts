import { ProductInterface } from './ProductInterface';

export interface CartItemInterface extends ProductInterface {
    qty: number;
}
