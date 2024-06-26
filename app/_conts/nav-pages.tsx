import { BiHomeAlt2 } from "react-icons/bi"
import { IconType } from "react-icons/lib"
import { PiBagSimpleDuotone, PiGlobeSimpleDuotone, PiLayoutDuotone } from "react-icons/pi"

export type NavGroupLink = {
  type: "group"
  label: string
  items: NavSingleLink[]
}

export type NavSingleLink = {
  type: "single"
  label: string
  value: string
  icon: IconType
}
export type NavLink = NavGroupLink | NavSingleLink
export type NavLayout = {
  layout: string[]
  nav: NavLink[]
}

const default_nav: NavLink[] = [
  {
    type: "single",
    label: "Home",
    icon: BiHomeAlt2,
    value: "/home"
  },
  {
    type: "group",
    label: "Overview",
    items: [
      {
        type: "single",
        label: "Works",
        value: "/works",
        icon: PiBagSimpleDuotone
      },
      {
        type: "single",
        label: "Templates",
        value: "/templates",
        icon: PiLayoutDuotone
      }
    ]
  },
  {
    type: "group",
    label: "Services",
    items: [
      {
        type: "single",
        label: "Websites",
        icon: PiGlobeSimpleDuotone,
        value: "/pricing"
      },
      {
        type: "single",
        label: "Pages",
        icon: PiGlobeSimpleDuotone,
        value: "/pricing"
      },
      {
        type: "single",
        label: "Components",
        icon: PiGlobeSimpleDuotone,
        value: "/pricing"
      }
    ]
  },
  // {
  //   type: "single",
  //   label: "Pricing",
  //   icon: PiMoneyWavyDuotone,
  //   value: "/pricing"
  // }
]

const default_layout: NavLayout = {
  layout: ["/home"],
  nav: default_nav
}

const layouts: NavLayout[] = [default_layout]

const getLayoutNav = (path: string) => {
  return layouts.find(({ layout }) => layout.includes(path)) || default_layout
}
export { getLayoutNav }
