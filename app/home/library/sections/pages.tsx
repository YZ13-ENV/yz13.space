import { placeholderCount } from "./common"






const pages = (): Promise<number[]> => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(placeholderCount)
    }, 1000)
  })
}
const PagesList = async () => {
  const list = await pages()
  return (
    <>
      {
        list.map(
          item =>
            <div
              key={`website#${item}`}
              className="flex items-center aspect-video justify-center rounded-xl border bg-background w-full h-full hover:border-foreground"
            >
              <span className="select-none">Page - 1</span>
            </div>
        )
      }
    </>
  )
}

export { PagesList, pages }

