export interface CategoryDto {
  id: string;
  name: string;
  nameRu: string | null;
  nameRo: string | null;
  slug: string;
  imageUrl: string | null;
  parentId: string | null;
}
