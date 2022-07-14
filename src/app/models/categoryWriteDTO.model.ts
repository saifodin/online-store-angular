export interface CategoryWriteDTO {
  categoryID: string,
  name: string,
  description: string,
  parentCategoryID?: string,
}