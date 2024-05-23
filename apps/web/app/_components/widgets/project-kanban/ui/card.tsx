import { Button } from "@repo/ui/button"
import { getTeamMembers } from "@yz13/api/db/team"
import { KanbanTask } from "@yz13/api/db/types"
import dayjs from "dayjs"
import Image from "next/image"
import { BiDotsHorizontalRounded, BiMessageRounded } from "react-icons/bi"

type Props = {
  task: KanbanTask
}
const TaskCard = async ({ task }: Props) => {
  const card = task
  const authors = ((await getTeamMembers()).data || []).filter(member => task.author.includes(member.username))
  return (
    <div key={"task#" + card.id} className="w-full h-fit border rounded-xl hover:bg-accents-1 hover:border-foreground transition-colors cursor-pointer bg-background p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm">{dayjs(card.created_at).fromNow()}</span>
        <Button size="icon" variant="ghost" className="w-6 h-6">
          <BiDotsHorizontalRounded size={16} />
        </Button>
      </div>
      <div className="w-full flex flex-col mt-2">
        <span className="text-foreground text-lg">{card.title}</span>
        {
          card.description &&
          <span className="text-sm">{card.description}</span>
        }
      </div>
      <div className="w-full flex flex-row flex-wrap mt-2 gap-1 items-start">
        {
          !!card.tags.length &&
          card.tags.map(tag =>
            <span key={"task#" + card.id + "-" + tag} className="px-2 h-6 py-1 text-xs rounded-full border inline-flex items-center gap-1">{tag}</span>
          )
        }
      </div>
      <div className="w-full flex items-center mt-4 justify-between">
        <div className="flex items-center gap-1">
          <span className="px-2 h-6 py-1 brightness-50 text-xs rounded-full border inline-flex items-center gap-1"><BiMessageRounded size={14} /><span>0</span></span>
        </div>
        <div className="flex items-center -gap-3">
          {
            authors.map(author =>
              <div key={author.username} className="w-6 relative h-6 rounded-full bg-accents-2">
                <Image src={author.avatar_url} className="rounded-full" fill alt={author.username} />
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}
export { TaskCard }
