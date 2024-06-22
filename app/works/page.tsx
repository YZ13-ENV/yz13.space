import { getDictionary } from "@/dictionaries/tools"
import { cn } from "@/packages/ui/lib/utils"
import { Button } from "@/packages/ui/src/components/button"
import { Separator } from "@/packages/ui/src/components/separator"
import { cookies } from "next/headers"
import Link from "next/link"
import { BiCheckCircle } from "react-icons/bi"
import { nav_links } from "../(threads)/(routes)/nav-links"
import { Contacts } from "../(threads)/_components/contacts"
import { Footer } from "../(threads)/_components/footer"
import { Header } from "../home/header"



const page = async () => {
  const cookiesList = cookies()
  const locale = (cookiesList.get("locale")?.value || "").slice(0, 2)
  const localeCode = locale.toUpperCase()
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
          <ul className="space-y-2 py-4">
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
      <div className="w-full h-fit flex items-center gap-4 overflow-x-auto no-scrollbar">
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
          <li className="w-full min-h-9 py-2 flex gap-4 border-b transition-colors hover:border-foreground">
            <div className="h-24 aspect-video border rounded-lg"></div>
            <div className="w-full flex flex-col">
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
          <li className="w-full min-h-9 py-2 flex gap-4 border-b transition-colors hover:border-foreground">
            <div className="h-24 aspect-video border rounded-lg"></div>
            <div className="w-full flex flex-col">
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
      <div className="max-w-3xl h-fit mx-auto w-full z-10 pt-20">
        <div className="w-full h-20 flex items-center justify-center mb-20">
          <h1 className="text-4xl text-center font-bold">Works</h1>
        </div>
        <div className="px-6 w-full flex flex-wrap gap-2 items-start">
          {
            nav_links.map(nav =>
              <Link
                key={nav.link}
                href={nav.link}
                className="px-2 py-1 rounded-md border text-xs cursor-pointer inline-flex gap-1 items-center"
              >
                {nav.icon && nav.icon({ size: 14 })}
                {nav.label}
              </Link>
            )
          }
        </div>
        <div className="py-6 space-y-6">
          <div className="w-full aspect-video rounded-xl border border-dashed flex items-center justify-center">
            <span className="text-sm text-secondary">
              Здесь будут отображаться работы
            </span>
          </div>
        </div>
        <Separator />
        {/* <div className="w-full p-6">
          <Pricing />
        </div>
        <Separator /> */}
        <div className="w-full space-y-6 p-6">
          <Contacts />
          <Footer />
        </div>
      </div>
    </>
  )
}
export default page