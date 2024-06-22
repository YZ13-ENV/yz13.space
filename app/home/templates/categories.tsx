import { getDictionary } from "@/dictionaries/tools"



const categoriesCount = Array.from({ length: 6 }).map((_, i) => i)

const categories = async (lang: string) => {
  const dict: any = await getDictionary(lang)
  const homeDict = dict?.home
  const templates = homeDict.templates
  const categories = (templates.categories as string[])
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(categories)
    }, 5000)
  })
}

const CategoriesPlaceholderSkeleton = () => {
  return (
    <>
      {
        categoriesCount.map(
          item =>
            <div
              key={`template-skeleton#${item}`}
              className="w-full p-2 aspect-video bg-yz-neutral-200 animate-pulse border rounded-lg"
            >
            </div>
        )
      }
    </>
  )
}

const CategoriesGrid = async ({ lang = "en-US" }: { lang?: string }) => {
  const templates = await categories(lang)
  return (
    <>
      {
        (templates as string[]).map(
          category =>
            <div key={category} className="w-full p-2 aspect-video flex flex-col items-center justify-center h-full border rounded-lg">
              <span>{category}</span>
            </div>
        )
      }
    </>
  )
}

export { CategoriesGrid, CategoriesPlaceholderSkeleton }
