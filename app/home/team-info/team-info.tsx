import { members } from "@/actions/team-members"
import { works } from "@/actions/works"
import { Stack } from "@/components/stack"
import { Locales, getDict } from "@/dictionaries/tools"
import dayjs from "dayjs"
import { TeamAvatars } from "./team-avatars"

const TeamInfo = async ({ lang = "en" }: { lang?: Locales }) => {
  const now = dayjs()
  const year = now.year()
  const team = await members()
  const data = team?.data ?? []
  const membersExperience = data ? data?.map(member => (year + 1) - (member["experience-from"] ?? 2024)) : []
  const combinedExperience = membersExperience.length ? membersExperience.reduce((a, b) => a + b) : 0
  const allWorks = await works()
  const worksCount = allWorks?.data ? allWorks?.data.length : 0
  // localization
  const dict = await getDict<any>("home", lang)
  const team_dict = dict["team-experience"]
  const text = team_dict["text"]
  const experience = team_dict["experience"]
  const experience_metric = experience.metric
  const experience_description = experience.description
  const projects = team_dict["projects"]
  const projects_metric = projects.metric
  const projects_description = projects.description
  return (
    <Stack.Wrapper>
      <Stack.Content className="flex h-fit items-start gap-4">
        <div className="w-2/3 h-full flex flex-col">
          {
            text.map((item: string) =>
              <p key={item} className="text-foreground/60 text-sm">
                {item}
              </p>
            )
          }
        </div>
        <div className="w-1/3 flex h-full flex-col gap-3">
          <TeamAvatars members={data} max={4} />
          <div className="flex flex-col gap-1">
            <span className="text-sm text-foreground">+{combinedExperience} {experience_metric}</span>
            <span className="text-xs capitalize text-secondary">{experience_description}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-foreground">+{worksCount} {projects_metric}</span>
            <span className="text-xs capitalize text-secondary">{projects_description}</span>
          </div>
        </div>
      </Stack.Content>
    </Stack.Wrapper>
  )
}
export { TeamInfo }
