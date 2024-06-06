import dayjs from "dayjs"
import { ReactNode } from "react"

type Props = {
  date_key?: string
  children?: ReactNode
}
const ChangeLog = ({ children, date_key = dayjs().format("YYYY-MM-DD") }: Props) => {
  const date = dayjs(date_key)
  return (
    <div className="w-full relative h-fit">
      <div className="w-fit h-full lg:absolute lg:mb-0 mb-4 lg:-left-40">
        <time className="sticky top-4 inline-block text-sm shrink-0">{date.format("MMMM D YYYY")}</time>
      </div>
      <section className="w-full md-layout relative">
        <div className="w-full aspect-video bg-accents-1 border rounded-xl"></div>
        {children}
      </section>
    </div>
  )
}
export { ChangeLog }
