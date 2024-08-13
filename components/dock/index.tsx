import { Locales } from "@/dictionaries/tools"
import { Skeleton } from "@yz13/mono/components/skeleton"
import { Suspense } from "react"
import { LuLayoutGrid, LuMenu } from "react-icons/lu"
import { Contacts } from "./content/contacts"
import { ControlCenter } from "./content/control-center"
import { Menu } from "./content/menu"
import { User } from "./content/user"
import { DockContent } from "./ui/content"
import { Container, Wrapper } from "./ui/dock"
import { Trigger } from "./ui/trigger"

const Root = ({ lang = "en" }: { lang?: Locales }) => {
  return (
    <Container>
      <Wrapper>
        <DockContent
          content={{
            "menu": <Menu lang={lang} />,
            "control-center": <ControlCenter lang={lang} />
          }}
        />
        <div className="flex items-center shrink-0 justify-center mx-auto h-10 w-fit gap-1.5">
          <Trigger value="menu">
            <LuMenu size={20} />
          </Trigger>
          <Suspense fallback={
            <>
              <Skeleton className="size-6 rounded-full" />
              <Skeleton className="size-6 rounded-full" />
              <Skeleton className="size-6 rounded-full" />
            </>
          }>
            <Contacts />
          </Suspense>
          <Trigger value="control-center">
            <LuLayoutGrid size={20} />
          </Trigger>
          <Trigger value="user">
            <Suspense fallback={<Skeleton className="size-6 rounded-full" />}>
              <User size={48} />
            </Suspense>
          </Trigger>
        </div>
      </Wrapper>
    </Container>
  )
}
export default Root
