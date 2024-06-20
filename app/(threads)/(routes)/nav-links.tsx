import { IconType } from "react-icons/lib";
import { PiBagSimpleDuotone, PiBracketsCurlyDuotone, PiThreadsLogoDuotone } from "react-icons/pi";

export type NavLink = {
  link: string
  label: string
  icon?: IconType
}

const nav_links: NavLink[] = [
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
]
export { nav_links };

