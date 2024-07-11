import { LuFileJson } from "react-icons/lu";
import { ProductsSection } from "./types";



export const storage: ProductsSection = {
  name: "Storage",
  category: "storage",
  products: [
    {
      name: "JSON Store",
      category: "apps",
      description: "NPM-package that provide access to JSON Store",
      icon: LuFileJson,
      status: "in-beta"
    }
  ]
}