import { Button } from "@yz13/mono/components/button"
import { FolderCodeIcon, HomeIcon, StickerIcon } from "lucide-react"
import Link from "next/link"

const NavList = () => {
  return (
    <>
      <Button
        className="md:!w-full md:px-2 px-0 justify-center w-9 md:!justify-start gap-2 font-normal"
        variant="ghost" asChild
      >
        <Link href="/home">
          <HomeIcon size={20} />
          <span className="lg:!inline hidden">Home</span>
        </Link>
      </Button>
      <Button
        className="md:!w-full md:px-2 px-0 justify-center w-9 md:!justify-start gap-2 font-normal"
        variant="ghost" asChild
      >
        <Link href="/works">
          <FolderCodeIcon size={20} />
          <span className="lg:!inline hidden">Works</span>
        </Link>
      </Button>
      <Button
        className="md:!w-full md:px-2 px-0 justify-center w-9 md:!justify-start gap-2 font-normal"
        variant="ghost" asChild
      >
        <Link href="/journal">
          <StickerIcon size={20} />
          <span className="lg:!inline hidden">Journal</span>
        </Link>
      </Button>
    </>
  )
}
export { NavList }
