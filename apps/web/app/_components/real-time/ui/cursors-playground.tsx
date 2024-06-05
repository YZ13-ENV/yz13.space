"use client"
import { getThemeById } from "@/app/(real-time)/_components/cursors-themes"
import { VisitorMessage, useMessages } from "@/app/(real-time)/_components/messages-store"
import { cn } from "@repo/ui/cn"
import { useLocalStorageState } from "ahooks"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { useCursors } from "../store/cursors-store"
import { Cursor } from "./cursor"


const CursorsPlayground = () => {
  const cursors = useCursors(state => state.cursors)
  const [sid] = useLocalStorageState<string | null>("anon-sid", { defaultValue: null })
  const messages = useMessages(state => state.messages)
  const [message, setMessage] = useState<VisitorMessage | null>(null)
  useEffect(() => {
    const sorted = messages.sort((a, b) => {
      const a_date = dayjs(a.created_at)
      const b_date = dayjs(b.created_at)
      return b_date.diff(a_date)
    })
    console.log(sorted)
  }, [message])
  return (
    <>
      {
        cursors.map(
          (cursor, index) => {
            const theme = getThemeById(cursor.theme_id || 1)
            return <div
              key={cursor.user_id + "-" + index}
              className="absolute w-fit h-fit"
              style={{ top: `${cursor.cursor ? cursor.cursor.y : 0}px`, left: `${cursor.cursor ? cursor.cursor.x : 0}px` }}
            >
              <Cursor
                className={cn("", sid ? sid === cursor.user_id ? "dark:opacity-30 opacity-10" : "" : "")}
                cursorBorder={theme?.border}
                cursorColor={theme?.color}
              />
              {
                message &&
                <p
                  className={cn(
                    "relative left-3 text-sm rounded-tl-md rounded-bl-xl rounded-r-xl",
                    "bg-background inline-block max-w-xs shrink-0 w-full border px-2 py-1"
                  )}
                >
                  {message.text}
                </p>
              }
            </div>
          }
        )
      }
    </>
  )
}
export { CursorsPlayground }
