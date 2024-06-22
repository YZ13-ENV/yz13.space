import { placeholderCount } from "./common"






const components = (): Promise<number[]> => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(placeholderCount)
    }, 1000)
  })
}
const ComponentsList = async () => {
  const list = await components()
  return (
    <>
      {
        list.map(
          item =>
            <div
              key={`website#${item}`}
              className="flex items-center aspect-video justify-center rounded-xl border bg-background w-full h-full hover:border-foreground"
            >
              <span className="select-none">Component - 1</span>
            </div>
        )
      }
    </>
  )
}

export { ComponentsList, components }

