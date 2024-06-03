import { Contacts } from "@/app/(threads)/_components/contacts"
import { Footer } from "@/app/(threads)/_components/footer"
import { LeftSide } from "@/app/_components/left"
import { RightSide } from "@/app/_components/right"
import { RightContentContainer } from "@/app/_components/right-content-container"
import { SplitViewContainer } from "@/app/_components/split-view-container"
import { Separator } from "@repo/ui/separator"
import Link from "next/link"
import { BiLeftArrowAlt } from "react-icons/bi"
import { Change_3_05_2024 } from "../../_logs/3-05-2024"

const page = () => {
  return (
    <SplitViewContainer>
      <LeftSide>
        <div className="lg:max-w-sm max-w-xl w-full space-y-5 p-6">
          <div className="space-y-2">
            <h2 className="text-4xl font-semibold">Changelog</h2>
            <p className="text-secondary">Changes history</p>
          </div>
          <Link href="/" className="inline-flex hover:bg-accents-1 rounded-lg gap-2 items-center h-9 px-3 transition-colors">
            <BiLeftArrowAlt size={16} />
            <span className="text-sm">Go back</span>
          </Link>
        </div>
      </LeftSide>
      <RightSide>
        <RightContentContainer className="relative">
          <Change_3_05_2024 />
          <Separator />
          <div>
            <Contacts />
            <Footer />
          </div>
        </RightContentContainer>
      </RightSide>
    </SplitViewContainer>
  )
}
export default page