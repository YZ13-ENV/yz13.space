import { getTeamMembers } from "@/api/team-members"
import { GradientLabel } from "@/app/_components/shared/gradient-label"
import { HomeHeader } from "@/components/entities/header"
import { getMDXData } from "@/utils/mdx"
import { Button } from "@repo/ui/button"
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
  const mdx = getMDXData(path.join(process.cwd(), 'app', 'event', 'events')).find(event => event.slug === slug)
  const event_author = mdx?.metadata.author
  const team = await getTeamMembers()
  const members = team.data || []
  const author = members.find(member => member.username === event_author)
  const published_at = dayjs(mdx?.metadata.created_at).format("dddd, D MMMM YYYY")
  if (!mdx) return redirect("/")
  return (
    <>
      <HomeHeader />
      <div className='min-h-screen w-full'>
        <div className="w-full container">
          <div className="max-w-4xl mx-auto w-full p-12 space-y-6">
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
                <MDXRemote source={mdx?.content || ""} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default page