import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { MdOutlineEmail } from "react-icons/md"
import { Wrapper } from "./wrapper"

type ListItemProps = {
  author: string
  text: string
  created_at: string
}
dayjs.extend(relativeTime)
const ListItem = ({ author, created_at, text }: ListItemProps) => {
  const format = dayjs(created_at).fromNow()
  return (
    <div className="w-full h-fit flex p-2 rounded-xl transition-colors cursor-pointer hover:bg-accents-1 text-secondary hover:text-foreground gap-2">
      <MdOutlineEmail size={24} className="text-foreground" />
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-base text-foreground">{author}</span>
          <span className="text-xs text-secondary">{format}</span>
        </div>
        <span className="text-sm text-inherit line-clamp-1">{text}</span>
      </div>
    </div>
  )
}

const List = () => {
  const now = dayjs("2024-05-29")
  return (
    <Wrapper className="aspect-square">
      <div className="w-full max-w-80 h-fit p-2 bg-background border rounded-xl">
        <ListItem author="YZ13" created_at={now.toISOString()} text="I launched new service, where im gonna upload widgets" />
        <ListItem author="YZ13" created_at={now.toISOString()} text="I launched new service, where im gonna upload widgets" />
        <ListItem author="YZ13" created_at={now.toISOString()} text="I launched new service, where im gonna upload widgets" />
      </div>
    </Wrapper>
  )
}
export { List, ListItem }
