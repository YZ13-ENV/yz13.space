import { ThemeSwitcher } from "@/app/_components/entities/theme"
import { ThemedLogo } from "@/components/shared/theme-logo"
import { User } from "@/components/shared/user"
import Link from "next/link"
import { DynamicHeaderWrapper } from "./dynamic-header-wrapper"

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
      <Link href="/" className='inline-flex items-center gap-1'>
        <ThemedLogo width={120} mode="full" height={32} alt='header-logo' />
      </Link>
      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        <User />
      </div>
    </DynamicHeaderWrapper>
  )
}
export { HomeHeader }
