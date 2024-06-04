"use client"
import { BiUser } from "react-icons/bi"
import { SimpleTooltip } from "../../simple-tooltip"
import { useCursors } from "../store/cursors-store"

const VisitorsStack = () => {
  const cursors = useCursors(state => state.cursors)
  const chunk = cursors.slice(0, 3)
  return (
    <>
      <SimpleTooltip
        sideOffset={12}
        side="left"
        text="Real time visitors"
      >
        <div className="w-full -space-y-4 cursor-pointer transition-all">
          {
            chunk.map(
              cursor =>
                <div key={"stach-item-" + cursor.user_id} className="w-full aspect-square rounded-full bg-accents-1 border flex items-center justify-center">
                  <BiUser size={16} className="text-secondary" />
                </div>
            )
          }
          {
            cursors.length > 3 &&
            <div className="w-full aspect-square rounded-full bg-accents-1 border flex items-center justify-center">
              <span className="text-sm text-secondary">+{cursors.length - 3}</span>
            </div>
          }
        </div>
      </SimpleTooltip>
    </>
  )
}
export { VisitorsStack }
