"use client"
import { Button } from "@yz13/mono/components/button"
import { CommandItem } from "@yz13/mono/components/command"
import { useRouter } from "next/navigation"
import { ReactNode } from "react"
import { LuLogOut } from "react-icons/lu"
import { createClient } from "yz13/supabase/client"

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
    <CommandItem className="hover:bg-yz-neutral-100 rounded-lg justify-start font-normal cursor-pointer" asChild>
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
