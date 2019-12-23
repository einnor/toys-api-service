import { Brands, Categories } from '..';

export type Details = {
  id: string;
  brand: Brands.Details;
  model: string;
  category: Categories.Details;
  description: string;
  price: number;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
};
