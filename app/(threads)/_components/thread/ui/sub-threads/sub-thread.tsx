import { FullSubThread } from "@/packages/api/src/db/types"
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
  direction = "horizontal",
  max = 3
}: {
  max?: number
  avatars?: string[],
  size?: number,
  direction?: SubThreadDirection
}) => {
  const sliced = avatars.slice(0, 3)
  const isAboveMax = avatars.length > max
  const howMuchHidden = avatars.length - 3
  return (
    <div
      className={cn(
        direction === "horizontal" ? "h-9 w-fit -space-x-4" : "w-9 h-fit -space-y-4",
        "shrink-0 relative"
      )}
    >
      {
        sliced.map(
          (avatar, i) =>
            <img
              key={avatar + "-" + i}
              className="aspect-square shrink-0 inline-block rounded-full border-2 border-background bg-accents-2"
              src={avatar}
              width={size} height={size}
              alt="author-photo"
            />
        )
      }
      {
        isAboveMax &&
        <div
          style={{ width: `${size}px`, height: `${size}px` }}
          className="aspect-square shrink-0 inline-block rounded-full border-2 border-background bg-accents-2"
        >
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-sm">{howMuchHidden}</span>
          </div>
        </div>
      }
    </div>
  )
}

const SubThreadAuthors = ({
  authors = [],
  showPositions = false,
  max = 3
}: {
  authors?: FullSubThread["author"],
  showPositions?: boolean
  max?: number
}) => {
  const onlyNames = authors.map((author, index) => author ? author.username : `Author#${index}`)
  const slicedNames = onlyNames.slice(0, 3)
  const howMuchNamesHidden = onlyNames.length - 3
  const isNameAboveMax = onlyNames.length > max
  const names = isNameAboveMax ? slicedNames.join(", ") + ` + ${howMuchNamesHidden} other` : slicedNames.join(", ")
  const onlyPositions = authors.map((author, index) => author ? author.position : `Author position#${index}`)
  const slicesPositions = onlyPositions.slice(0, 3)
  const howMuchPositionsHidden = onlyPositions.length - 3
  const isPositionsAboveMax = onlyPositions.length > max
  const positions = isPositionsAboveMax ? slicesPositions.join(", ") + ` + ${howMuchPositionsHidden} other` : slicesPositions.join(", ")
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
