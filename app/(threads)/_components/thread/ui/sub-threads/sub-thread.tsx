import { SubThread as SubThreadType } from "@/packages/api/src/db/types"
import { cn } from "@/packages/ui/lib/utils"
import { Separator } from "@/packages/ui/src/components/separator"
import { ReactNode } from "react"

type SubThreadDirection = "horizontal" | "vertical"

type SubThreadProps = {
  children?: ReactNode
  className?: string
  direction?: SubThreadDirection
}
type Extensions = {
  displayName: string
  Line: typeof SubThreadLine
  Avatars: typeof SubThreadAvatars
  Text: typeof SubThreadText
  Authors: typeof SubThreadAuthors
}
const SubThreadWrapper = ({ children, className = "", direction = "horizontal" }: SubThreadProps) => {
  return (
    <div
      className={cn(
        direction === "horizontal"
          ? "flex-row"
          : "flex-col",
        "flex w-full px-6 relative",
        className
      )}
    >
      {children}
    </div>
  )
}

const SubThreadAvatars = ({
  avatars = [],
  size = 36,
  direction = "horizontal"
}: { avatars?: string[], size?: number, direction?: SubThreadDirection }) => {
  return (
    <div
      className={cn(
        direction === "horizontal" ? "h-9 w-fit" : "w-9 h-fit",
        "shrink-0 relative -space-y-4"
      )}
    >
      {
        avatars.map(
          (avatar, i) =>
            <img
              key={avatar + "-" + i}
              className="aspect-square shrink-0 rounded-full border-2 border-background bg-accents-2"
              src={avatar}
              width={size} height={size}
              alt="author-photo"
            />
        )
      }
    </div>
  )
}

const SubThreadAuthors = ({
  authors = [],
  showPositions = false
}: { authors?: SubThreadType["author"], showPositions?: boolean }) => {
  const names = authors.map((author, index) => author ? author.username : `Author#${index}`).join(", ")
  const positions = authors.map((author, index) => author ? author.position : `Author position#${index}`).join(", ")
  return (
    <div className="flex flex-col">
      <span className="font-semibold text-base text-foreground line-clamp-1">{names}</span>
      {
        showPositions &&
        <span className="text-xs text-accents-5">{positions}</span>
      }
    </div>
  )
}

const SubThreadText = ({ children = "" }: { children?: string }) => {
  return <span className="group-hover:text-foreground transition-colors text-sm">{children}</span>
}

const SubThreadLine = ({ avatar_size = 24 }: { avatar_size?: number }) => {
  return (
    <div
      style={{ width: `${avatar_size}px`, height: "100%", top: `${avatar_size}px` }}
      className="absolute w-fit h-full left-[30px] py-0 flex justify-center z-[-1]"
    >
      <Separator orientation="vertical" className="w-[3px] bg-accents-2 dark:bg-accents-3" />
    </div>
  )
}

const SubThread = SubThreadWrapper as typeof SubThreadWrapper & Extensions
SubThread.displayName = "SubThread"
SubThread.Line = SubThreadLine
SubThread.Avatars = SubThreadAvatars
SubThread.Text = SubThreadText
SubThread.Authors = SubThreadAuthors
// attachments
// statistics

export { SubThread }
