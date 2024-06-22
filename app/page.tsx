import { permanentRedirect } from "next/navigation"

const page = () => {
  return permanentRedirect("/threads")
}
export default page