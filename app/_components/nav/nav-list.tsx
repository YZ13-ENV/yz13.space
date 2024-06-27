"use client"
import { ServerNavLink } from "@/app/_conts/nav-links"
import { usePathname } from "next/navigation"
import { NavButton } from "./nav-button"

type Props = {
  list?: ServerNavLink[]
}
const NavList = ({ list = [] }: Props) => {
  const pathname = usePathname()
  return (
    <>
      {
        list
          .map(nav => {
            const isMatch = nav.link === pathname
            return <NavButton key={nav.link} selected={isMatch} {...nav} />
          })
      }
    </>
  )
}
export { NavList }
