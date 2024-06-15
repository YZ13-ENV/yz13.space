import { LeftSide } from "@/app/_components/left"
import { RightSide } from "@/app/_components/right"
import { SplitViewContainer } from "@/app/_components/split-view-container"
import { ReactNode } from "react"
import { YZ13Info } from "../_components/yz13-info"

type Props = {
  children?: ReactNode
}
const layout = ({ children }: Props) => {
  return (
    <>
      <SplitViewContainer>
        <LeftSide>
          <YZ13Info />
        </LeftSide>
        <RightSide>
          {children}
        </RightSide>
      </SplitViewContainer>
    </>
  )
}
export default layout