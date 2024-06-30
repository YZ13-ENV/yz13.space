import { Suspense } from "react"
import { Contacts } from "../(threads)/_components/contacts"
import { Footer } from "../(threads)/_components/footer"
import { YZ13Info, YZ13InfoSkeleton } from "../(threads)/_components/yz13-info"
import { Header } from "../_components/header"
import { LeftSide } from "../_components/left"
import { RightSide } from "../_components/right"
import { SplitViewContainer } from "../_components/split-view-container"

const page = async () => {
  return (
    <SplitViewContainer className="lg:divide-x lg:divide-y-0 divide-x-0 divide-y">
      <LeftSide>
        <div className="w-full h-full flex xl:items-center items-start justify-center">
          <Suspense fallback={<YZ13InfoSkeleton />}>
            <YZ13Info />
          </Suspense>
        </div>
      </LeftSide>
      <RightSide className="divide-y">
        <Header />
        <div className="space-y-6 w-full h-fit">
          <div className="w-full h-fit flex flex-col lg:flex-row divide-x">
            <div className="lg:w-2/3 w-full h-fit space-y-3 p-6">
              <span className="text-lg font-semibold">Last updates</span>
              <ul className="space-y-1.5">
                <li className="w-full h-9">
                  <button className="w-full h-full flex gap-2 items-center rounded-lg hover:px-2 transition-all hover:bg-yz-neutral-100">
                    <span className="text-secondary">12 Nov, 12:00</span>
                    <span className="line-clamp-1">New service is out</span>
                  </button>
                </li>
              </ul>
            </div>
            <div className="w-full lg:w-1/3 h-full p-6">
              <div className="w-full h-96 rounded-3xl border bg-yz-neutral-100"></div>
            </div>
          </div>
          <div className="w-full min-h-[50dvh] h-fit p-6">
            <div className="flex items-center justify-center w-full h-full">
              <span className="text-sm text-secondary">
                Здесь будут отображаться работы
              </span>
            </div>
          </div>
        </div>
        <div className="w-full p-6 space-y-6">
          <Contacts />
          <Footer />
        </div>
      </RightSide>
    </SplitViewContainer>
  )
}
export default page