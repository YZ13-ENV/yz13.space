import { LocalizedHeading } from "@/components/localized-heading"
import { LocalizedText } from "@/components/localized-text"
import { Stack } from "@/components/stack"
import { Locales } from "@/dictionaries/tools"
import { BiUser } from "react-icons/bi"


const About = ({ lang = "en" }: { lang?: Locales }) => {
  return (
    <Stack.Wrapper hovered>
      <Stack.Header>
        <span className="size-7 group-hover:border-foreground transition-colors inline-flex items-center justify-center rounded-full border">
          <BiUser size={14} className="text-foreground" />
        </span>
        <LocalizedHeading
          className="text-lg text-foreground"
          dict="home"
          field="title"
          lang={lang}
        />
      </Stack.Header>
      <Stack.Content>
        <LocalizedText
          className="text-base text-foreground/60"
          dict="home"
          field="description"
          lang={lang}
        />
      </Stack.Content>
    </Stack.Wrapper>
  )
}
export { About }
