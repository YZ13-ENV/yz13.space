"use client"
import { links } from "@/const/nav-links"
import { Button } from "@repo/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import posthog from "posthog-js"

const Nav = () => {
  const pathname = usePathname()
  return (
    <>
      <nav className="rounded-full flex border items-center bg-secondary/50 backdrop-blur-sm">
        {
          links.map(link =>
            <Button
              key={link.value}
              asChild
              variant={link.value === pathname ? "default" : "ghost"}
              className="gap-2"
            >
              <Link
                href={link.value}
                onClick={() => {
                  posthog.capture('navigate', { path: link.value })
                }}
              >
                {link.icon && link.icon}
                <span className="md:inline hidden text-inherit">
                  {link.label}
                </span>
              </Link>
            </Button>
          )
        }
      </nav>
    </>
  )
}
export { Nav }
