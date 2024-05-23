import { getColumns } from "@yz13/api/db/kanban"
import { Column } from "./column"

const ProjectKanban = async () => {
  const col_response = await getColumns()
  const columns = col_response.data || []
  return (
    <div className="h-full w-full flex flex-row items-start">
      {
        columns.map(column =>
          <Column key={column.status} column={column} />
        )
      }

    </div>
  )
}
export { ProjectKanban }
