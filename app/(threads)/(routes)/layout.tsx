import { LeftSide } from "@/app/_components/left"
import { Logo } from "@/app/_components/logo"
import { RightSide } from "@/app/_components/right"
import { SplitViewContainer } from "@/app/_components/split-view-container"
import { cookies } from "next/headers"
import { ReactNode } from "react"
import { YZ13Info } from "../_components/yz13-info"

type Props = {
  children?: ReactNode
}
const layout = async ({ children }: Props) => {
  const cookiesList = cookies()
  const locale = (cookiesList.get("locale")?.value || "").slice(0, 2)
  const localeCode = locale.toUpperCase()
  return (
    <>
      <SplitViewContainer>
        <LeftSide>
          <div className="xl:absolute w-fit xl:mb-0 mb-6 relative top-6 left-6">
            <Logo size={32} lang={localeCode} />
          </div>
          <div className="w-full h-full flex xl:items-center items-start justify-center">
            <YZ13Info />
          </div>
        </LeftSide>
        <RightSide>
          {children}
        </RightSide>
      </SplitViewContainer>
    </>
  )
}
export default layout