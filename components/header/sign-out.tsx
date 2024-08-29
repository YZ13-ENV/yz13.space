"use client"

import { Button } from "@yz13/mono/components/button"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { createClient } from "yz13/supabase/client"

type Props = {
  children?: string
}

const SignOutButton = ({ children = "" }: Props) => {
  const router = useRouter()
  const sp = createClient()
  const getSignOut = async () => {
    await sp.auth.signOut()
    router.refresh()
  }
  return (
    <Button
      onClick={getSignOut}
      className="w-full rounded-lg gap-2" size="sm" variant="secondary"
    >
      <LogOut size={14} />
      {children}
    </Button>
  )
}
export { SignOutButton }
