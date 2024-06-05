"use client"
import { getThemeById } from "@/app/(real-time)/_components/cursors-themes"
import { useMessage } from "@/app/(real-time)/_components/store/message-store"
import { cn } from "@repo/ui/cn"
import { useLocalStorageState, useTimeout } from "ahooks"
import { motion } from "framer-motion"
import { VisitorCursor } from "../store/cursors-store"
import { Cursor } from "./cursor"

type Props = {
  users?: VisitorCursor[]
}
const CursorsPlayground = ({ users = [] }: Props) => {
  const [sid] = useLocalStorageState<string | null>("anon-sid", { defaultValue: null })
  const message = useMessage(state => state.message)
  const setMessage = useMessage(state => state.setMessage)
  useTimeout(() => {
    setMessage(undefined)
  }, message ? 3000 : undefined)
  return (
    <>
      {
        users.map(
          (cursor, index) => {
            const theme = getThemeById(cursor.theme_id || 1)
            return <div
              key={cursor.user_id + "-" + index}
              className="absolute w-fit h-fit z-10"
              style={{ top: `${cursor.cursor ? cursor.cursor.y : 0}px`, left: `${cursor.cursor ? cursor.cursor.x : 0}px` }}
            >
              <Cursor
                className={cn("", sid ? sid === cursor.user_id ? "opacity-20" : "" : "")}
                cursorBorder={theme?.border}
                cursorColor={theme?.color}
              />
              {
                cursor.user_id === sid &&
                <span
                  className={cn(
                    "relative left-6 -top-6 text-xs rounded-xl",
                    "bg-background inline-block max-w-xs shrink-0 w-fit h-fit border px-1.5 py-0.5"
                  )}
                >You #{sid.slice(0, 6)}</span>
              }
              {
                message && (message.uid === cursor.user_id) &&
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
          }
        )
      }
    </>
  )
}
export { CursorsPlayground }
