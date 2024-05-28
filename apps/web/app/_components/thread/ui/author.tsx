import { Tooltip, TooltipContent, TooltipTrigger } from "@repo/ui/tooltip"
import { team } from "@yz13/api/db"
import Image from "next/image"

type Props = {
  author: string
}
const Author = async ({ author }: Props) => {
  const member_res = await team.getTeamMember(author)
  const member = member_res.data
  return (
    <Tooltip>
      <TooltipTrigger className="z-20" asChild>
        <Image
          className="aspect-square shrink-0 rounded-full border-2 border-background bg-accents-2"
          src={member?.avatar_url || ""}
          width={36} height={36}
          alt="author-photo"
        />
      </TooltipTrigger>
      <TooltipContent side="left" align="end" avoidCollisions sideOffset={6} className="rounded-l-xl rounded-tr-xl rounded-br-sm flex flex-col">
        <span className="font-semibold text-foreground">{member?.username}</span>
        <span>{member?.position}</span>
      </TooltipContent>
    </Tooltip>
  )
}
export { Author }
