import { ServerNavLink } from "@/app/_conts/nav-links"
import { cn } from "@/packages/ui/lib/utils"
import Link from "next/link"


type Props = ServerNavLink & { selected?: boolean }
const NavButton = ({ label, link, icon, selected = false }: Props) => {
  return (
    <Link
      key={link}
      href={link}
      className={cn(
        "px-2 py-1 rounded-md border text-xs cursor-pointer inline-flex gap-1 items-center",
        selected ? "text-background border-foreground bg-foreground" : "bg-background"
      )}
    >
      {icon && icon}
      {label}
    </Link>
  )
}
export { NavButton }
