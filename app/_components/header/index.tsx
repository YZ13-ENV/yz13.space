import { Nav } from "@/app/_components/nav"
import { cn } from "@/packages/ui/lib/utils"
import { User } from "./user-profile"

type HeaderProps = {
  className?: string
}
const Header = async ({ className = "" }: HeaderProps) => {
  return (
    <header className={cn(
      "w-full min-h-16 sticky top-0 py-2 gap-4 flex items-center bg-background justify-between px-6",
      className
    )}>
      <Nav className="w-full overflow-x-auto flex-nowrap no-scrollbar" />
      <User />
    </header>
  )
}
export { Header }
