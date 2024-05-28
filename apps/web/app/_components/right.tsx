import { ReactNode } from "react"

type Props = {
  children?: ReactNode
}
const RightSide = ({ children }: Props) => {
  return (
    <div className="lg:w-1/2 w-full min-h-screen lg:pt-20 pt-0 pb-12">
      <div className="max-w-xl md:mr-auto md:ml-6 mx-auto h-full space-y-12 py-3 px-6">
        {children}
      </div>
    </div>
  )
}
export { RightSide }
