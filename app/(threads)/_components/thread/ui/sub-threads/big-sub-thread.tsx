import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { BiHeart, BiShareAlt } from "react-icons/bi"
import { LuBarChart2, LuUsers } from "react-icons/lu"
import { MdOutlineStarBorder, MdOutlineTag } from "react-icons/md"
import { Attachments } from "../attachmets"
import { SubThreadsProps } from "../threads/thread-v2"
import { Button } from "./button"
import { SubThread } from "./sub-thread"
dayjs.extend(relativeTime)

const SubThreadBig = ({ enableLink = false, sub_thread, className = "", tag }: SubThreadsProps) => {
  const avatars = sub_thread.author.map(author => author.avatar_url)
  const authors = sub_thread.author
  const created_at = dayjs(sub_thread?.created_at).fromNow()
  const hasAttachments = !!sub_thread.attachments.length
  const thread_id = sub_thread.thread_id
  const likes_count = sub_thread.likes.length
  const views_count = sub_thread.views.length
  const authors_count = sub_thread.author.length
  return <SubThread
    key={`thread#${thread_id}-sub-thread#${sub_thread.sub_thread_id}`}
    direction="vertical"
    className="gap-4 py-6"
  >
    <div className="flex items-center gap-2 w-full">
      <SubThread.Avatars avatars={avatars} direction="horizontal" />
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
        <Button icon={BiHeart}>{likes_count}</Button>
        <Button icon={LuBarChart2}>{views_count}</Button>
        <Button icon={LuUsers}>{authors_count}</Button>
        <div className="flex items-center gap-2">
          <Button icon={MdOutlineStarBorder}></Button>
          <Button icon={BiShareAlt}></Button>
        </div>
      </div>
    </div>
  </SubThread>
}
export { SubThreadBig }
