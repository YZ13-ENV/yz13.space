import { getDictionary } from "@/dictionaries/tools"
import { Suspense } from "react"
import { CategoriesGrid, CategoriesPlaceholderSkeleton } from "./categories"

type Props = {
  lang?: string
}
const Templates = async ({ lang = "en-US" }: Props) => {
  const dict: any = await getDictionary(lang)
  const homeDict = dict?.home
  const templates = homeDict.templates
  return (
    <div className="flex flex-col gap-3 w-full max-w-4xl mx-auto px-6 py-12 md:flex-row h-fit">
      <div className="w-full space-y-2 p-2 md:w-1/3">
        <h2 className="text-2xl font-semibold">{templates.title}</h2>
        <p className="text-base text-secondary">
          {templates.description}
        </p>
      </div>
      <div className="grid w-full templates-grid gap-2 md:w-2/3">
        <Suspense fallback={<CategoriesPlaceholderSkeleton />}>
          <CategoriesGrid />
        </Suspense>
      </div>
    </div>
  )
}
export { Templates }
