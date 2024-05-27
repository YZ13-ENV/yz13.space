import { MDXContent, getMDXData } from "@/utils/mdx"
import { Button } from "@repo/ui/button"
import { cn } from "@repo/ui/cn"
import { getProjects } from "@yz13/api/db/project"
import { Project } from "@yz13/api/gh/types"
import { getStorageItem } from "@yz13/supabase/storage"
import dayjs from "dayjs"
import { MDXRemote } from "next-mdx-remote/rsc"
import Image from "next/image"
import Link from "next/link"
import path from "path"
import { TbBrandAppgallery, TbCalendar } from "react-icons/tb"
import { SidebarLarge } from "../yz13/sidebar-large"

// # need types for feed
type FeedItem = {
  type: "app" | "package" | "event"
  created_at: string
  item: MDXContent | Project
}

const HomePageV2 = async () => {
  const { data } = await getProjects()
  const projects = (data || [])
  const allMDX = getMDXData(path.join(process.cwd(), 'app', 'yz13', 'event', 'events'))
  const pr_feed: FeedItem[] = projects.map(pr => ({ type: pr.type, created_at: pr.created_at, item: pr }))
  const mdx_feed: FeedItem[] = allMDX.map(mdx => ({ type: "event", created_at: mdx.metadata.created_at, item: mdx }))
  const feed: FeedItem[] = [...pr_feed, ...mdx_feed].sort((a, b) => {
    const a_date = dayjs(a.created_at)
    const b_date = dayjs(b.created_at)
    return b_date.diff(a_date)
  })
  const Feed = () => {
    return (
      <div className="max-w-xl mx-auto w-full space-y-6 py-6">
        {
          feed.map(({ created_at, item, type }) => {
            const format = dayjs(created_at).format("DD MMMM YYYY")
            if (type === "app" || type === "package") {
              const pr = item as Project
              const attachments = pr.attachments.map(attachment => getStorageItem([attachment]))

              return (
                <section key={pr.id} className="w-full p-6 hover:bg-accents-1 rounded-xl transition-colors">
                  <div className="flex items-center gap-2 relative">
                    <Link href={`/yz13/work/${pr.id}`} className="w-full h-full absolute left-0 top-0" prefetch />
                    <TbBrandAppgallery size={28} />
                    <h2 className="text-4xl font-bold">{pr.name}</h2>
                  </div>
                  <div className="w-full py-3">
                    {
                      pr.description &&
                      <p className="font-headings text-2xl">{pr.description}</p>
                    }
                  </div>
                  <div className="flex flex-row items-start gap-1 flex-wrap">
                    {
                      pr.tags.map(tag =>
                        <span key={tag} className="px-2 py-1 rounded-full border text-xs">{tag}</span>

                      )
                    }
                  </div>
                  <div className="mt-3">
                    <span className="text-sm">{format}</span>
                  </div>
                  <div className="w-full gap-4 attachments-grid grid mt-6">
                    {
                      attachments.map(
                        (attachment, index) =>
                          <Image
                            key={attachment}
                            src={attachment}
                            className={cn("!relative rounded-xl object-cover", index === 0 ? "attachment-a" : index === 1 ? "attachment-b" : "attachment-c")}
                            fill alt="attachment"
                          />
                      )
                    }
                  </div>
                </section>
              )
            }
            const mdx = item as MDXContent
            return (
              <section key={type + "-" + created_at} className="w-full p-6 hover:bg-accents-1 rounded-xl transition-colors">
                <div className="flex items-center gap-2 relative">
                  <Link href={`/yz13/event/${mdx.slug}`} className="w-full h-full absolute left-0 top-0" prefetch />
                  <TbCalendar size={28} />
                  <h2 className="text-4xl font-bold">{mdx.metadata.title}</h2>
                </div>
                <div className="w-full py-3">
                  {
                    mdx.metadata.description &&
                    <p className="font-headings text-2xl">{mdx.metadata.description}</p>
                  }
                </div>
                <div className="flex flex-row items-start gap-1 flex-wrap">
                  <span className="px-2 py-1 rounded-full border text-xs">{mdx.metadata.theme}</span>
                </div>
                <div className="w-full line-clamp-3 md-layout">
                  <MDXRemote source={mdx.content} />
                </div>
                <div className="flex items-center mt-6 gap-3">
                  <Button variant="outline" asChild>
                    <Link href={`/yz13/event/${mdx.slug}`}>
                      Read more
                    </Link>
                  </Button>
                  <span className="text-sm">{format}</span>
                </div>
              </section>
            )
          })
        }
      </div>
    )
  }
  return (
    <div className="w-full h-screen flex flex-row">
      <div className="md:block hidden w-full no-scrollbar overflow-y-auto h-full p-3 space-y-3">
        <Feed />
      </div>
      <SidebarLarge>
        <div className="md:hidden block w-full h-fit space-y-3">
          <Feed />
        </div>
      </SidebarLarge>
    </div>
  )
}
export default HomePageV2