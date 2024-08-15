import { Stack } from "@/components/stack"
import { getI18n } from "@/locales/server"
import { TechStack } from "./tech-stack"


const About = async () => {
  const t = await getI18n()
  return (
    <Stack.Wrapper hovered store={{ expanded: true }}>
      <Stack.Header expandable>
        <h2 className="text-lg text-foreground">{t("home.widget.about.title")}</h2>
      </Stack.Header>
      <Stack.Content>
        <p className="text-base text-foreground/60">{t("home.widget.about.description")}</p>
      </Stack.Content>
      <Stack.Expandable>
        <TechStack />
      </Stack.Expandable>
    </Stack.Wrapper>
  )
}
export { About }
