import { SubThread as SubThreadType } from "@/packages/api/src/db/types"
import { cn } from "@/packages/ui/lib/utils"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { BiShareAlt } from "react-icons/bi"
import { LuUsers } from "react-icons/lu"
import { MdOutlineStarBorder, MdOutlineTag } from "react-icons/md"
import { Attachments } from "../attachmets"
import { SubThreadStatistics } from "../sub-thread-statistics"
import { Button } from "./button"
import { SubThread } from "./sub-thread"
dayjs.extend(relativeTime)

export type SubThreadsProps = {
  tag?: string
  sub_thread: SubThreadType
  enableLine?: boolean
  enableLink?: boolean
  className?: string
}

const SubThreadV2 = ({
  tag,
  enableLink = false,
  sub_thread,
  className = "",
  enableLine = false,
}: SubThreadsProps) => {
  const avatar_size = 36
  const avatars = sub_thread.author.map(author => author.avatar_url)
  const authors = sub_thread.author
  const created_at = dayjs(sub_thread?.created_at).fromNow()
  const hasAttachments = !!sub_thread.attachments.length
  const thread_id = sub_thread.thread_id
  const likes_count = sub_thread.likes.length
  const views_count = sub_thread.views.length
  const authors_count = sub_thread.author.length
  return (
    <SubThread
      direction="horizontal"
      className={cn("gap-2", className)}
    >
      {
        enableLine &&
        <SubThread.Line />
      }
      <SubThread.Avatars avatars={avatars} direction="horizontal" />
      <div className="space-y-4 w-full">
        <div className="flex items-center gap-2 w-full">
          <div className="flex items-center w-full justify-between">
            <SubThread.Authors authors={authors} showPositions />
            <span className="text-xs text-secondary">{created_at}</span>
          </div>
        </div>
        <div className="w-full flex gap-4 flex-col">
          <SubThread.Text>{sub_thread.text}</SubThread.Text>
          {
            hasAttachments &&
            <Attachments attachments={sub_thread.attachments} />
          }
          <div className="w-full flex items-center justify-between">
            {
              tag &&
              <Button icon={MdOutlineTag}>{tag}</Button>
            }
            <SubThreadStatistics sub_thread={sub_thread} />
            <Button icon={LuUsers}>{authors_count}</Button>
            <div className="flex items-center gap-2">
              <Button icon={MdOutlineStarBorder}></Button>
              <Button icon={BiShareAlt}></Button>
            </div>
          </div>
        </div>
      </div>
    </SubThread>
  )
}
export { SubThreadV2 }
