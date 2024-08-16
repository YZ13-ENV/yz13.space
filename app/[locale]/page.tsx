import { permanentRedirect } from "next/navigation"

const page = () => {
  return permanentRedirect("/home")
}
export default page