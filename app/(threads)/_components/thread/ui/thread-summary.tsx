import { ThreadItem } from "@yz13/api/db/types";
import { BiChart, BiHeart } from "react-icons/bi";
import { VscGroupByRefType } from "react-icons/vsc";

type Props = {
  sub_threads?: ThreadItem[]
}
const ThreadSummary = ({ sub_threads = [] }: Props) => {
  const total_likes = sub_threads.map(item => item.likes).map(item => item.length).reduce((a, b) => a + b)
  const total_views = sub_threads.map(item => item.views).map(item => item.length).reduce((a, b) => a + b)
  const total_items = sub_threads.length
  return (
    <div className="w-full flex gap-3 items-center">
      <div className="w-9 h-9"></div>
      <div className="relative -left-4 flex items-center gap-2">
        <span className="px-3 text-sm text-secondary inline-flex gap-2 items-center">
          <BiHeart size={16} />
          <span className="text-sm text-inherit">{total_likes}</span>
        </span>
        <span className="px-3 text-sm text-secondary inline-flex gap-2 items-center">
          <BiChart size={16} />
          <span className="text-sm text-inherit">{total_views}</span>
        </span>
        <span className="px-3 text-sm text-secondary inline-flex gap-2 items-center">
          <VscGroupByRefType size={16} />
          <span className="text-sm text-inherit">{total_items}</span>
        </span>
      </div>
    </div>
  )
}
export { ThreadSummary };

