"use client"
import { useLocalStorageState, useTimeout } from "ahooks"
import { VisitorCursor } from "../store/cursors-store"
import { useMessage } from "../store/message-store"
import { VisitorCursor as Cursor } from "./visitor-cursor"

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
        users
          .filter(user => user.user_id !== sid)
          .map(
            (cursor, index) => {
              return (
                <Cursor
                  cursor={cursor.cursor}
                  user_id={cursor.user_id}
                  key={cursor.user_id + "-" + index}
                  message={message}
                  theme_id={cursor.theme_id}
                />
              )
            }
          )
      }
    </>
  )
}
export { CursorsPlayground }
