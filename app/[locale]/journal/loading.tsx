import { Aside } from "@/components/container/aside"
import { Content } from "@/components/container/content"
import { Main } from "@/components/container/main"
import { Skeleton } from "@yz13/mono/components/skeleton"

const Loading = () => {
  return (
    <>
      <header className="flex px-6 mt-6 justify-between items-center">
        <Skeleton className="w-28 h-9" />
        <Skeleton className="size-9 rounded-full" />
      </header>
      <Main>
        <Aside>
          <Skeleton className="h-9 w-full rounded-lg" />
          <Skeleton className="h-9 w-full rounded-lg" />
          <Skeleton className="h-9 w-full rounded-lg" />
        </Aside>
        <Content className="flex flex-col">
        </Content>
      </Main>
    </>
  )
}
export default Loading