import { MessagesStack } from "@/app/(real-time)/_components/messages-stack"
import { CursorsPlayground } from "@/app/_components/real-time/ui/cursors-playground"
import { VisitorSync } from "@/app/_components/real-time/ui/visitor-sync"
import { VisitorsStack } from "@/app/_components/real-time/ui/visitors-stack"

const page = () => {
  return (
    <div className="w-full relative flex items-center justify-center h-screen overflow-hidden bg-transparent">
      <div className="w-full h-full absolute left-0 top-0 bg-grid-neutral-100 dark:bg-grid-neutral-900 z-[-2]" />
      <div className="w-full h-full absolute left-0 top-0 bg-gradient-to-r from-background via-transparent to-background z-[-1]" />
      <VisitorSync />
      <div className="w-9 top-6 left-6 absolute">
        <VisitorsStack />
      </div>
      <CursorsPlayground />
      <div className="absolute left-0 px-6 bottom-6 flex items-end justify-between w-full">
        <div className="w-fit flex items-center px-3 h-9 rounded-full bg-accents-2/60 border min-w-9">
          <span className="text-sm text-secondary font-medium">YZ13/real-time</span>
        </div>
        <MessagesStack />
      </div>
    </div>
  )
}
export default page