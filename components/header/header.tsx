import { Locales } from "@/locales/server"
import { LogoHeader } from "./logo"
import { UserHeader } from "./user"
import { Button } from "@yz13/mono/components/button"
import { SearchIcon } from "lucide-react"
import Link from "next/link"

const Header = ({ lang = "en" }: { lang?: Locales }) => {
  return (
    <header className="flex h-12 lg:!px-6 px-3 max-w-7xl mx-auto w-full justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="w-9 flex justify-center items-center">
          <LogoHeader className="size-8" />
        </div>
        <span className="text-2xl text-foreground font-pixel">YZ13</span>
      </div>
      <div className="flex items-center h-9 gap-2">
        <Button size="icon" variant="ghost" asChild>
          <Link href="/inspiration/search">
            <SearchIcon size={16} />
          </Link>
        </Button>
        <UserHeader size={28} lang={lang} />
      </div>
    </header>
  )
}
export { Header }
