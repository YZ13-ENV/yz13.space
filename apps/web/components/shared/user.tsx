import { user as user_api } from "@/api/user"
import { Button } from "@repo/ui/button"
import Image from "next/image"
import Link from "next/link"

const User = async () => {
  const user = await user_api.get()
  if (!user) return null
  return <Button className="relative rounded-full ring ring-primary" size="icon" variant="secondary" asChild>
    <Link href={`https://github.com/${user.login}`}>
      <Image className="rounded-full" src={user.avatar_url} fill alt={user.name} />
    </Link>
  </Button>
}
export { User }
