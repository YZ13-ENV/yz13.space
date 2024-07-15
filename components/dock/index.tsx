import { Locales } from "@/dictionaries/tools"
import { createClient } from "@/packages/supabase/src/supabase/server"
import { cookies } from "next/headers"
import { LuMenu } from "react-icons/lu"
import { Contacts } from "./ui/section/contacts"
import { Menu } from "./ui/section/menu"
import { User } from "./ui/section/user"
import { Trigger } from "./ui/trigger"
import { DockWrapper } from "./ui/wrapper"

const Dock = async ({ lang = "en" }: { lang?: Locales }) => {
  const cks = cookies()
  const sp = createClient(cks)
  const { data: { user } } = await sp.auth.getUser()
  const metadata = user?.user_metadata
  const isAdmin = (metadata?.type || "user") === "admin"
  return (
    <DockWrapper>
      <Trigger className="lg:w-80 w-screen" content={<Menu />}>
        <LuMenu size={16} />
      </Trigger>
      <Contacts />
      <Trigger>
        <User />
      </Trigger>
    </DockWrapper>
  )
}
export { Dock }
