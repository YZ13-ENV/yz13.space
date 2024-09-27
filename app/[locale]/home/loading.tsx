import { Aside } from "@/components/container/aside"
import { Content } from "@/components/container/content"
import { Main } from "@/components/container/main"
import { Skeleton } from "@yz13/mono/components/skeleton"
import { NavList } from "@/components/nav/list"
import { WorksSkeleton } from "./works"

const Loading = () => {
  return (
    <>
      <header className="flex h-12 lg:!px-6 px-3 max-w-7xl mx-auto w-full justify-between items-center">
        <Skeleton className="w-28 h-9" />
        <Skeleton className="size-9 rounded-full" />
      </header>
      <Main>
        <Aside>
          <NavList />
        </Aside>
        <Content className="flex flex-col">
          <div className="flex flex-col w-full gap-2">
            <Skeleton className="w-full h-10 rounded-lg" />
            <div className="flex items-center justify-between gap-2 px-2">
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-5 w-1/3" />
            </div>
          </div>
          <div className="w-full gap-6 h-fit flex md:!flex-row flex-col items-start">
            <div className="xl:!w-1/2 w-full md:!h-full h-fit space-y-3">
              <Skeleton className="w-2/3 h-7 rounded-lg" />
              <Skeleton className="w-1/3 h-6 rounded-lg" />
            </div>
            <div className="xl:!w-1/2 w-full md:!h-full h-fit space-y-3">
              <Skeleton className="w-2/3 h-7 rounded-lg" />
              <Skeleton className="w-1/3 h-6 rounded-lg" />
              <Skeleton className="w-1/2 h-6 rounded-lg" />
              <Skeleton className="w-1/2 h-6 rounded-lg" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Skeleton className="h-7 w-1/4" />
            <WorksSkeleton />
          </div>

          <div className="flex flex-col gap-2">
            <Skeleton className="h-7 w-1/4" />
            <div className="w-full grid gap-4 lg:!grid-cols-3 sm:!grid-cols-2 grid-cols-1 auto-rows-auto">

              <div className="flex flex-col gap-1 relative group/inspiration">
                <Skeleton className="w-full rounded-lg aspect-video" />
                <div className="flex gap-1 flex-col">
                  <Skeleton className="w-1/2 h-4" />
                  <Skeleton className="w-1/3 h-4" />
                </div>
              </div>
              <div className="flex flex-col gap-1 relative group/inspiration">
                <Skeleton className="w-full rounded-lg aspect-video" />
                <div className="flex gap-1 flex-col">
                  <Skeleton className="w-1/2 h-4" />
                  <Skeleton className="w-1/3 h-4" />
                </div>
              </div>
              <div className="flex flex-col gap-1 relative group/inspiration">
                <Skeleton className="w-full rounded-lg aspect-video" />
                <div className="flex gap-1 flex-col">
                  <Skeleton className="w-1/2 h-4" />
                  <Skeleton className="w-1/3 h-4" />
                </div>
              </div>
              <div className="flex flex-col gap-1 relative group/inspiration">
                <Skeleton className="w-full rounded-lg aspect-video" />
                <div className="flex gap-1 flex-col">
                  <Skeleton className="w-1/2 h-4" />
                  <Skeleton className="w-1/3 h-4" />
                </div>
              </div>
              <div className="flex flex-col gap-1 relative group/inspiration">
                <Skeleton className="w-full rounded-lg aspect-video" />
                <div className="flex gap-1 flex-col">
                  <Skeleton className="w-1/2 h-4" />
                  <Skeleton className="w-1/3 h-4" />
                </div>
              </div>
              <div className="flex flex-col gap-1 relative group/inspiration">
                <Skeleton className="w-full rounded-lg aspect-video" />
                <div className="flex gap-1 flex-col">
                  <Skeleton className="w-1/2 h-4" />
                  <Skeleton className="w-1/3 h-4" />
                </div>
              </div>


            </div>
          </div>
        </Content>
      </Main>
    </>
  )
}
export default Loading
