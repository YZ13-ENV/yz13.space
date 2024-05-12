import { HomeHeader } from "@/components/entities/header"
import { getMDXData } from "@/utils/mdx"
import { Separator } from "@repo/ui/separator"
import { MDXRemote } from 'next-mdx-remote/rsc'
import path from 'path'

type Props = {
  params: {
    id: string
  }
}
const page = ({ params }: Props) => {
  const slug = params.id
  const mdx = getMDXData(path.join(process.cwd(), 'app', 'event', 'events')).find(event => event.slug === slug)
  return (
    <>
      <HomeHeader />
      <div className='min-h-screen w-full'>
        <div className="w-full container">
          <div className="max-w-4xl mx-auto w-full p-12 space-y-6">
            <div className="w-36 h-5 rounded-full bg-secondary" />
            <div className="flex items-center gap-4">
              <div className="w-36 h-9 rounded-full bg-secondary" />
              <div className="w-48 h-5 rounded-full bg-secondary" />
            </div>
            <div className="w-full h-16 flex items-center gap-4">
              <div className="h-full flex items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-accents-1 border" />
                <div className="flex flex-col justify-center h-full">
                  <span className="font-mediums">Author</span>
                  <span className="text-sm text-secondary">Position</span>
                </div>
              </div>
            </div>
            <Separator />
            <div className="space-y-3 w-full">
              <h1 className="text-5xl font-bold">{mdx?.metadata.title}</h1>
              <p className="text-lg text-secondary">{mdx?.metadata.summary}</p>
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