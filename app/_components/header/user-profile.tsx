import { createClient } from "@/packages/supabase/src/supabase/server"
import { Button } from "@/packages/ui/src/components/button"
import { cookies } from "next/headers"
import Link from "next/link"
import { UserDropdown } from "../user/dropdown"
import { UserProfile } from "../user/user"
import { FullScreenMenu } from "./fullscreen-menu"
import Profile from "./profile"

const User = async () => {
  const cks = cookies()
  const sp = createClient(cks)
  const { data: { user } } = await sp.auth.getUser()
  if (!user) {
    return (
      <div className="flex items-center gap-2">
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
      </div>
    )
  }
  return (
    <Profile
      desktop={
        <UserDropdown user={user}>
          <UserProfile user={user} />
        </UserDropdown>
      }
      mobile={<FullScreenMenu user={user} />}
    />
  )
}
export { User }
