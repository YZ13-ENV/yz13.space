import { work } from "@/actions/work"
import { DynamicImage, ThemedImage } from "@/components/dynamic-image"
import { Button } from "@yz13/mono/components/button"
import { Separator } from "@yz13/mono/components/separator"
import Link from "next/link"
import { LuExternalLink, LuGlobe } from "react-icons/lu"
import { cn } from "yz13/cn"

const Work = async ({ id }: { id: string }) => {
  const result = await work(id)
  const data = result?.data
  if (!data) return null
  const hasThumbnail = String(data.thumbnail) === "{}"
  return (
    <div className="w-96 rounded-3xl bg-background h-fit shadow-2xl border-2">
      <div className="p-4 w-full flex items-center justify-start gap-2">
        <div className="flex items-center gap-2">
          <div className="size-12 flex items-center justify-center rounded-xl border">
            <LuGlobe size={20} className="text-secondary" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-medium">{data.name}</h1>
            {
              data.link &&
              <Link href={data.link} className="text-xs text-secondary inline-flex items-center gap-1.5 hover:underline">
                {data.link}
                <LuExternalLink size={12} />
              </Link>
            }
          </div>
        </div>
      </div>
      <Separator />
      {
        hasThumbnail &&
        <div className="w-full p-4 h-fit">
          <div className="w-full relative aspect-video rounded-xl bg-yz-neutral-100">
            <DynamicImage image={data.thumbnail as ThemedImage} alt="work-thumbnail" />
          </div>
        </div>
      }
      <Separator />
      <div className="p-4 flex items-center gap-2">
        <Button className={cn("rounded-lg", data.link ? "w-1/2" : "w-full")} variant="outline" size="lg">Details</Button>
        <Button disabled={!data.link} className="w-1/2 rounded-lg" variant="default" size="lg" asChild={!data.link}>
          {
            data.link
              ? <Link href={data.link}>Visit</Link>
              : "Visit"
          }
        </Button>
      </div>
    </div>
  )
}
export { Work }
