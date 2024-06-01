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
          cursor =>
            <Cursor
              key={cursor.uid}
              style={{ top: `${cursor.cursor.y}px`, left: `${cursor.cursor.x}px` }}
              className={cn("absolute", sid ? sid === cursor.uid ? "opacity-10" : "" : "")}
            />
        )
      }
    </>
  )
}
export { CursorsPlayground }
