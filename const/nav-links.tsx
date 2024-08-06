import { IconType } from "react-icons/lib";
import { PiBagSimpleDuotone, PiBookBookmarkDuotone, PiHouseSimpleDuotone } from "react-icons/pi";

const isDev = process.env.NODE_ENV === "development"

export type NavLink = {
  link: string
  label: string
  icon?: IconType
}
export type ServerNavLink = Omit<NavLink, "icon"> & { icon?: JSX.Element | undefined }

const inDev: string[] = []

const nav_links: NavLink[] = [
  {
    label: "Home",
    link: "/home",
    icon: PiHouseSimpleDuotone
  },
  {
    label: "Journal",
    link: "/journal",
    icon: PiBookBookmarkDuotone
  },
  {
    label: "Works",
    link: "/works",
    icon: PiBagSimpleDuotone
  }
].filter(link => {
  if (isDev) return link
  return !inDev.includes(link.link)
})



export { nav_links };

