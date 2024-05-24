import { yz13_dark } from "@yz13/assets/brand"
import Image from "next/image"
import Link from "next/link"
import { BiLeftArrowAlt } from "react-icons/bi"
import { MdBarChart, MdGridView } from "react-icons/md"

type Props = {
  params: {
    owner: string
    repo: string
  }
}
const page = ({ params }: Props) => {
  const OWNER = params.owner
  const REPO = params.repo
  return (
    <>
      <header className="w-full h-16">
        <div className="max-w-4xl px-6 h-full flex items-center justify-between w-full mx-auto">
          <Image src={yz13_dark} width={32} height={32} alt="logo" />
          <div className="w-9 h-9 rounded-full bg-secondary" />
        </div>
      </header>
      <div className="p-6 max-w-4xl w-full mx-auto">
        <div className="flex items-center gap-2">
          <Link
            href={"/" + OWNER}
            className="px-2 py-1 rounded-lg text-sm inline-flex gap-2 items-center transition-colors bg-accents-2/50 hover:bg-accents-2 text-foreground/70"
          >
            <BiLeftArrowAlt size={14} />
            Back
          </Link>
          <Link
            href={"/" + OWNER + "/" + REPO}
            className="px-2 py-1 rounded-lg text-sm inline-flex gap-2 items-center transition-colors bg-accents-2/50 hover:bg-accents-2 text-foreground/70"
          >
            <MdGridView size={14} />
            Overview
          </Link>
          <Link
            href={"/" + OWNER + "/" + REPO + "/speed-insights"}
            className="px-2 py-1 rounded-lg text-sm inline-flex gap-2 items-center transition-colors bg-accents-2/50 hover:bg-accents-2 text-foreground/70"
          >
            <MdBarChart size={14} />
            Speed insights
          </Link>
        </div>
      </div>
    </>
  )
}
export default page