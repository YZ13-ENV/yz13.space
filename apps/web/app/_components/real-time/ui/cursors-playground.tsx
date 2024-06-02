"use client"
import { cn } from "@repo/ui/cn"
import { useLocalStorageState } from "ahooks"
import { useEffect } from "react"
import { useCursors } from "../store/cursors-store"
import { Cursor } from "./cursor"


const CursorsPlayground = () => {
  const cursors = useCursors(state => state.cursors)
  const [sid] = useLocalStorageState<string | null>("anon-sid", { defaultValue: null })
  useEffect(() => {
    console.log(cursors)
  }, [cursors])
  return (
    <>
      {
        cursors.map(
          cursor =>
            <Cursor
              key={cursor.uid}
              style={{ top: `${cursor.cursor ? cursor.cursor.y : 0}px`, left: `${cursor.cursor ? cursor.cursor.x : 0}px` }}
              className={cn("absolute", sid ? sid === cursor.uid ? "opacity-10" : "" : "")}
            />
        )
      }
    </>
  )
}
export { CursorsPlayground }
