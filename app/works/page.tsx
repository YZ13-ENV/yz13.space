import { Suspense } from "react"
import { Contacts } from "../(threads)/_components/contacts"
import { Footer } from "../(threads)/_components/footer"
import { Header } from "../_components/header"
import { LeftSide } from "../_components/left"
import { RightSide } from "../_components/right"
import { SplitViewContainer } from "../_components/split-view-container"
import { Works } from "./works"

const page = async () => {
  return (
    <SplitViewContainer className="lg:divide-x lg:divide-y-0 divide-x-0 divide-y">
      <LeftSide>
        <div className="p-6 space-y-6">
          <div className="w-full">
            <h1 className="xl:text-9xl lg:text-8xl md:text-7xl text-8xl font-bold">Works</h1>
          </div>
          <div className="w-full h-64 rounded-xl border p-6">
            <div style={{ height: "calc(100% - 36px)" }} className="w-full h-full">
              <span className="text-4xl font-semibold text-foreground">Ohh, i so in love with those designs</span>
            </div>
            <div className="w-full h-9 flex justify-end">
              <div className="w-9 aspect-square rounded-full bg-yz-neutral-100" />
            </div>
          </div>
        </div>
      </LeftSide>
      <RightSide className="divide-y">
        <Header />
        <Suspense fallback={<div className="w-full aspect-video bg-yz-neutral-100 animate-pulse" />}>
          <Works />
        </Suspense>
        <div className="w-full p-6 space-y-6">
          <Contacts />
          <Footer />
        </div>
      </RightSide>
    </SplitViewContainer>
  )
}
export default page