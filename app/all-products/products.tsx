import { IconType } from "react-icons/lib"
import { LuCircleDollarSign, LuPencil, LuShoppingCart } from "react-icons/lu"

type ProductStatus = "in-dev" | "in-plans" | "in-beta" | "public"

export type Product = {
  category: string
  status: ProductStatus
  icon: IconType
  name: string
  description: string
}

export type ProductsSection = {
  name: string
  category: string
  products: Product[]
}

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