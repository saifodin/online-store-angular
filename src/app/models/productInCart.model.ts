import { Product } from "./product.model";

export interface ProductInCart {
  productId: string,
  customerId: string,
  quantity: number,
  product: Product
}