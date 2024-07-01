import { Suspense } from "react"
import { Contacts } from "../(threads)/_components/contacts"
import { Footer } from "../(threads)/_components/footer"
import { YZ13Info, YZ13InfoSkeleton } from "../(threads)/_components/yz13-info"
import { Header } from "../_components/header"
import { LeftSide } from "../_components/left"
import { RightSide } from "../_components/right"
import { SplitViewContainer } from "../_components/split-view-container"
import { Terminal } from "./terminal"

const page = async () => {
  return (
    <SplitViewContainer className="lg:divide-x lg:divide-y-0 divide-x-0 divide-y">
      <LeftSide>
        <div className="p-6 space-y-6">
          <div className="w-full">
            <h1 className="lg:text-9xl md:text-7xl text-9xl font-bold">Works</h1>
          </div>
          <div className="w-full">
            <Suspense fallback={<YZ13InfoSkeleton />}>
              <YZ13Info />
            </Suspense>
          </div>
        </div>
      </LeftSide>
      <RightSide className="divide-y">
        <Header />
        <Terminal />
        <div className="w-full p-6 space-y-6">
          <Contacts />
          <Footer />
        </div>
      </RightSide>
    </SplitViewContainer>
  )
}
export default page