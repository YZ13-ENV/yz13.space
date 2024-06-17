import { cn } from "@repo/ui/cn"
import { motion } from "framer-motion"
import { getThemeById } from "../cursors-themes"
import { VisitorCursor as Visitor } from "../store/cursors-store"
import { VisitorMessage } from "../store/message-store"
import { Cursor } from "./cursor"

type Props = Visitor & {
  isLocal?: boolean
  message?: VisitorMessage
  className?: string
}
const VisitorCursor = ({ className = "", cursor, user_id, theme_id, isLocal = false, message }: Props) => {
  const theme = getThemeById(theme_id || 2)
  const x = cursor.x
  const y = cursor.y
  return (
    <div
      className="absolute w-fit h-fit flex items-start gap-2 z-10"
      style={{ top: `${cursor ? y : 0}px`, left: `${cursor ? x : 0}px` }}
    >
      <div className="w-4 aspect-square flex items-start justify-start">
        <Cursor
          className={cn(isLocal ? "hidden" : "", user_id ? "" : "")}
          cursorBorder={theme?.border}
          cursorColor={theme?.color}
        />
      </div>
      <div className="flex flex-col gap-1 ">
        <span
          className={cn(
            "text-xs rounded-bl-md rounded-tl-xl rounded-r-xl",
            "bg-background inline-block max-w-xs shrink-0 w-fit h-fit border px-1.5 py-1"
          )}
        >
          {isLocal ? "You " + `#${user_id.slice(0, 6)}` : `#${user_id.slice(0, 6)}`}
        </span>
        {
          message && (message.uid === user_id) &&
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={cn(
              "text-xs rounded-tl-md rounded-bl-xl rounded-r-xl",
              "bg-background inline-block max-w-xs shrink-0 w-fit border px-1.5 py-1"
            )}
          >
            {message?.text}
          </motion.span>
        }
      </div>
    </div>
  )
}
export { VisitorCursor }
