import { CategoryChild } from "./categoryChild.model";

export interface Category {
  categoryID: string,
  name: string,
  description: string,
  parentCategoryID?: string,
  parentCategory: CategoryChild
}