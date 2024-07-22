import { Locales, getDict } from "@/dictionaries/tools"
import { Separator } from "@/packages/ui/src/components/separator"
import { StackSection } from "./tech-stack/section"

const Stack = async ({ lang = "en" }: { lang?: Locales }) => {
  const techStackDict = await getDict<any>("tech-stack", lang)
  const title = techStackDict["name"]
  return (
    <>
      <Separator />
      <StackSection title={title} />
      <Separator />
    </>
  )
}

const StackSkeleton = () => {
  return (
    <>
      <Separator />
      <div className="flex justify-center gap-4 w-full">
        <div className="h-6 w-16 rounded-md bg-yz-neutral-300 animate-pulse" />
        <div className="w-9 h-5 rounded-full bg-yz-neutral-300 animate-pulse" />
        <div className="h-6 w-16 rounded-md bg-yz-neutral-300 animate-pulse" />
      </div>
      <div className="w-full h-80 bg-yz-neutral-300 rounded-xl animate-pulse" />
      <Separator />
    </>
  )
}

export { Stack, StackSkeleton }
