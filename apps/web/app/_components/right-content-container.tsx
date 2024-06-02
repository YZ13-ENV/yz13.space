import { ReactNode } from "react"

type Props = {
  children?: ReactNode
}
const RightContentContainer = ({ children }: Props) => {
  return (
    <div className="max-w-xl lg:mr-auto lg:ml-6 mx-auto h-full space-y-12 py-3 px-6">
      {children}
    </div>
  )
}
export { RightContentContainer }
