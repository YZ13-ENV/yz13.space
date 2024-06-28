import { createClient } from "@/packages/supabase/src/supabase/server"
import { cookies } from "next/headers"
import { UserDropdown } from "../user/dropdown"
import { UserProfile } from "../user/user"
import { FullScreenMenu } from "./fullscreen-menu"
import Profile from "./profile"

const User = async () => {
  const cks = cookies()
  const sp = createClient(cks)
  // const locale = getLocale()
  // const auth_button = await getDict<{ login: string, signup: string }>("auth-buttons", locale)
  const { data: { user } } = await sp.auth.getUser()
  if (!user) return null
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
