export type ProductType = {
  id: number;
  productName: string;
  slug: string;
  description: string;
  active: boolean;
  isFeatured: boolean;
  color: string;
  content?: string; // opcional por si no siempre viene
  category: {
    id: number;
    documentId: string;
    categoryName: string;
    slug: string;
  };
  material: {
    id: number;
    documentId: string;
    categoryName: string;
    slug: string;
  };
  measures: string;
  price: number;
  images: {
    id: number;
    url: string;
    name: string;
    mime: string;
    ext: string;
    width: number;
    height: number;
    size: number;
    provider: string;
    createdAt: string;
    updatedAt: string;
  }[];
};
