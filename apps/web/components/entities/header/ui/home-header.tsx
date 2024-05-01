import { Time } from "@/app/_components/time"
import { SwitcherIndicator } from "@/app/_components/widgets/section-switcher/ui/switcher-indicator"
import { User } from "@/components/shared/user"
import { Button } from "@repo/ui/button"
import Link from "next/link"
import { DynamicHeaderWrapper } from "./dynamic-header-wrapper"
import { DynamicLogoSection } from "./dynamic-logo-section"
import { Nav } from "./nav"

const HomeHeader = () => {
  return (
    <DynamicHeaderWrapper
      trigger={500}
      activeClassName="backdrop-blur"
    >
      <DynamicLogoSection
        trigger={500}
        initialElement={<SwitcherIndicator />}
        completedElement={<Link href="/" className='text-2xl font-semibold'>YZ13</Link>}
      />
      <div className="flex items-center gap-3">
        <Nav />
        <Button className="hidden rounded-full md:flex bg-muted/50 backdrop-blur-sm border" variant="secondary">
          <Time format="dd, DD MMMM HH:mm" />
        </Button>
      </div>
      <User />
    </DynamicHeaderWrapper>
  )
}
export { HomeHeader }
