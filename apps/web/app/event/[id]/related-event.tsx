import { MDXContent, getMDXData } from "@/utils/mdx"
import { getTeamMembers } from "@yz13/api/db/team"
import dayjs from "dayjs"
import Image from "next/image"
import Link from "next/link"
import path from "path"

type Props = {
  event: MDXContent
}

const RelatedEventCard = async ({ event }: Props) => {
  const slug = event.slug
  const allMDX = getMDXData(path.join(process.cwd(), 'app', 'event', 'events'))
  const mdx = allMDX.find(event => event.slug === slug)
  const event_author = mdx?.metadata.author
  const team = await getTeamMembers()
  const members = team.data || []
  const author = members.find(member => member.username === event_author)
  return (
    <div className="w-full hover:bg-accents-1 gap-4 p-4 flex flex-col h-fit rounded-2xl hover:border-foreground relative transition-colors border">
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
export { RelatedEventCard }
