import { Aside } from "@/components/container/aside"
import { Content } from "@/components/container/content"
import { Main } from "@/components/container/main"
import { NavList } from "@/components/nav/list"
import { Skeleton } from "@yz13/mono/components/skeleton"

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
        </Content>
      </Main>
    </>
  )
}
export default Loading
