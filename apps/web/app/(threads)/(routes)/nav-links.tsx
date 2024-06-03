import { IconType } from "react-icons/lib"
import { TbRouteSquare } from "react-icons/tb"



export type NavLink = {
  link: string
  label: string
  icon?: IconType
}

const nav_links: NavLink[] = [
  {
    label: "Services",
    link: "/services",
    icon: TbRouteSquare
  }
]
export { nav_links }
