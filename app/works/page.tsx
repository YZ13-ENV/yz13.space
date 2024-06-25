import { getDictionary } from "@/dictionaries/tools"
import { cn } from "@/packages/ui/lib/utils"
import { Button } from "@/packages/ui/src/components/button"
import { cookies } from "next/headers"
import { BiCheckCircle } from "react-icons/bi"
import { Contacts } from "../(threads)/_components/contacts"
import { Footer } from "../(threads)/_components/footer"
import { Header } from "../_components/header"



const page = async () => {
  const cookiesList = cookies()
  const locale = (cookiesList.get("locale")?.value || "").slice(0, 2)
  const dict: any = await getDictionary(locale)
  const pricingDict = dict?.pricing
  const Pricing = () => {
    const PricingCard = ({ dictKey }: { dictKey: string }) => {
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
          "hover:border-foreground hover:bg-yz-neutral-100/40 cursor-pointer transition-colors"
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
      <div className="flex items-center w-full gap-4 overflow-x-auto h-fit no-scrollbar">
        <PricingCard dictKey="components" />
        <PricingCard dictKey="pages" />
        <PricingCard dictKey="website" />
      </div>
    )
  }
  const Packages = () => {
    return (
      <div className="w-full px-6">
        <span className="text-sm">Packages</span>
        <ul className="">
          <li className="flex w-full gap-4 py-2 transition-colors border-b min-h-9 hover:border-foreground">
            <div className="h-24 border rounded-lg aspect-video"></div>
            <div className="flex flex-col w-full">
              <span className="text-base font-medium">Package name</span>
              <span className="text-xs text-secondary">Package description</span>
              <Button className="mt-auto w-fit">Visit</Button>
            </div>
          </li>
        </ul>
      </div>
    )
  }
  const Websites = () => {
    return (
      <div className="w-full px-6">
        <span className="text-sm">Builded sites</span>
        <ul className="">
          <li className="flex w-full gap-4 py-2 transition-colors border-b min-h-9 hover:border-foreground">
            <div className="h-24 border rounded-lg aspect-video"></div>
            <div className="flex flex-col w-full">
              <span className="text-base font-medium">App name</span>
              <span className="text-xs text-secondary">App description</span>
              <Button className="mt-auto w-fit">Visit</Button>
            </div>
          </li>
        </ul>
      </div>
    )
  }
  return (
    <>
      <Header />
      <div className="relative w-full max-w-5xl mx-auto mt-20">
        <div className="relative flex flex-col items-center justify-center w-full gap-2 aspect-video">
          <h1 className="text-5xl font-bold">
            Explore my works
          </h1>
          <p className="text-xl text-center text-secondary">
            Hope you like it
          </p>
        </div>
      </div>
      <div className="relative w-full max-w-5xl mx-auto">
        <div className="space-y-6">
          <div className="flex items-center justify-center w-full aspect-video">
            <span className="text-sm text-secondary">
              Здесь будут отображаться работы
            </span>
          </div>
        </div>
        <div className="w-full p-6 space-y-6 rounded-t-3xl border bg-yz-neutral-100">
          <Contacts />
          <Footer />
        </div>
      </div>
    </>
  )
}
export default page