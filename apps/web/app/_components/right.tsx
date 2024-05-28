import { ReactNode } from "react"

type Props = {
  children?: ReactNode
}
const RightSide = ({ children }: Props) => {
  return (
    <div className="lg:w-1/2 w-full min-h-screen pt-20 pb-12">
      <div className="max-w-xl md:mr-auto md:ml-6 mx-auto h-full space-y-12 md:px-6 px-3">
        {children}
      </div>
    </div>
  )
}
export { RightSide }
