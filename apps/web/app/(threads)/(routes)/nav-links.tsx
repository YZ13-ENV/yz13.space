import { BiCog } from "react-icons/bi"
import { IconType } from "react-icons/lib"
import { MdOutlineHistory } from "react-icons/md"
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
  },
  {
    label: "Changelog",
    link: "/changelog",
    icon: MdOutlineHistory
  },
  {
    label: "Settings",
    link: "/settings",
    icon: BiCog
  }
]
export { nav_links }
