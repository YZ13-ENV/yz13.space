import { Aside } from "@/components/container/aside"
import { Content } from "@/components/container/content"
import { Main } from "@/components/container/main"
import { Skeleton } from "@yz13/mono/components/skeleton"
import { NavList } from "@/components/nav/list"

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
          <div className="w-full gap-6 md:!h-64 h-fit flex md:!flex-row flex-col md:!items-center items-start">
            <div className="lg:!w-1/4 md:!w-1/3 w-full md:!h-full h-fit space-y-3">
              <Skeleton className="w-2/3 h-12 rounded-lg" />
              <Skeleton className="w-1/3 h-6 rounded-lg" />
            </div>
            <div className="lg:!w-3/4 md:!w-2/3 w-full md:!h-full h-fit space-y-3">
              <Skeleton className="w-1/3 h-6 rounded-lg" />
              <Skeleton className="w-1/2 h-6 rounded-lg" />
              <Skeleton className="w-1/2 h-6 rounded-lg" />
              <Skeleton className="w-1/2 h-6 rounded-lg" />
              <Skeleton className="w-1/2 h-6 rounded-lg" />
              <Skeleton className="w-1/2 h-6 rounded-lg" />
            </div>
          </div>
          <div className="w-full flex lg:!flex-row flex-col">
            <div className="lg:!w-1/2 w-full lg:!h-full h-fit gap-6  flex flex-col">
              <Skeleton className="rounded-xl w-full h-40" />
              <Skeleton className="rounded-xl w-full h-36" />
              <Skeleton className="rounded-xl w-full h-96" />
            </div>
            <div className="lg:!w-1/2 w-full lg:!h-full h-fit gap-6  flex flex-col">
            </div>
          </div>
        </Content>
      </Main>
    </>
  )
}
export default Loading
