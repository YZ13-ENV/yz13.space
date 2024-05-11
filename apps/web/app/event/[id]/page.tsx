import { Background } from "@/app/_components/widgets/background"
import { HomeHeader } from "@/components/entities/header"
import { Separator } from "@repo/ui/separator"

type Props = {
  params: {
    id: string
  }
}
const page = ({ params }: Props) => {
  const id = params.id
  return (
    <>
      <HomeHeader />
      <div className="w-full h-[40dvh] -top-20 absolute z-[-1]">
        <Background />
      </div>
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
            <h1 className="text-5xl font-bold">{id}</h1>
            <p className="text-lg text-secondary">Description for event</p>
          </div>
          <div className="w-full space-y-6">
            <div className="w-full md-layout">
              <h1>Heading h1</h1>
              <p>Event text</p>
              <ul>
                <li>list item</li>
                <li>also list item</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default page