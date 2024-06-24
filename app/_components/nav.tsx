"use client"
import { cn } from "@/packages/ui/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { nav_links } from "../_conts/nav-links"

type NavProps = {
  className?: string
}
const Nav = ({ className = "" }: NavProps) => {
  const pathname = usePathname()
  return (
    <nav className={cn(
      "w-full flex flex-wrap gap-2 items-start",
      className
    )}>
      {
        nav_links.map(nav => {
          const isMatch = nav.link === pathname
          return <Link
            key={nav.link}
            href={nav.link}
            className={cn(
              "px-2 py-1 rounded-md border text-xs cursor-pointer inline-flex gap-1 items-center",
              isMatch ? "text-background border-foreground bg-foreground" : "bg-background"
            )}
          >
            {nav.icon && nav.icon({ size: 14 })}
            {nav.label}
          </Link>
        }
        )
      }
    </nav>
  )
}
export { Nav }
