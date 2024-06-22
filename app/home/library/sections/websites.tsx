import { placeholderCount } from "./common"

const websites = async (): Promise<number[]> => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(placeholderCount)
    }, 5000)
  })
}

const WebsitesList = async () => {
  const list = await websites()
  return (
    <>
      {
        list.map(
          item =>
            <div
              key={`website#${item}`}
              className="flex items-center aspect-video justify-center rounded-xl border bg-background w-full h-full hover:border-foreground"
            >
              <span className="select-none">Website - 1</span>
            </div>
        )
      }
    </>
  )
}

export { WebsitesList, websites }
