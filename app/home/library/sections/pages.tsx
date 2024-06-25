"use server"
import { getWorksByType } from "@/packages/api/src/db/works"
import { placeholderCount } from "./common"

const pages = (): Promise<number[]> => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(placeholderCount)
    }, 1000)
  })
}
const PagesList = async () => {
  const list = await getWorksByType("page")
  const pages = (list.data || [])
  return (
    <>
      {
        !!pages.length
          ?
          pages.map(
            item =>
              <div
                key={`page#${item}`}
                className="flex items-center aspect-video justify-center rounded-xl border bg-background w-full h-full hover:border-foreground"
              >
                <span className="select-none">Page - 1</span>
              </div>
          )
          : <div className="w-full h-full flex justify-center border border-dashed rounded-none row-span-full col-span-full items-center">
            <span className="text-sm text-secondary">No pages yet</span>
          </div>
      }
    </>
  )
}

export { PagesList, pages }

