import { LuCircleDollarSign, LuPencil, LuShoppingCart } from "react-icons/lu"
import { ProductsSection } from "./types"



export const platform: ProductsSection = {
  name: "Platform",
  category: "platform",
  products: [
    {
      status: "in-plans",
      icon: LuPencil,
      name: "Blog",
      category: "platform",
      description: "Start you own blog with template"
    },
    {
      status: "in-plans",
      icon: LuShoppingCart,
      name: "Ecommerce",
      category: "platform",
      description: "Explore ecommerce template"
    },
    {
      status: "in-plans",
      icon: LuCircleDollarSign,
      name: "Pricing",
      category: "platform",
      description: "Pricing, plans, and spend management"
    }
  ]
}