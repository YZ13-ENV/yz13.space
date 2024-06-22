import { placeholderCount } from "./common"


const packages = (): Promise<number[]> => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(placeholderCount)
    }, 1000)
  })
}

const PackagesList = async () => {
  const list = await packages()
  return (
    <>
      {
        list.map(
          item =>
            <div
              key={`website#${item}`}
              className="flex items-center aspect-video justify-center rounded-xl border bg-background w-full h-full hover:border-foreground"
            >
              <span className="select-none">Package - 1</span>
            </div>
        )
      }
    </>
  )
}

export { PackagesList, packages }

