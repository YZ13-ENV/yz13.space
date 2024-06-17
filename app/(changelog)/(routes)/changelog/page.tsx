import { Contacts } from "@/app/(threads)/_components/contacts"
import { Footer } from "@/app/(threads)/_components/footer"
import { LeftSide } from "@/app/_components/left"
import { RightSide } from "@/app/_components/right"
import { RightContentContainer } from "@/app/_components/right-content-container"
import { SplitViewContainer } from "@/app/_components/split-view-container"
import { Separator } from "@repo/ui/separator"
import Link from "next/link"
import { BiLeftArrowAlt } from "react-icons/bi"
import { ChangeLog } from "../../_components/change-log"

const page = () => {
  return (
    <SplitViewContainer>
      <LeftSide>
        <div className="w-full h-full flex items-center justify-center">
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
        </div>
      </LeftSide>
      <RightSide>
        <RightContentContainer className="relative">
          <ChangeLog>
            <h2 className="text-2xl font-bold">Introducing changelog</h2>
            <p>
              I wanna start write some changelogs, to have ability to track changes.
              I have a lot of portfolio ideas, so check back from time to time to see new features.
            </p>
            <p>Other changes:</p>
            <ul>
              <li>Page ranking</li>
              <li>Fixed css styles</li>
              {/* <li>Comments space</li> */}
            </ul>
            <h3 className="text-xl font-bold">Ideas</h3>
            <p>
              I want to try to make a page where users can interact with each other,
              where users can see each other's cursors, etc.
            </p>
          </ChangeLog>
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