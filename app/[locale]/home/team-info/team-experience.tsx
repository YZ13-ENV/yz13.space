import { getI18n, Locales } from "@/locales/server"
import { TeamAvatars } from "./team-avatars"
import { works } from "@/actions/works"
import { members } from "@/actions/team-members"
import dayjs from "dayjs"

const TeamExperience = async ({ lang = 'en' }: { lang?: Locales }) => {
  const t = await getI18n()
  const now = dayjs()
  const year = now.year()
  const team = await members()
  const data = team?.data ?? []
  const membersExperience = data ? data?.map(member => (year + 1) - (member["experience-from"] ?? 2024)) : []
  const combinedExperience = membersExperience.length ? membersExperience.reduce((a, b) => a + b) : 0
  const allWorks = await works()
  const worksCount = allWorks ? allWorks.length : 0
  return (
    <div className="flex items-center gap-3">
      <TeamAvatars className="w-fit" members={data} max={4} />
      <div className="flex flex-col gap-1">
        <span className="text-sm text-foreground">+{combinedExperience} {t("home.widget.team.experience.metric")}</span>
        <span className="text-xs capitalize text-secondary">{t("home.widget.team.experience.description")}</span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm text-foreground">+{worksCount} {t("home.widget.team.projects.metric")}</span>
        <span className="text-xs capitalize text-secondary">{t("home.widget.team.projects.description")}</span>
      </div>
    </div>
  )
}
export { TeamExperience }
