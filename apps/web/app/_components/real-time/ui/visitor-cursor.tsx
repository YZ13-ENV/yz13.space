import { getThemeById } from "@/app/(real-time)/_components/cursors-themes"
import { VisitorMessage } from "@/app/(real-time)/_components/store/message-store"
import { cn } from "@repo/ui/cn"
import { motion } from "framer-motion"
import { VisitorCursor as Visitor } from "../store/cursors-store"
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
      className="absolute w-fit h-fit z-10"
      style={{ top: `${cursor ? y : 0}px`, left: `${cursor ? x : 0}px` }}
    >
      <Cursor
        className={cn("", user_id ? "" : "")}
        cursorBorder={theme?.border}
        cursorColor={theme?.color}
      />
      <span
        className={cn(
          "relative left-6 -top-6 text-xs rounded-xl",
          "bg-background inline-block max-w-xs shrink-0 w-fit h-fit border px-1.5 py-0.5"
        )}
      >{isLocal ? "You" : `#${user_id.slice(0, 6)}`}</span>
      {
        message && (message.uid === user_id) &&
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={cn(
            "relative left-6 bottom-4 text-sm rounded-tl-md rounded-bl-xl rounded-r-xl",
            "bg-background inline-block max-w-xs shrink-0 w-full border px-2 py-1"
          )}
        >
          {message.text}
        </motion.span>
      }
    </div>
  )
}
export { VisitorCursor }
