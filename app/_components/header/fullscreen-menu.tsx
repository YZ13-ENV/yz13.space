"use client"

import { createClient } from "@/packages/supabase/src/supabase/client"
import { Popover, PopoverContent, PopoverTrigger } from "@/packages/ui/src/components/popover"
import { Separator } from "@/packages/ui/src/components/separator"
import { User } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { LuCog, LuContact, LuLayoutGrid, LuLogOut } from "react-icons/lu"
import { TbMenu, TbX } from "react-icons/tb"

type Props = {
  user: User
}
const FullScreenMenu = ({ user }: Props) => {
  const [open, setOpen] = useState<boolean>(false)
  const metadata = user.user_metadata
  const name = metadata.name
  const email = metadata.email
  const router = useRouter()
  const signOut = async () => {
    const sp = createClient()
    sp.auth.signOut()
      .then(() => router.refresh())
  }
  return (
    <Popover defaultOpen open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="w-9 bg-background aspect-square rounded-full flex items-center justify-center border">
        {
          open
            ? <TbX size={16} />
            : <TbMenu size={16} />
        }
      </PopoverTrigger>
      <PopoverContent
        style={{ height: "calc(100dvh - 64px)" }}
        className="w-screen px-6 py-0 left-0 top-16 shadow-none border-none rounded-none bg-background"
      >
        <div className="flex flex-col py-4">
          <span className="text-lg">{name}</span>
          <span className="text-sm text-secondary">{email}</span>
        </div>
        <Separator />
        <div className="w-full flex flex-col py-4 gap-2">
          <button className="justify-between flex items-center gap-2 h-10">
            Dashboard
            <LuLayoutGrid size={18} />
          </button>
          <button className="justify-between flex items-center gap-2 h-10">
            Account settings
            <LuCog size={18} />
          </button>
        </div>
        <Separator />
        <div className="w-full py-4">
          <button className="w-full justify-between flex items-center gap-2 h-10">
            Contact
            <LuContact size={18} />
          </button>
        </div>
        <Separator />
        <div className="w-full py-4">
          <button onClick={signOut} className="w-full justify-between flex items-center gap-2 h-10">
            Log out
            <LuLogOut size={18} />
          </button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
export { FullScreenMenu }
