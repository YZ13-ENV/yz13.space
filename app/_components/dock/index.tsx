import { Locales } from "@/dictionaries/tools"
import { Separator } from "@/packages/ui/src/components/separator"
import { Menu } from "./menu"
import { Owner } from "./owner"
import { User } from "./user"
import { Works } from "./works"
import { DockWrapper } from "./wrapper"

const Dock = ({ lang: provided_lang }: { lang?: Locales }) => {
  return (
    <DockWrapper>
      <Menu lang={provided_lang} />
      <Separator className="h-2/3" orientation="vertical" />
      <Works lang={provided_lang} />
      {/* <DockTerminal /> */}
      <Owner lang={provided_lang} />
      <User />
    </DockWrapper>
  )
}
export { Dock }
