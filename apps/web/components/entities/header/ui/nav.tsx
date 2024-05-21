"use client"
import { links } from "@/const/nav-links"
import { cn } from "@repo/ui/cn"
import Link from "next/link"
import { usePathname } from "next/navigation"

type Props = {
  exclude?: string[]
}
const Nav = ({ exclude = [] }: Props) => {
  const pathname = usePathname()
  return (
    <>
      <nav className="flex items-center gap-2">
        {
          links
            .filter(link => !exclude.includes(link.value))
            .map(link =>
              <Link
                href={link.value}
                key={link.value}
                className={cn(
                  "px-2 py-1 rounded-lg text-sm inline-flex gap-2 items-center transition-colors",
                  pathname === link.value
                    ? "bg-foreground text-background"
                    : "bg-accents-2/50 hover:bg-accents-2 text-foreground/70"
                )}
              >
                {link.icon && link.icon({ size: 14 })}{link.label}
              </Link>
            )
        }
      </nav>
    </>
  )
}
export { Nav }
