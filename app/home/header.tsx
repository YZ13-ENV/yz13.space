import { createClient } from "@/packages/supabase/src/supabase/server"
import { cn } from "@/packages/ui/lib/utils"
import { Button } from "@/packages/ui/src/components/button"
import { Separator } from "@/packages/ui/src/components/separator"
import { cookies } from "next/headers"
import Link from "next/link"
import { LuGlobe, LuLayoutGrid } from "react-icons/lu"
import { Logo } from "../_components/logo"
import { UserDropdown } from "../_components/user/dropdown"
import { UserProfile } from "../_components/user/user"
import { NavMenu } from "./nav-menu"

type HeaderProps = {
  className?: string
}
const Header = async ({ className = "" }: HeaderProps) => {
  const cks = cookies()
  const locale = (cks.get("locale")?.value || "").slice(0, 2)
  const localeCode = locale.toUpperCase()
  const sp = createClient(cks)
  const { data: { user } } = await sp.auth.getUser()
  const isLogged = !!user
  return (
    <header className={cn("w-full h-16", className)}>
      <div className="z-10 flex items-center justify-between w-full h-full px-6 mx-auto max-w-screen-2xl">
        <div className="flex items-center gap-6">
          <Link href="/">
            <Logo size={42} lang={localeCode} withTitle />
          </Link>
          <NavMenu className="hidden md:flex" />
        </div>
        <div className="z-10 flex items-center gap-3">
          <Button disabled size="sm" variant="outline">Contact</Button>
          <Separator orientation="vertical" className="h-8" />
          {
            isLogged
              ?
              <>
                <div className="flex divide-x">
                  <Button size="sm" variant="outline" className="gap-2 rounded-r-none">
                    <LuGlobe size={16} />
                    {locale}
                  </Button>
                  <Button size="sm" variant="outline" className="gap-2 !border-r rounded-l-none" asChild>
                    <Link href="/dashboard">
                      <LuLayoutGrid size={16} />
                      Dashboard
                    </Link>
                  </Button>
                </div>
                <UserDropdown user={user}>
                  <UserProfile user={user} />
                </UserDropdown>
              </>
              :
              <>
                <Button size="sm" variant="outline">Login</Button>
                <Button className="hidden md:flex" size="sm" variant="default">Sign up for free</Button>
              </>
          }
        </div>
      </div>
    </header>
  )
}
export { Header }
