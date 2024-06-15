import { SubThread as SubThreadType } from "@/packages/api/src/db/types"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { BiHeart, BiShareAlt } from "react-icons/bi"
import { LuBarChart, LuUsers } from "react-icons/lu"
import { MdOutlineStarBorder, MdOutlineTag } from "react-icons/md"
import { Attachments } from "../attachmets"
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
  return (
    <SubThread
      direction="horizontal"
      className="gap-2"
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
              <button className="flex items-center gap-2 text-xs text-secondary">
                <MdOutlineTag size={16} />
                <span>{tag}</span>
              </button>
            }
            <button className="flex items-center gap-2 text-xs text-secondary">
              <BiHeart size={16} />
              <span>10</span>
            </button>
            <button className="flex items-center gap-2 text-xs text-secondary">
              <LuBarChart size={16} />
              <span>2</span>
            </button>
            <button className="flex items-center gap-2 text-xs text-secondary">
              <LuUsers size={16} />
              <span>2</span>
            </button>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 text-xs text-secondary">
                <MdOutlineStarBorder size={16} />
              </button>
              <button className="flex items-center gap-2 text-xs text-secondary">
                <BiShareAlt size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </SubThread>
  )
}
export { SubThreadV2 }
