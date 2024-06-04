"use client"
import { cn } from "@repo/ui/cn"
import { useLocalStorageState } from "ahooks"
import { useCursors } from "../store/cursors-store"
import { Cursor } from "./cursor"


const CursorsPlayground = () => {
  const cursors = useCursors(state => state.cursors)
  const [sid] = useLocalStorageState<string | null>("anon-sid", { defaultValue: null })
  return (
    <>
      {
        cursors.map(
          (cursor, index) =>
            <Cursor
              key={cursor.user_id + "-" + index}
              style={{ top: `${cursor.cursor ? cursor.cursor.y : 0}px`, left: `${cursor.cursor ? cursor.cursor.x : 0}px` }}
              className={cn("absolute", sid ? sid === cursor.user_id ? "dark:opacity-30 opacity-10" : "" : "")}
            />
        )
      }
    </>
  )
}
export { CursorsPlayground }
