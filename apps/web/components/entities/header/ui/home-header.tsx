import { Time } from "@/app/_components/time"
import { User } from "@/components/shared/user"
import { Button } from "@repo/ui/button"
import Link from "next/link"
import { DynamicHeaderWrapper } from "./dynamic-header-wrapper"
import { Nav } from "./nav"

type Props = {
  className?: string
}
const HomeHeader = ({ className = "" }: Props) => {
  return (
    <DynamicHeaderWrapper
      trigger={100}
      className={className}
      activeClassName="backdrop-blur"
    >
      <Link href="/" className='text-2xl font-semibold'>YZ13</Link>
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
