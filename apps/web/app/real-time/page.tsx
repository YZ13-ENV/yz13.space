import { Button } from "@repo/ui/button"
import { Input } from "@repo/ui/input"
import Link from "next/link"
import { CursorsPlayground } from "../_components/real-time/ui/cursors-playground"
import { VisitorSync } from "../_components/real-time/ui/visitor-sync"
import { VisitorsStack } from "../_components/real-time/ui/visitors-stack"

const page = () => {
  return (
    <div className="w-full relative flex items-center justify-center h-screen overflow-hidden bg-transparent">
      <div className="w-full h-full absolute left-0 top-0 bg-grid-neutral-100 dark:bg-grid-neutral-900 z-[-2]" />
      <div className="w-full h-full absolute left-0 top-0 bg-gradient-to-r from-background via-transparent to-background z-[-1]" />
      <VisitorSync />
      <div className="w-9 top-6 left-6 absolute">
        <VisitorsStack />
      </div>

      <div className="max-w-xs w-full h-fit absolute flex flex-col gap-4 items-center justify-center">
        <div className="w-full p-4 rounded-lg border bg-background">
          <h2 className="text-2xl font-bold">Welcome to YZ13/real-time</h2>
          <p className="text-secondary text-sm">
            This playground is only for demonstration of my skills.
            Idea was from <Link className="text-foreground underline" href="https://multiplayer.dev">multiplayer.dev</Link>
          </p>
        </div>
        <div className="w-full p-4 rounded-lg border bg-background">
          <p className="text-secondary text-sm">
            I have some ideas about real time feature, so if you want, you can vote on <b>this</b> page
          </p>
        </div>
        <Button variant="outline" className="w-full">
          <span className="text-secondary text-sm">Join room</span>
        </Button>
      </div>

      <CursorsPlayground />
      <div className="absolute left-0 px-6 bottom-6 flex items-center justify-between w-full">
        <div className="w-fit flex items-center px-3 h-9 rounded-full bg-accents-2/60 border min-w-9">
          <span className="text-sm text-secondary font-medium">YZ13/real-time</span>
        </div>
        <div className="w-full max-w-sm">
          <Input
            placeholder="Write message"
            className="w-full h-9 rounded-full bg-background"
          />
        </div>
      </div>
    </div>
  )
}
export default page