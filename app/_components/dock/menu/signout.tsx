"use client"

import { createClient } from "@/packages/supabase/src/supabase/client"
import { Button } from "@/packages/ui/src/components/button"
import { CommandItem } from "@/packages/ui/src/components/command"
import { useRouter } from "next/navigation"
import { ReactNode } from "react"
import { LuLogOut } from "react-icons/lu"

type Props = {
  children?: ReactNode
}
const SignOut = ({ children }: Props) => {
  const router = useRouter()
  const sp = createClient()
  const getSignOut = async () => {
    await sp.auth.signOut()
    router.refresh()
  }
  return (
    <CommandItem className="hover:bg-yz-neutral-50 rounded-lg cursor-pointer" asChild>
      <Button onClick={() => {
        console.log("sign-out")
        getSignOut()
      }} variant="ghost" className="w-full">
        <LuLogOut className="mr-2 h-4 w-4" />
        {children}
      </Button>
    </CommandItem>
  )
}
export { SignOut }
