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
      <Link href="/" className='text-2xl font-semibold'>YZ13</Link>
      <User />
    </DynamicHeaderWrapper>
  )
}
export { HomeHeader }
