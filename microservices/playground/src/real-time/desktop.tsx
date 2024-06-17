"use client"
import { useEventListener } from "ahooks"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { MdSpaceBar } from "react-icons/md"
import { MessagesStack } from "../components/messages-stack"
import { VisitorCursor } from "../components/store/cursors-store"
import { CursorsPlayground } from "../components/ui/cursors-playground"
import { VisitorSync } from "../components/ui/visitor-sync"
import { VisitorsStack } from "../components/ui/visitors-stack"

const Desktop = () => {
  const [users, setUsers] = useState<VisitorCursor[]>([])
  const router = useRouter()
  useEventListener("keyup", ev => {
    console.log(ev.code)
    if (ev.code === "Escape") router.push("/services")
  })
  return (
    <div className="w-full relative flex items-center justify-center h-screen overflow-hidden bg-transparent">
      <VisitorSync users={users} onUsers={setUsers} />
      <div className="w-9 top-6 left-6 absolute">
        <VisitorsStack users={users} />
      </div>
      <CursorsPlayground users={users} />
      <div className="absolute left-0 px-6 bottom-6 flex items-end justify-between w-full">
        <div className="flex items-center gap-2">
          <span className="text-sm text-secondary font-medium">Experimental, may have bugs</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-1 rounded-md border">Esc</span>
            <span className="text-sm">Exit</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 rounded-md border shrink-0">
              <MdSpaceBar size={16} />
            </span>
            <span className="text-sm">Chat</span>
          </div>
        </div>
        <MessagesStack />
      </div>
    </div>
  )
}
export { Desktop }
