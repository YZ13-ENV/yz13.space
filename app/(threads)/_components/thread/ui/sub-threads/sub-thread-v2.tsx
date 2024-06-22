import { cn } from "@/packages/ui/lib/utils"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import Link from "next/link"
import { LuUsers } from "react-icons/lu"
import { MdOutlineTag } from "react-icons/md"
import { Attachments } from "../attachments"
import { SubThreadStatistics } from "../sub-thread-statistics"
import { SubThreadsProps } from "../threads/thread-v2"
import { BtnIcon } from "./btn-icon"
import { Button } from "./button"
import { ShareButton } from "./share-button"
import { SubThread } from "./sub-thread"
dayjs.extend(relativeTime)

const SubThreadV2 = ({
  tag,
  enableLink = false,
  sub_thread,
  className = "",
  enableLine = false,
  pinned = false,
}: SubThreadsProps) => {
  const avatar_size = 36
  const avatars = sub_thread.author.map(author => author.avatar_url)
  const authors = sub_thread.author
  const created_at = dayjs(sub_thread?.created_at).fromNow()
  const hasAttachments = !!sub_thread.attachments.length
  const thread_id = sub_thread.thread_id
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
          <Link href={`/threads/${thread_id}`}>
            <SubThread.Text>{sub_thread.text}</SubThread.Text>
          </Link>
          {
            hasAttachments &&
            <Attachments attachments={sub_thread.attachments} />
          }
          <div className="w-full flex items-center justify-between">
            {
              tag &&
              <Button>
                <BtnIcon icon={MdOutlineTag} />
                {tag}
              </Button>
            }
            <SubThreadStatistics sub_thread={sub_thread} />
            <Button>
              <BtnIcon icon={LuUsers} />
              {authors_count}
            </Button>
            <div className="flex items-center gap-2">
              <ShareButton id={thread_id} />
            </div>
          </div>
        </div>
      </div>
    </SubThread>
  )
}
export { SubThreadV2 }
