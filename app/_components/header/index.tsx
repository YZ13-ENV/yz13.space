import { createClient } from "@/packages/supabase/src/supabase/server"
import { cn } from "@/packages/ui/lib/utils"
import { Button } from "@/packages/ui/src/components/button"
import { Separator } from "@/packages/ui/src/components/separator"
import dynamic from "next/dynamic"
import { cookies } from "next/headers"
import Link from "next/link"
import { LuLayoutGrid } from "react-icons/lu"
import { Logo } from "../logo"
import { UserDropdown } from "../user/dropdown"
import { UserProfile } from "../user/user"
import { FullScreenMenu } from "./fullscreen-menu"
import { LangSelector } from "./lang-selector"
const Profile = dynamic(() => import("./profile"), {
  ssr: false
})

type HeaderProps = {
  className?: string
}
const Header = async ({ className = "" }: HeaderProps) => {
  const cks = cookies()
  const locale = (cks.get("locale")?.value || "").slice(0, 2)
  const localeCode = locale.toUpperCase()
  const sp = createClient(cks)
  const { data: { user } } = await sp.auth.getUser()
  const metadata = user?.user_metadata
  const type = metadata?.type || "user"
  const isAdmin = type === "admin"
  const isLogged = !!user
  return (
    <header className={cn("w-full h-16 md:bg-transparent bg-background z-10", className)}>
      <div className="z-10 flex items-center justify-between w-full h-full px-6 mx-auto max-w-screen-2xl">
        <div className="flex items-center gap-6">
          <Link href="/">
            <Logo size={42} lang={localeCode} withTitle />
          </Link>
          {/* <NavMenu className="hidden md:flex" /> */}
        </div>
        <div className="z-10 flex items-center gap-3">
          <div className="gap-3 md:flex hidden items-center">
            <Button size="sm" variant="outline">
              <Link href="/contact">
                Contact
              </Link>
            </Button>
            {
              !isLogged &&
              <LangSelector defaultLocale={locale} />
            }
            <Separator orientation="vertical" className="h-8" />
          </div>
          {
            isLogged
              ?
              <>
                <div className="flex divide-x">
                  <LangSelector defaultLocale={locale} className={isAdmin ? "rounded-r-none" : ""} />
                  {
                    isAdmin &&
                    <Button size="sm" variant="outline" className="gap-2 !border-r rounded-l-none" asChild>
                      <Link href="/dashboard">
                        <LuLayoutGrid size={16} />
                        <span className="md:inline hidden">Dashboard</span>
                      </Link>
                    </Button>
                  }
                </div>
                <Profile
                  desktop={
                    <UserDropdown user={user}>
                      <UserProfile user={user} />
                    </UserDropdown>
                  }
                  mobile={<FullScreenMenu user={user} />}
                />
              </>
              :
              <>
                <Button size="sm" variant="outline" asChild>
                  <Link href="/login">
                    Login
                  </Link>
                </Button>
                <Button className="hidden md:flex" size="sm" variant="default" asChild>
                  <Link href="/login">
                    Sign up for free
                  </Link>
                </Button>
              </>
          }
        </div>
      </div>
    </header>
  )
}
export { Header }
