import { Tooltip, TooltipContent, TooltipTrigger } from "@repo/ui/tooltip"
import { TeamMember } from "@yz13/api/db/types"
import Image from "next/image"

type Props = {
  author: TeamMember
  size?: number
}
const Author = ({ author, size = 36 }: Props) => {
  return (
    <Tooltip>
      <TooltipTrigger className="z-20" asChild>
        {
          <Image
            className="aspect-square shrink-0 rounded-full border-2 border-background bg-accents-2"
            src={author?.avatar_url || ""}
            width={size} height={size}
            alt="author-photo"
          />
        }
      </TooltipTrigger>
      <TooltipContent side="left" align="end" avoidCollisions sideOffset={6} className="rounded-l-xl rounded-tr-xl rounded-br-sm flex flex-col">
        <span className="font-semibold text-foreground">{author?.username}</span>
        <span>{author?.position}</span>
      </TooltipContent>
    </Tooltip>
  )
}
export { Author }
