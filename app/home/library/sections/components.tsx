"use server"
import { getWorksByType } from "@/packages/api/src/db/works"
import { placeholderCount } from "./common"






const components = (): Promise<number[]> => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(placeholderCount)
    }, 1000)
  })
}
const ComponentsList = async () => {
  const list = await getWorksByType("component")
  const components = (list.data || [])
  return (
    <>
      {
        !!components.length
          ?
          components
            .map(
              item =>
                <div
                  key={`component#${item}`}
                  className="flex items-center aspect-video justify-center rounded-xl border bg-background w-full h-full hover:border-foreground"
                >
                  <span className="select-none">Component - 1</span>
                </div>
            )
          : <div className="w-full h-full flex justify-center border border-dashed rounded-none row-span-full col-span-full items-center">
            <span className="text-sm text-secondary">No components yet</span>
          </div>
      }
    </>
  )
}

export { ComponentsList, components }

