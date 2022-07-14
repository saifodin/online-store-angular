import { Product } from "./product.model";

export interface OrderProduct {
  quantity: number,
  product: Product,
}