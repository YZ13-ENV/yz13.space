import { SubThreadV2 } from "@/app/(threads)/_components/thread/ui/sub-threads/sub-thread-v2"
import { Thread } from "@/app/(threads)/_components/thread/ui/threads/thread-v2"
import { getFullThread } from "@/packages/api/src/db/threads"
import { unstable_noStore } from "next/cache"

type Props = {
  id: number
}
const ThreadWrapper = async ({ id }: Props) => {
  unstable_noStore()
  const thread = await getFullThread(id)
  if (!thread) return null
  return (
    <Thread thread={thread} component={SubThreadV2} />
  )
}
export { ThreadWrapper }
