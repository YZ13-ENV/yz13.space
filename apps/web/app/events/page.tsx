import { getTeamMembers } from "@/api/team-members"
import { Nav } from "@/components/entities/header"
import { Footer } from "@/components/shared/footer"
import { ThemedLogo } from "@/components/shared/theme-logo"
import { User } from "@/components/shared/user"
import { getMDXData } from "@/utils/mdx"
import dayjs from "dayjs"
import Image from "next/image"
import Link from "next/link"
import path from "path"
import { ThemeSwitcher } from "../_components/entities/theme"

const page = async () => {
  const allMDX = getMDXData(path.join(process.cwd(), 'app', 'event', 'events'))
  const team = await getTeamMembers()
  const members = team.data || []
  return (
    <>
      <header className="p-6 flex items-center justify-between max-w-4xl w-full mx-auto">
        <div className="flex items-center gap-4">
          <ThemedLogo mode="symbol" width={32} height={32} alt="logo" />
          <Nav />
        </div>
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <User />
        </div>
      </header>
      <div className='min-h-screen w-full'>
        <div className="w-full container">
          <div className="max-w-4xl mx-auto w-full lg:py-12 py-6">
            <div className="grid md:grid-cols-2 grid-flow-row grid-cols-1 gap-6 auto-rows-auto">
              {
                allMDX
                  .sort((a, b) => {
                    const a_date = dayjs(a.metadata.created_at)
                    const b_date = dayjs(b.metadata.created_at)
                    return a_date.diff(b_date)
                  })
                  .map(
                    event => {
                      const author = members.find(member => member.username === event.metadata.author)
                      const published_at = dayjs(event.metadata.created_at).format("dddd, D MMMM YYYY")
                      return <div key={event.slug} className="w-full flex flex-col border border-transparent hover:border-foreground p-6 hover:bg-accents-1 transition-colors rounded-2xl relative">
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