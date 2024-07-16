import { permanentRedirect } from "next/navigation"

const page = () => {
  return permanentRedirect("/journal")
}
export default page