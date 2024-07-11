import { LuFileJson, LuLayoutTemplate, LuPalette } from "react-icons/lu";
import { ProductsSection } from "./types";



export const apps: ProductsSection = {
  name: "Apps",
  category: "apps",
  products: [
    {
      name: "JSON Store",
      category: "apps",
      description: "Store that contain data in json",
      icon: LuFileJson,
      status: "in-beta"
    },
    {
      name: "Templates",
      category: "apps",
      description: "Our collection of templates",
      icon: LuLayoutTemplate,
      status: "in-dev"
    },
    {
      name: "Colors",
      category: "apps",
      description: "Generate your own color palettes",
      icon: LuPalette,
      status: "in-plans"
    }
  ]
}