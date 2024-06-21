import { getDictionary } from "@/dictionaries/tools"

type Props = {
  lang?: string
}
const Templates = async ({ lang = "en-US" }: Props) => {
  const dict: any = await getDictionary(lang)
  const homeDict = dict?.home
  const templates = homeDict.templates
  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto px-6 py-12 md:flex-row h-fit">
      <div className="w-full space-y-2 p-2 md:w-1/3">
        <h2 className="text-2xl font-semibold">{templates.title}</h2>
        <p className="text-base text-secondary">
          {templates.description}
        </p>
      </div>
      <div className="grid w-full grid-cols-1 grid-rows-6 md:grid-cols-2 md:grid-rows-3 md:w-2/3">
        {
          (templates.categories as string[]).map(
            category =>
              <div key={category} className="w-full p-2 aspect-video">
                <div className="flex flex-col items-center justify-center w-full h-full border rounded-lg">
                  <span>{category}</span>
                </div>
              </div>

          )
        }
      </div>
    </div>
  )
}
export { Templates }
