import { Suspense } from "react"
import { YZ13Info, YZ13InfoSkeleton } from "../(threads)/_components/yz13-info"

const page = () => {
  return (
    <div className="w-full h-screen flex p-6 items-center justify-center">
      <Suspense fallback={<YZ13InfoSkeleton />}>
        <YZ13Info />
      </Suspense>
    </div>
  )
}
export default page