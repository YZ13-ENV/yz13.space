import { Locales } from "@/dictionaries/tools"
import { LuMenu } from "react-icons/lu"
import { DockContent } from "./ui/content"
import { Contacts } from "./ui/section/contacts"
import { Menu } from "./ui/section/menu"
import { User } from "./ui/section/user"
import { Trigger } from "./ui/trigger"
import { DockWrapper } from "./ui/wrapper"

const Dock = ({ lang = "en" }: { lang?: Locales }) => {
  return (
    <DockWrapper>
      <DockContent
        content={{
          "menu": <Menu lang={lang} />
        }}
      />
      <div className="flex items-center shrink-0 justify-center mx-auto h-14 w-full gap-1.5">
        <Trigger value="menu">
          <LuMenu size={16} />
        </Trigger>
        <Contacts />
        <Trigger value="user">
          <User />
        </Trigger>
      </div>
    </DockWrapper>
  )
}
export { Dock }
