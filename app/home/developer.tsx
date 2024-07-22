import { Locales, getDict } from "@/dictionaries/tools"
import { Description } from "./description"

const Developer = async ({ lang = "en" }: { lang?: Locales }) => {
  const dict = await getDict<any>("home", lang)
  const title = dict["title"]
  const description = dict["description"]
  const position = dict["position"]
  const descriptionList: string[] = description.split(" ")
  return (
    <div className="w-full h-fit relative">
      <section className="w-full flex flex-col gap-1.5 py-3">
        <h1 className="text-4xl uppercase font-medium">{title}</h1>
        <p className="text-4xl py-4 uppercase font-medium">{position}</p>
        <div className="w-full">
          <Description description={descriptionList} />
        </div>
      </section>
    </div>
  )
}

const DeveloperSkeleton = () => {
  return (
    <div className="w-full h-fit relative">
      <section className="w-full flex flex-col gap-1.5 py-3">
        <h1 className="w-full h-10 rounded-lg bg-yz-neutral-300 animate-pulse" />
        <p className="w-full h-10 my-4 rounded-lg bg-yz-neutral-300 animate-pulse" />
        <div className="space-y-1">
          <p className="w-full h-7 rounded-md bg-yz-neutral-300 animate-pulse" />
          <p className="w-2/3 h-7 rounded-md bg-yz-neutral-300 animate-pulse" />
          <p className="w-1/2 h-7 rounded-md bg-yz-neutral-300 animate-pulse" />
        </div>
      </section>
    </div>
  )
}

export { Developer, DeveloperSkeleton }
