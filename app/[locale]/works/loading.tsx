import { Aside } from "@/components/container/aside"
import { Content } from "@/components/container/content"
import { Main } from "@/components/container/main"
import { NavList } from "@/components/nav/list"
import { Skeleton } from "@yz13/mono/components/skeleton"
import { KanbanSkeleton } from "./works-kanban"

const Loading = () => {
  return (
    <>
      <header className="flex px-6 mt-6 justify-between items-center">
        <Skeleton className="w-28 h-9" />
        <Skeleton className="size-9 rounded-full" />
      </header>
      <Main>
        <Aside>
          <NavList />
        </Aside>
        <Content className="flex flex-col">
          <Skeleton className="h-10 w-36" />
          <KanbanSkeleton />
        </Content>
      </Main>
    </>
  )
}
export default Loading