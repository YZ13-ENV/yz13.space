import { NewThreadForm } from "@/app/(threads)/_components/new-thread/form"
import { Locales } from "@/dictionaries/tools"
import { showFilesPage } from "@/feature-flags/files.feature"
import { createClient } from "@/packages/supabase/src/supabase/server"
import { cookies } from "next/headers"
import Link from "next/link"
import { BsThreads } from "react-icons/bs"
import { LuMenu } from "react-icons/lu"
import { MdOutlineFolder } from "react-icons/md"
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
  const files = await showFilesPage();
  return (
    <DockWrapper>
      <Trigger className="lg:w-80 w-screen" content={<Menu />}>
        <LuMenu size={16} />
      </Trigger>
      {
        files &&
        <Trigger asChild>
          <Link href="/files">
            <MdOutlineFolder size={16} />
          </Link>
        </Trigger>
      }
      <Contacts />
      {
        (user && isAdmin) &&
        <Trigger content={
          <div className="max-w-xl border w-full rounded-2xl max-h-full bg-background h-fit">
            <NewThreadForm user={user} />
          </div>
        }>
          <BsThreads size={16} />
        </Trigger>
      }
      <Trigger>
        <User />
      </Trigger>
    </DockWrapper>
  )
}
export { Dock }
