import { Button } from "@repo/ui/button"
import { getUser } from "@yz13/api/gh/user"
import Image from "next/image"
import Link from "next/link"

type Props = {
  size?: number
}
const User = async ({ size = 36 }: Props) => {
  const user = await getUser()
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
