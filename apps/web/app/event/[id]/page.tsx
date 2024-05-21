import { getTeamMembers } from "@/api/team-members"
import { ThemeSwitcher } from "@/app/_components/entities/theme"
import { GradientLabel } from "@/app/_components/shared/gradient-label"
import { Nav } from "@/components/entities/header"
import { Footer } from "@/components/shared/footer"
import { ThemedLogo } from "@/components/shared/theme-logo"
import { User } from "@/components/shared/user"
import { getMDXData } from "@/utils/mdx"
import { Button } from "@repo/ui/button"
import { Input } from "@repo/ui/input"
import { Separator } from "@repo/ui/separator"
import dayjs from "dayjs"
import { MDXRemote } from 'next-mdx-remote/rsc'
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import path from 'path'
import { BiLeftArrowAlt } from "react-icons/bi"

type Props = {
  params: {
    id: string
  }
}
const page = async ({ params }: Props) => {
  const slug = params.id
  const allMDX = getMDXData(path.join(process.cwd(), 'app', 'event', 'events'))
  const mdx = allMDX.find(event => event.slug === slug)
  const event_author = mdx?.metadata.author
  const team = await getTeamMembers()
  const members = team.data || []
  const author = members.find(member => member.username === event_author)
  const published_at = dayjs(mdx?.metadata.created_at).format("dddd, D MMMM YYYY")
  const current_event = dayjs(mdx?.metadata.created_at).format("YYYY-MM-DD")
  const next_events = allMDX.filter(item => {
    const event_date = dayjs(item.metadata.created_at)
    return event_date.diff(current_event, "date")
  })
  const onlyTwo = next_events.slice(0, 2)
  if (!mdx) return redirect("/")
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
        <div className="w-full">
          <div className="max-w-4xl mx-auto w-full lg:py-12 px-6 md:py-6 py-6 space-y-6">
            <Button size="sm" variant="ghost" className="gap-2" asChild><Link href="/"><BiLeftArrowAlt size={18} /><span>Back to home</span></Link></Button>
            <div className="flex items-center gap-4 w-fit">
              <GradientLabel text={mdx?.metadata.theme} />
              <span className="text-sm text-secondary">{published_at}</span>
            </div>
            <div className="w-full h-16 flex items-center gap-4">
              <div className="h-full flex items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-accents-1 border relative overflow-hidden">
                  {author && author.avatar_url && <Image fill src={author.avatar_url} alt="author-avatar" />}
                </div>
                <div className="flex flex-col justify-center h-full">
                  <span className="font-medium">{author?.name}</span>
                  <span className="text-sm text-secondary">{author?.position}</span>
                </div>
              </div>
            </div>
            <Separator />
            <div className="space-y-3 w-full">
              <h1 className="text-5xl font-bold">{mdx?.metadata.title}</h1>
              <p className="text-lg text-secondary">{mdx?.metadata.description}</p>
            </div>
            <div className="w-full space-y-6">
              <div className="w-full md-layout">
                <MDXRemote
                  source={mdx?.content || ""}
                  options={{ mdxOptions: { format: "mdx", useDynamicImport: true, jsxRuntime: "automatic" } }}
                  components={{
                    button: (props) => <Button {...props} />,
                    input: (props) => <Input {...props} />
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        onlyTwo.length !== 0 &&
        <>
          <Separator />
          <div className="w-full">
            <section className="max-w-4xl mx-auto w-full lg:py-12 px-6 md:py-6 py-6 space-y-6">
              <h2 className="text-2xl font-bold">Read more</h2>
              <div className="w-full grid lg:grid-cols-2 grid-cols-1 lg:grid-rows-1 grid-rows-2 gap-4">
                {
                  onlyTwo.map(
                    event => <div key={event.slug} className="w-full hover:bg-accents-1 gap-4 p-4 flex flex-col h-fit rounded-2xl hover:border-foreground relative transition-colors border">
                      <Link href={`/event/${event.slug}`} className="w-full h-full absolute top-0 left-0" />
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-accents-1 border relative overflow-hidden">
                          {author && author.avatar_url && <Image fill src={author.avatar_url} alt="author-avatar" />}
                        </div>
                        <div className="flex flex-col justify-center h-full">
                          <span className="text-sm font-medium">{author?.name}</span>
                          <span className="text-xs text-secondary">{author?.position}</span>
                        </div>
                      </div>
                      <div className="w-full flex flex-col gap-0">
                        <p className="line-clamp-1 text-xl font-medium">{event.metadata.title}</p>
                        <p className="line-clamp-2 text-base text-secondary">{event.metadata.description}</p>
                      </div>
                      <div className="w-full mt-10">
                        <span className="text-sm text-secondary">{dayjs(event.metadata.created_at).format("dddd, D MMMM YYYY")}</span>
                      </div>
                    </div>
                  )
                }
              </div>
            </section>
          </div>
        </>
      }
      <div className="w-full h-36" />
      <Footer className="max-w-4xl mx-auto" />
    </>
  )
}
export default page