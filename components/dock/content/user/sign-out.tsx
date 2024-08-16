"use client"
import { Button } from "@yz13/mono/components/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@yz13/mono/components/tooltip"
import { useRouter } from "next/navigation"
import { LuLogOut } from "react-icons/lu"
import { createClient } from "yz13/supabase/client"

const SignOut = ({ tooltip }: { tooltip?: string }) => {
  const router = useRouter()
  const sp = createClient()
  const getSignOut = async () => {
    await sp.auth.signOut()
    router.refresh()
  }
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={getSignOut}
          variant="outline"
          className="w-1/2"
        >
          <LuLogOut size={16} />
        </Button>
      </TooltipTrigger>
      <TooltipContent className="border">{tooltip}</TooltipContent>
    </Tooltip>
  )
}
export { SignOut }
