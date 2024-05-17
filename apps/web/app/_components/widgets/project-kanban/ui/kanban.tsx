import { getColumns } from "@/api/kanban"
import { BiDotsHorizontalRounded, BiMessageRounded } from "react-icons/bi"

const ProjectKanban = async () => {
  const col_response = await getColumns()
  const columns = col_response.data || []
  return (
    <div className="h-full w-full flex flex-row items-start">
      {
        columns.map(column =>
          <div key={column.status} className="w-full space-y-6 max-w-xs py-6 px-3 h-full">
            <span>{column.column_name}</span>
            <div style={{ height: "calc(100% - 44px)" }} className="w-full no-scrollbar space-y-3 overflow-y-auto h-full">
              <div className="w-full h-fit border rounded-xl hover:border-foreground transition-colors cursor-pointer bg-background p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">day ago</span>
                  <button><BiDotsHorizontalRounded size={16} /></button>
                </div>
                <div className="w-full flex flex-col mt-2">
                  <span className="text-foreground text-lg">Card name</span>
                  <span className="text-sm">Card description</span>
                </div>
                <div className="w-full flex items-center mt-4 justify-between">
                  <div className="flex items-center gap-1">
                    <span className="px-2 h-6 py-1 text-xs rounded-full border inline-flex items-center gap-1"><BiMessageRounded size={14} /><span>0</span></span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-accents-2" />
                </div>
              </div>
            </div>
          </div>
        )
      }

    </div>
  )
}
export { ProjectKanban }
