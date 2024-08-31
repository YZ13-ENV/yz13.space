import { UserAvatar } from "./user-avatar"

type GroupedAvatarsProps = {
  users?: string[]
  size?: number
  className?: string
}

const GroupedAvatars = ({ className = "", size = 24, users = [] }: GroupedAvatarsProps) => {
  return (
    <div
      style={{ height: size }}
      className={className}
    >
      {
        users.map(user => <UserAvatar key={`group-avatar-${user}`} size={size} uid={user} />)
      }
    </div>
  )
}
export { GroupedAvatars }
