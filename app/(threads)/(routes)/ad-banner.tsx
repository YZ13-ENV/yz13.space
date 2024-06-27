import { getDict, getLocale } from "@/dictionaries/tools"
import { Button } from "@/packages/ui/src/components/button"
import Link from "next/link"
import { BiRightArrowAlt } from "react-icons/bi"



const AdBanner = async () => {
  const locale = getLocale()
  const adDict = await getDict<any>("ad", locale)
  const json = adDict["json-banner"]
  return (
    <div
      className="w-full relative min-h-20 p-6 flex justify-between items-center gap-4"
    >
      <div className="flex flex-col w-fit">
        <h2 className="text-lg font-semibold">{json.title}</h2>
        <p className="text-sm">{json.description}</p>
      </div>
      <Button className="gap-2" asChild>
        <Link href="https://json.yz13.space">
          {json.action}
          <BiRightArrowAlt size={16} />
        </Link>
      </Button>
    </div>
  )
}
export { AdBanner }
