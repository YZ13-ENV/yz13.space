import { getFullThreads } from "@yz13/api/db/threads";
import dayjs from "dayjs";
import { unstable_noStore } from "next/cache";
import Link from "next/link";
import { Contacts } from "../_components/contacts";
import { Footer } from "../_components/footer";
import { SearchBar } from "../_components/search-bar";
import { SubThreadV2 } from "../_components/thread/ui/sub-threads/sub-thread-v2";
import { Thread } from "../_components/thread/ui/threads/thread-v2";
import { AdBanner } from "./ad-banner";
import { nav_links } from "./nav-links";

type Props = {
  searchParams: {
    filter?: string
  }
}
const page = async ({ searchParams }: Props) => {
  unstable_noStore()
  const filter = searchParams.filter
  const threads = (await getFullThreads())
    .filter(thread => {
      const sub_threads = thread.threads
      const onlyText = sub_threads.map(sub_thread => ({
        thread_id: sub_thread.thread_id,
        sub_thread_id: sub_thread.sub_thread_id,
        text: sub_thread.text.toLowerCase()
      }))
      const matched = onlyText.filter(text => filter ? text.text.includes(filter) : text)
      const isInMatch = matched.find(item => item.thread_id === thread.thread_id && !!(thread.threads.find(sub => sub.sub_thread_id === item.sub_thread_id)))
      return filter ? !!isInMatch : thread
    })
    .sort((a, b) => {
      const a_date = dayjs(a.created_at)
      const b_date = dayjs(b.created_at)
      return b_date.diff(a_date)
    })
    .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0))
  return (
    <>
      <AdBanner />
      <div className="w-full">
        <div className="border-t lg:border-l-0 border-l  border-r">
          <div className="p-6 border-b w-full space-y-3">
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
          <div className="w-full divide-y">
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
            <Contacts className="p-6" />
            <Footer className="p-6" />
          </div>
        </div>
      </div>
    </>
  )
}
export default page