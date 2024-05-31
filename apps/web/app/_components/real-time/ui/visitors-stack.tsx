import { SimpleTooltip } from "../../simple-tooltip"

const VisitorsStack = () => {
  return (
    <SimpleTooltip
      sideOffset={12}
      side="left"
      text="Real time visitors"
    >
      <div className="w-full -space-y-4 p-0 hover:p-1 rounded-xl hover:bg-accents-1 cursor-pointer transition-all">
        <div className="w-full aspect-square rounded-full bg-accents-1 border" />
        <div className="w-full aspect-square rounded-full bg-accents-1 border" />
        <div className="w-full aspect-square rounded-full bg-accents-1 border" />
        <div className="w-full aspect-square rounded-full bg-accents-1 border flex items-center justify-center">
          <span className="text-sm text-secondary">+4</span>
        </div>
      </div>
    </SimpleTooltip>
  )
}
export { VisitorsStack }
