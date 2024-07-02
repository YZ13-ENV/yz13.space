import { Nav } from "@/app/_components/nav"
import { Locales } from "@/dictionaries/tools"
import { cn } from "@/packages/ui/lib/utils"

type HeaderProps = {
  className?: string
  lang?: Locales
}
const Header = async ({ className = "", lang }: HeaderProps) => {
  return (
    <header className={cn(
      "w-full min-h-16 sticky z-10 top-0 py-2 gap-4 flex items-center bg-background justify-start px-6",
      className
    )}>
      <Nav className="w-full overflow-x-auto flex-nowrap no-scrollbar" lang={lang} />
      {/* <User /> */}
    </header>
  )
}
export { Header }
