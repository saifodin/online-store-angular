import { CategoryChild } from "./categoryChild.model";
import { Vendor } from "./vendorChild.model";

export interface Product {
  productID: string;
  name: string;
  arabicName: string;
  description: string;
  price: number;
  quantity: number;
  category: CategoryChild;
  vendor: Vendor;
  imagePath: string;
}

