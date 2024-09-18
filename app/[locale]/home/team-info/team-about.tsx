import { getI18n, Locales } from "@/locales/server";


const TeamAbout = async ({ lang = "en" }: { lang?: Locales }) => {
  const t = await getI18n()
  return (
    <>
      <h2 className="text-lg text-foreground">{t("home.widget.about.title")}</h2>
      <p className="text-sm text-foreground/60">{t("home.widget.team.text")}</p>
    </>
  )
}
export { TeamAbout }
