import { getTemplates } from "@/packages/api/src/templates"
import { Button } from "@/packages/ui/src/components/button"
import { Input } from "@/packages/ui/src/components/input"
import { Separator } from "@/packages/ui/src/components/separator"
import { uniq } from "lodash"
import Link from "next/link"
import { BiDollar, BiSearch } from "react-icons/bi"
import { Header } from "../_components/header"

const page = async () => {
  const templates = await getTemplates()
  const allCategories: string[][] = templates.map(template => template.categories)
  const categories = uniq(allCategories.reduce((a, b) => [...a, ...b]))
  const templateTypes: string[] = uniq(templates.map(template => template.type))
  return (
    <>
      <Header />
      <div className="w-full max-w-2xl space-y-2 mx-auto py-12 px-3 h-fit">
        <h1 className="text-6xl text-center font-bold">
          Templates
        </h1>
        <p className="text-secondary text-xl text-center">
          There is a free and paid templates, we tried to create a different types of templates, so
          everyone can find favorite template
        </p>
      </div>
      <div className="w-full max-w-7xl mx-auto flex lg:flex-row flex-col py-6 h-fit">
        <aside className="lg:max-w-80 max-w-full w-full p-3 space-y-3">
          <div className="relative w-full">
            <div className="w-9 absolute left-0 aspect-square flex items-center justify-center">
              <BiSearch size={18} className="text-secondary" />
            </div>
            <Input placeholder="Search" className="pl-9" />
          </div>
          <Separator />
          {
            templateTypes.map(
              type =>
                <Button key={type} className="w-full justify-start capitalize" variant="secondary">{type}</Button>
            )
          }
          <Separator />
          {
            categories.map(
              category =>
                <Button key={category} className="w-full justify-start capitalize" variant="secondary">{category}</Button>
            )
          }
        </aside>
        <div className="w-full h-full p-3 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 auto-rows-auto">
          {
            !!templates.length
              ? templates.map(
                template => {
                  const isPaid = template.type === "paid"
                  const name = template.name
                  const href = template.href
                  const authors = (template.authors) as string[]
                  return (
                    <div key={template.id} className="w-full aspect-[4/3] border relative rounded-xl">
                      <Link href={href} className="w-full block h-full rounded-xl" />
                      {
                        isPaid &&
                        <span className="absolute top-3 right-3 border bg-background rounded-full w-6 h-6 flex items-center justify-center">
                          <BiDollar className="text-secondary" size={16} />
                        </span>
                      }
                      <div
                        className="absolute left-0 bottom-0 w-full items-center flex justify-between border-t py-1 px-3 bg-background rounded-b-xl"
                      >
                        <span className="text-sm text-secondary">{name}</span>
                        <span className="text-xs text-secondary">{authors.join(", ")}</span>
                      </div>
                    </div>
                  )
                })
              :
              <div className="col-span-full row-span-full h-96 flex items-center justify-center">
                <span className="text-sm text-secondary">Шаблоны будут тут</span>
              </div>
          }
        </div>
      </div>
    </>
  )
}
export default page