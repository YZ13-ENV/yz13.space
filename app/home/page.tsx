import { Button } from "@/packages/ui/src/components/button"
import Link from "next/link"
import { AdBanner } from "../(threads)/(routes)/ad-banner"
import { LeftSide } from "../_components/left"
import { Nav } from "../_components/nav"
import { RightSide } from "../_components/right"
import { SplitViewContainer } from "../_components/split-view-container"
import { Library } from "./library"

const page = async () => {
  return (
    <SplitViewContainer>
      <LeftSide>
        {/* <Header /> */}
        <div className="relative w-full h-full max-w-5xl mx-auto">
          <div className="relative flex flex-col items-center justify-center w-full gap-2 h-full">
            <h1 className="text-5xl text-center font-bold">Help you get what you want</h1>
            <p className="text-xl text-center text-secondary">web developer</p>
          </div>
        </div>
      </LeftSide>
      <RightSide className="divide-y">
        <div className="w-full h-16 flex items-center px-6">
          <Nav />
        </div>
        <AdBanner />
        <div className="p-6">
          <Library />
        </div>
        <div className="w-full flex flex-col gap-3 p-6">
          <p className="inline-flex flex-col text-2xl font-semibold text-secondary">
            <b className="text-foreground shrink-0">ready</b>
            abs
          </p>
          <Button className="w-fit" asChild>
            <Link href="/contact">
              action
            </Link>
          </Button>
        </div>
        <footer
          className="w-full p-6 mx-auto h-fit"
          dangerouslySetInnerHTML={{ __html: "footer.description" }}
        >
        </footer>
      </RightSide>
    </SplitViewContainer>
  )
}
export default page