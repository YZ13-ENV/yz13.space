"use client"
import { MessagesStack } from "@/app/(real-time)/_components/messages-stack"
import { VisitorCursor } from "@/app/_components/real-time/store/cursors-store"
import { CursorsPlayground } from "@/app/_components/real-time/ui/cursors-playground"
import { VisitorSync } from "@/app/_components/real-time/ui/visitor-sync"
import { VisitorsStack } from "@/app/_components/real-time/ui/visitors-stack"
import { useState } from "react"
import { MdSpaceBar } from "react-icons/md"

const page = () => {
  const [users, setUsers] = useState<VisitorCursor[]>([])
  return (
    <div className="w-full cursor-none relative flex items-center justify-center h-screen overflow-hidden bg-transparent">
      <div className="w-full h-full absolute left-0 top-0 bg-grid-neutral-100 dark:bg-grid-neutral-900 z-[-2]" />
      <div className="w-full h-full absolute left-0 top-0 bg-gradient-to-r from-background via-transparent to-background z-[-1]" />
      <VisitorSync users={users} onUsers={setUsers} />
      <div className="w-9 top-6 left-6 absolute">
        <VisitorsStack users={users} />
      </div>
      <CursorsPlayground users={users} />
      <div className="absolute left-0 px-6 bottom-6 flex items-end justify-between w-full">
        <div className="w-fit flex items-center px-3 h-9 rounded-full bg-accents-2/60 border min-w-9">
          <span className="text-sm text-secondary font-medium">YZ13/real-time</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <MdSpaceBar />
            <span className="text-sm">Chat</span>
          </div>
        </div>
        <MessagesStack />
      </div>
    </div>
  )
}
export default page