import { members } from "@/actions/team-members"
import { works } from "@/actions/works"
import { getI18n } from "@/locales/server"
import dayjs from "dayjs"
import { TeamAvatars } from "./team-avatars"
import { Button } from "@yz13/mono/components/button"
import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"

const TeamInfo = async () => {
  const now = dayjs()
  const year = now.year()
  const team = await members()
  const data = team?.data ?? []
  const membersExperience = data ? data?.map(member => (year + 1) - (member["experience-from"] ?? 2024)) : []
  const combinedExperience = membersExperience.length ? membersExperience.reduce((a, b) => a + b) : 0
  const allWorks = await works()
  const worksCount = allWorks?.data ? allWorks?.data.length : 0
  const t = await getI18n()
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-lg text-foreground">{t("home.widget.about.title")}</h2>
      <div className="w-full flex flex-col h-fit gap-4">
        <div className="w-full h-fit flex flex-col">
          <p className="text-sm text-foreground/60">{t("home.widget.team.text")}</p>
        </div>
        <div className="w-full flex h-fit items-center justify-between flex-row pb-3 gap-3">
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
          {/*
          <Button variant="secondary" className="gap-1.5" size="sm" asChild>
            <Link href="/team">
              {t("home.widget.team.button")}
              <ArrowRightIcon size={14} />
            </Link>
          </Button>
          */}
        </div>
      </div>
    </div>
  )
}
export { TeamInfo }
