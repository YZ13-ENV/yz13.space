import { isDev } from "@/packages/api/src/const";
import { IconType } from "react-icons/lib";
import { PiBagSimpleDuotone, PiBracketsCurlyDuotone, PiCurrencyDollarDuotone, PiHouseSimpleDuotone, PiThreadsLogoDuotone } from "react-icons/pi";

export type NavLink = {
  link: string
  label: string
  icon?: IconType
}

const inDev = ["/works"]

const nav_links: NavLink[] = [
  {
    label: "Home",
    link: "/home",
    icon: PiHouseSimpleDuotone
  },
  {
    label: "Threads",
    link: "/threads",
    icon: PiThreadsLogoDuotone
  },
  {
    label: "Works",
    link: "/works",
    icon: PiBagSimpleDuotone
  },
  {
    label: "Pricing",
    link: "/pricing",
    icon: PiCurrencyDollarDuotone
  },
  {
    label: "Services",
    link: "/services",
    icon: PiBracketsCurlyDuotone
  },
  // {
  //   label: "Changelog",
  //   link: "/changelog",
  //   icon: MdOutlineHistory
  // },
  // {
  //   label: "Settings",
  //   link: "/settings",
  //   icon: BiCog
  // }
].filter(link => {
  if (isDev) return link
  return !inDev.includes(link.link)
})
export { nav_links };

