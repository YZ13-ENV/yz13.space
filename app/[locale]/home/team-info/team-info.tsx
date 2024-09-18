import { Locales } from "@/locales/server"
import { TeamAbout } from "./team-about"
import { TeamExperience } from "./team-experience"

const TeamInfo = async ({ lang = 'en' }: { lang?: Locales }) => {
  return (
    <div className="flex flex-col gap-3">
      <TeamAbout lang={lang} />
      <TeamExperience lang={lang} />
    </div>
  )
}
export { TeamInfo }
