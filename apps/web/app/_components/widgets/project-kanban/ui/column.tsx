import { getColumnCards } from "@/api/kanban"
import { KanbanColumn } from "@/types/kanban"
import { TaskCard } from "./card"

type Props = {
  column: KanbanColumn
}
const Column = async ({ column }: Props) => {
  const cards_response = await getColumnCards(column.status)
  const cards = cards_response.data || []
  return (
    <div className="w-full space-y-6 max-w-xs px-3 h-full">
      <span>{column.column_name}</span>
      <div style={{ height: "calc(100% - 44px)" }} className="w-full no-scrollbar space-y-3 overflow-y-auto h-full">
        {
          !cards.length &&
          <div className="flex w-full justify-center items-center">
            <span className="text-center text-sm text-secondary">No tasks for now</span>
          </div>
        }
        {
          !!cards.length &&
          cards.map(card =>
            <TaskCard key={column.status + "-" + card.id} task={card} />
          )
        }
      </div>
    </div>
  )
}
export { Column }
