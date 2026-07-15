import { ProductItem } from "./products.types";


export interface CartItem extends ProductItem {
    quantity: number;
}