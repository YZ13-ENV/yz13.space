import { LeftSide } from "@/app/_components/left";
import { RightSide } from "@/app/_components/right";
import { RightContentContainer } from "@/app/_components/right-content-container";
import { SplitViewContainer } from "@/app/_components/split-view-container";
import { getThreads } from "@yz13/api/db/threads";
import dayjs from "dayjs";
import Link from "next/link";
import { Contacts } from "../_components/contacts";
import { Footer } from "../_components/footer";
import { SearchBar } from "../_components/search-bar";
import { SubThreadV2 } from "../_components/thread/ui/sub-threads/sub-thread-v2";
import { Thread } from "../_components/thread/ui/threads/thread-v2";
import { YZ13Info } from "../_components/yz13-info";
import { nav_links } from "./nav-links";

type Props = {
  searchParams: {
    filter?: string
  }
}
const page = async ({ searchParams }: Props) => {
  const filter = searchParams.filter
  const threads_res = await getThreads()
  const threads = (threads_res.data || [])
    .filter(thread => filter ? thread.name?.toLowerCase().includes(filter) : thread)
    .sort((a, b) => {
      const a_date = dayjs(a.created_at)
      const b_date = dayjs(b.created_at)
      return b_date.diff(a_date)
    })
    .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0))
  return (
    <>
      <SplitViewContainer>
        <LeftSide>
          <YZ13Info />
        </LeftSide>
        <RightSide>
          <RightContentContainer>
            <div className="w-full space-y-3">
              <SearchBar />
              <nav className="space-x-2">
                {
                  nav_links.map(nav =>
                    <Link
                      key={nav.link}
                      className="inline-flex transition-colors gap-1 hover:bg-accents-1 items-center text-foreground/80 hover:text-foreground px-2 py-1 text-sm hover:border-foreground rounded-md border"
                      href={nav.link}
                    >
                      {nav.icon && nav.icon({ className: "text-inherit", size: 16 })}
                      <span className="text-inherit">{nav.label}</span>
                    </Link>
                  )
                }
              </nav>
            </div>
            <div className="w-full space-y-3">
              {
                threads.map(
                  (thread) => <Thread
                    key={thread.thread_id + "-" + thread.created_at}
                    thread={thread}
                    max={3}
                    component={SubThreadV2}
                    enableLink
                  />
                )
              }
              <Contacts />
              <Footer />
            </div>
          </RightContentContainer>
        </RightSide>
      </SplitViewContainer>
    </>
  )
}
export default page