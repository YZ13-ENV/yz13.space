import { Button } from "@/packages/ui/src/components/button"
import Link from "next/link"
import { BiRightArrowAlt } from "react-icons/bi"



const AdBanner = () => {
  return (
    <div
      className="w-full relative min-h-20 p-6 flex justify-between items-center gap-4 lg:border-0 border-x border-t"
    >
      <div className="flex flex-col w-fit">
        <h2 className="text-lg font-semibold">JSON Store is out</h2>
        <p className="text-sm">Website to edit, NPM package to get</p>
      </div>
      <Button className="gap-2" asChild>
        <Link href="https://json.yz13.space">
          Try it
          <BiRightArrowAlt size={16} />
        </Link>
      </Button>
    </div>
  )
}
export { AdBanner }
