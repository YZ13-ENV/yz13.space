import { user as user_api } from "@/api/user"
import { Button } from "@repo/ui/button"
import Image from "next/image"
import Link from "next/link"

type Props = {
  size?: number
}
const User = async ({ size = 36 }: Props) => {
  const user = await user_api.get()
  if (!user) return null
  return (
    <Button
      style={{ width: `${size}px`, height: `${size}px` }}
      className="relative w-12 h-12 rounded-full ring ring-foreground"
      size="icon"
      variant="secondary"
      asChild
    >
      <Link href={`https://github.com/${user.login}`}>
        <Image className="rounded-full" src={user.avatar_url} fill alt={user.name} />
      </Link>
    </Button>
  )
}
export { User }
