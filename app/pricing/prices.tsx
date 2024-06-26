import { getDictionary } from "@/dictionaries/tools"
import { cn } from "@/packages/ui/lib/utils"
import { BiCheckCircle } from "react-icons/bi"
import { Button } from "../(threads)/_components/thread/ui/sub-threads/button"

type Props = {
  locale?: string
}
const Pricing = async ({ locale = 'en-US' }: Props) => {
  const dict: any = await getDictionary(locale)
  const pricingDict = dict?.pricing
  const PricingCard = ({ dictKey, className = "" }: { dictKey: string, className?: string }) => {
    const cardDict = pricingDict[dictKey]
    const cardName = cardDict.name
    const description = cardDict.description
    const pricing = cardDict.price
    const side = cardDict.side
    const pricingSign = cardDict.sign
    const prefix = cardDict.prefix
    const button = pricingDict.button
    const list = (cardDict.list || []) as string[]
    return (
      <div className={cn(
        "h-96 aspect-[1/1.25] flex flex-col gap-2 rounded-xl border p-4",
        "hover:bg-yz-neutral-100/40 cursor-pointer transition-colors",
        className
      )}>
        <h4 className="text-lg font-semibold capitalize">{cardName}</h4>
        {
          prefix ?
            <span className="text-sm">{prefix}</span>
            : <span className="text-sm">pause or cancel anytime</span>
        }
        <span className="text-4xl font-bold text-foreground">
          {side === "left" && pricingSign}
          {(pricing).toLocaleString()}
          {side === "right" && pricingSign}
        </span>
        {
          description &&
          <p className="text-sm text-secondary">{description}</p>
        }
        <ul className="py-4 space-y-2">
          {
            list.map((item, i) =>
              <li key={dictKey + "/" + item + "-" + i}>
                <div className="flex items-center gap-2">
                  <BiCheckCircle className="shrink-0" size={16} />
                  <span className="text-sm">{item}</span>
                </div>
              </li>
            )
          }
        </ul>
        <Button className="w-full mt-auto">{button}</Button>
      </div>
    )
  }
  return (
    <div className="flex lg:flex-row flex-col items-center w-full overflow-x-auto divide-y lg:divide-x h-fit no-scrollbar">
      <PricingCard className="lg:w-1/3 w-full border-0 rounded-none" dictKey="components" />
      <PricingCard className="lg:w-1/3 w-full border-0 rounded-none" dictKey="pages" />
      <PricingCard className="lg:w-1/3 w-full border-0 rounded-none" dictKey="website" />
    </div>
  )
}
export { Pricing }
