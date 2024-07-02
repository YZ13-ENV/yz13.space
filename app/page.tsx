import { permanentRedirect } from "next/navigation"

const page = async () => {
  // const cks = cookies()
  // const sp = createClient(cks)
  // const { data: { user } } = await sp.auth.getUser()
  // const isLogged = !!user
  // const metadata = user?.user_metadata
  // const type = metadata ? metadata?.type : "user"
  // const isAdmin = type === "admin"
  return permanentRedirect("/home")
}
export default page