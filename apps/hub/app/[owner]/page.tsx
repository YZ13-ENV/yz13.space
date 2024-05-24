import { Button } from "@repo/ui/button"
import { Folder, FolderFront } from "@repo/ui/svg/folder"
import { yz13_dark } from "@yz13/assets/brand"
import Image from "next/image"
import Link from "next/link"
import { BiDotsHorizontalRounded } from "react-icons/bi"

type Props = {
  params: {
    owner: string
  }
}
const page = ({ params }: Props) => {
  const OWNER = params.owner
  const ProjectCard = ({ link }: { link: string }) => {
    return (
      <div className="w-fit folder h-fit flex flex-col items-center justify-center relative">
        <Folder className="folder-back" />
        <div className="absolute folder-images bottom-24 w-full flex items-center justify-center gap-4">
          <div className="folder-image"></div>
          <div className="folder-image"></div>
          <div className="folder-image"></div>
          <div className="folder-image"></div>
        </div>
        <div className="absolute bottom-0">
          <div className="absolute w-full h-full flex flex-col justify-between py-2 px-3">
            <Link href={link} className="flex flex-col gap-1">
              <span className="text-foreground">Folder name</span>
              <span className="text-xs">a few items</span>
            </Link>
            <div className="w-full h-fit flex items-center justify-between">
              <div className="flex items-center mt-auto -space-x-3">
                <div className="w-8 aspect-square bg-accents-1 rounded-full border border-accents-3" />
                <div className="w-8 aspect-square bg-accents-1 rounded-full border border-accents-3" />
                <div className="w-8 aspect-square bg-accents-1 rounded-full border border-accents-3" />
              </div>
              <Button size="icon" variant="ghost"><BiDotsHorizontalRounded size={14} /></Button>
            </div>
          </div>
          <FolderFront className="folder-front" />
        </div>
      </div>
    )
  }
  const pr = Array.from({ length: 6 }).map((_, i) => i)
  return (
    <>
      <header className="w-full h-16">
        <div className="max-w-4xl px-6 h-full flex items-center justify-between w-full mx-auto">
          <Image src={yz13_dark} width={32} height={32} alt="logo" />
          <div className="w-9 h-9 rounded-full bg-secondary" />
        </div>
      </header>
      <div className="p-6 max-w-4xl w-full mx-auto">
        <div className="grid py-4 rounded-2xl grid-cols-3 place-items-center gap-6">
          {
            pr.map(project =>
              <ProjectCard key={`${OWNER}/${project}`} link={`/${OWNER}/${project}`} />
            )
          }
        </div>
      </div>
    </>
  )
}
export default page