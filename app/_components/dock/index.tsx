import { Separator } from "@/packages/ui/src/components/separator"
import { Menu } from "./menu"
import { Owner } from "./owner"
import { User } from "./user"
import { Works } from "./works"
import { DockWrapper } from "./wrapper"

const Dock = () => {
  return (
    <DockWrapper>
      <Menu />
      <Separator className="h-2/3" orientation="vertical" />
      <Works />
      <Owner />
      <Separator className="h-2/3" orientation="vertical" />
      <User />
    </DockWrapper>
  )
}
export { Dock }
