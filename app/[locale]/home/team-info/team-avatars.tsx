"use client"

import { TeamMember } from "@/actions/team-members"
import { Avatar, AvatarFallback, AvatarImage } from "@yz13/mono/components/avatar"
import { Tooltip, TooltipContent, TooltipTrigger } from "@yz13/mono/components/tooltip"
import { cn } from "yz13/cn"

type TeamAvatarsProps = {
  members?: TeamMember[]
  max?: number
  className?: string
}

const TeamAvatars = ({ className = "", max, members = [] }: TeamAvatarsProps) => {
  const sliced = max ? members.slice(0, max) : members
  const isMoreThanSlice = max ? members.length >= 5 : false
  const aboveSliceCount = members.length - 5
  return (
    <div className={cn("h-9 w-full -space-x-3", className)}>
      {
        sliced.map(
          (member, index) =>
            <Tooltip key={`${member.uid}#${index}`}>
              <TooltipTrigger asChild>
                <Avatar
                  className={cn(
                    "size-9 inline-block rounded-full bg-yz-neutral-100",
                    "border-foreground border-2"
                  )}
                >
                  <AvatarImage src={member.avatar_url ?? ""} />
                  <AvatarFallback className="uppercase">{member.username.slice(0, 2)}</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent
                align="center" side="top"
                className="border"
              >
                @{member.username ?? "Username"}
              </TooltipContent>
            </Tooltip>
        )
      }
      {
        isMoreThanSlice &&
        <div className="size-9 inline-block rounded-full border bg-yz-neutral-100">
          <div className="flex items-center justify-center w-full h-full">
            <span className="text-sm text-secondary">{aboveSliceCount}</span>
          </div>
        </div>
      }
    </div>
  )
}
export { TeamAvatars }
