import { IconType } from "react-icons/lib";

export type ProductStatus = "in-dev" | "in-plans" | "in-beta" | "public";

export type Product = {
  category: string;
  status: ProductStatus;
  icon: IconType;
  name: string;
  description: string;
};

export type ProductsSection = {
  name: string;
  category: string;
  products: Product[];
};
