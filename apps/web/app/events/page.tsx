import { getTeamMembers } from "@/api/team-members"
import { DefaultHeader } from "@/components/entities/header"
import { Footer } from "@/components/shared/footer"
import { getMDXData } from "@/utils/mdx"
import dayjs from "dayjs"
import Image from "next/image"
import Link from "next/link"
import path from "path"

const page = async () => {
  const allMDX = getMDXData(path.join(process.cwd(), 'app', 'event', 'events'))
  const team = await getTeamMembers()
  const members = team.data || []
  return (
    <>
      <DefaultHeader />
      <div className='min-h-screen w-full'>
        <div className="w-full container">
          <div className="max-w-4xl mx-auto w-full lg:p-12 md:p-6 py-6">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-6 auto-rows-auto">
              {
                allMDX.map(
                  event => {
                    const author = members.find(member => member.username === event.metadata.author)
                    const published_at = dayjs(event.metadata.created_at).format("dddd, D MMMM YYYY")
                    return <div key={event.slug} className="w-full flex flex-col relative">
                      <Link className="w-full h-full absolute left-0 top-0" href={`/event/${event.slug}`} />
                      <span className="text-xs text-secondary">{event.metadata.theme}</span>
                      <div className="my-2">
                        <p className="text-2xl font-bold">{event.metadata.title}</p>
                        <p className="text-sm text-secondary">{event.metadata.description}</p>
                      </div>
                      <div className="w-full flex items-center justify-between">
                        <div className="flex mt-2 items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-accents-1 border relative overflow-hidden">
                            {author && author.avatar_url && <Image fill src={author.avatar_url} alt="author-avatar" />}
                          </div>
                          <span>{author?.username}</span>
                        </div>
                        <span className="text-sm text-secondary">{published_at}</span>
                      </div>
                    </div>
                  }
                )
              }
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-36" />
      <Footer className="max-w-4xl mx-auto px-4" />
    </>
  )
}
export default page