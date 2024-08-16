import { Locales } from "@/locales/server"
import { ControlCenter } from "./content/control-center"
import { Menu } from "./content/menu"
import { User } from "./content/user"
import { Plank } from "./plank"
import { Settings } from "./settings"
import { DockContent } from "./ui/content"
import { Container, Wrapper } from "./ui/dock"

const Root = ({ lang = "en" }: { lang?: Locales }) => {
  return (
    <Container>
      <Wrapper>
        <DockContent
          content={{
            "menu": <Menu />,
            "control-center": <ControlCenter lang={lang} />,
            "settings": <Settings lang={lang} />,
            "user": <User lang={lang} />
          }}
        />
        <Plank />
      </Wrapper>
    </Container>
  )
}
export default Root
