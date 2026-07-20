import { ProductItem } from "../../products/types/products.types";


export interface CartItem extends ProductItem {
    quantity: number;
}