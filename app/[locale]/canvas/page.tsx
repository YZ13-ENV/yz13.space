import { Skeleton } from "@yz13/mono/components/skeleton"
import { Suspense } from "react"
import { UserActivity } from "../home/activity/activity-widget"

import "dayjs/locale/en"
import "dayjs/locale/ru"

const page = () => {
  return (
    <div className="w-full h-dvh flex items-center justify-center">
      <Suspense fallback={<Skeleton className="max-w-lg mx-auto w-full h-36 rounded-t-xl rounded-b-none" />}>
        <UserActivity uid="d5f98156-1776-42da-8f20-686d6a1ae2a8" lang={"ru"} />
      </Suspense>
    </div>
  )
}
export default page