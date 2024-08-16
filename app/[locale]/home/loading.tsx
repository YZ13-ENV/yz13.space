import { Stack } from "@/components/stack"
import { Separator } from "@yz13/mono/components/separator"
import { Skeleton } from "@yz13/mono/components/skeleton"

const Loading = () => {
  return (
    <>
      <main className="space-y-6 w-full pt-36 px-6 pb-24">
        {/* local data */}
        <div className="w-full flex flex-col gap-2 p-3 max-w-lg mx-auto">
          <Skeleton className="h-12 w-64 rounded-xl" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-36" />
            <Separator orientation="vertical" className="h-3" />
            <Skeleton className="h-6 w-16" />
          </div>
        </div>
        {/* status */}
        <Stack.Wrapper>
          <Stack.Content>
            <Skeleton className="max-w-lg mx-auto w-full h-28 rounded-xl" />
          </Stack.Content>
        </Stack.Wrapper>
        {/* about */}
        <Skeleton className="max-w-lg mx-auto w-full h-28 rounded-xl " />
        <Stack.Group>
          <Skeleton className="max-w-lg mx-auto w-full h-36 rounded-t-xl rounded-b-none" />
          <Skeleton className="max-w-lg mx-auto w-full h-48 rounded-b-xl rounded-t-none" />
        </Stack.Group>
      </main>
    </>
  )
}
export default Loading