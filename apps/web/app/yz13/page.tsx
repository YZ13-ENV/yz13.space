import { cn } from "@repo/ui/cn"
import { getProjects } from "@yz13/api/db/project"
import { getStorageItem } from "@yz13/supabase/storage"
import dayjs from "dayjs"
import Image from "next/image"
import Link from "next/link"
import { SidebarLarge } from "./sidebar-large"

const page = async () => {
  const { data } = await getProjects()
  const projects = (data || [])
  return (
    <div className="w-full h-screen flex flex-row">
      <div className="md:block hidden w-full no-scrollbar overflow-y-auto h-full p-3 space-y-3">
        <div className="max-w-xl mx-auto w-full">
          {
            projects.map(pr => {
              const time_created_at = dayjs(pr.created_at).format("HH:ss")
              const date_created_at = dayjs(pr.created_at).format("DD MMMM YYYY")
              const attachments = pr.attachments.map(attachment => getStorageItem([attachment]))
              return <section key={pr.id} className="w-full p-6">
                <div className="flex items-center gap-2 relative">
                  <Link href={`/yz13/${pr.id}`} className="w-full h-full absolute left-0 top-0" prefetch />
                  <h2 className="text-4xl font-bold">{pr.name}</h2>
                  <div className="flex flex-col">
                    <span className="text-xs">{time_created_at}</span>
                    <span className="text-xs">{date_created_at}</span>
                  </div>
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
            }
            )
          }
        </div>
      </div>
      <SidebarLarge />
    </div>
  )
}
export default page