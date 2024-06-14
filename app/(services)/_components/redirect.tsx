import { redirect } from "next/navigation"

type Props = {
  href: string
}
const Redirect = ({ href }: Props) => {
  return redirect(href)
}
export { Redirect }
