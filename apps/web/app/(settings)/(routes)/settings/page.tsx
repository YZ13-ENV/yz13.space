import { Footer } from "@/app/(threads)/_components/footer"
import { LeftSide } from "@/app/_components/left"
import { RightSide } from "@/app/_components/right"
import { RightContentContainer } from "@/app/_components/right-content-container"
import { SplitViewContainer } from "@/app/_components/split-view-container"
import { Input } from "@repo/ui/input"
import Link from "next/link"
import { BiLeftArrowAlt } from "react-icons/bi"

const page = () => {
  return (
    <SplitViewContainer mode="1:2">
      <LeftSide>
        <div className="lg:max-w-sm max-w-xl w-full space-y-5 p-6">
          <div className="space-y-2">
            <h2 className="text-4xl font-semibold">Settings</h2>
            <p className="text-secondary">Just settings :)</p>
          </div>
          <Link href="/" className="inline-flex hover:bg-accents-1 rounded-lg gap-2 items-center h-9 px-3 transition-colors">
            <BiLeftArrowAlt size={16} />
            <span className="text-sm">Go back</span>
          </Link>
        </div>
      </LeftSide>
      <RightSide>
        <RightContentContainer>
          <section className="space-y-3 w-full p-4 h-fit border rounded-xl bg-accents-1">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold">Name</h3>
              <p className="text-sm text-secondary">
                Name that users can know you there
              </p>
            </div>
            <Input className="bg-background" placeholder="Enter name" />
          </section>
          <Footer className="pb-6 pt-12 w-full" />
        </RightContentContainer>
      </RightSide>
    </SplitViewContainer>
  )
}
export default page