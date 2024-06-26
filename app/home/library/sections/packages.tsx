"use server"
import { getWorksByType } from "@/packages/api/src/db/works"
import { placeholderCount } from "./common"


const packages = (): Promise<number[]> => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(placeholderCount)
    }, 1000)
  })
}

const PackagesList = async () => {
  const list = await getWorksByType("package")
  const packages = (list.data || [])
  return (
    <>
      {
        !!packages.length
          ?
          packages
            .map(
              item =>
                <div
                  key={`package#${item}`}
                  className="flex items-center aspect-video justify-center rounded-xl border bg-background w-full h-full hover:border-foreground"
                >
                  <span className="select-none">Package - 1</span>
                </div>
            )
          : <div className="w-full h-full flex justify-center rounded-none row-span-full col-span-full items-center">
            <span className="text-sm text-secondary">No packages yet</span>
          </div>
      }
    </>
  )
}

export { PackagesList, packages }

