import { members } from "@/actions/team-members"
import { works } from "@/actions/works"
import { Stack } from "@/components/stack"
import { getI18n } from "@/locales/server"
import dayjs from "dayjs"
import { TeamAvatars } from "./team-avatars"

const TeamInfo = async () => {
  const now = dayjs()
  const year = now.year()
  const team = await members()
  const data = team?.data ?? []
  const membersExperience = data ? data?.map(member => (year + 1) - (member["experience-from"] ?? 2024)) : []
  const combinedExperience = membersExperience.length ? membersExperience.reduce((a, b) => a + b) : 0
  const allWorks = await works()
  const worksCount = allWorks?.data ? allWorks?.data.length : 0
  // localization
  const t = await getI18n()
  return (
    <Stack.Wrapper className="rounded-t-none">
      <Stack.Content className="flex h-fit items-start gap-4">
        <div className="w-2/3 h-full flex flex-col">
          {t("home.widget.team.text")}
        </div>
        <div className="w-1/3 flex h-full flex-col pb-3 gap-3">
          <TeamAvatars members={data} max={4} />
          <div className="flex flex-col gap-1">
            <span className="text-sm text-foreground">+{combinedExperience} {t("home.widget.team.experience.metric")}</span>
            <span className="text-xs capitalize text-secondary">{t("home.widget.team.experience.description")}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-foreground">+{worksCount} {t("home.widget.team.projects.metric")}</span>
            <span className="text-xs capitalize text-secondary">{t("home.widget.team.projects.description")}</span>
          </div>
        </div>
      </Stack.Content>
    </Stack.Wrapper>
  )
}
export { TeamInfo }
