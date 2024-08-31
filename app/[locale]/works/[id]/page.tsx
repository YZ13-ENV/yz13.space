import { work } from "@/actions/work"
import { getCurrentLocale } from "@/locales/server"
import { Button } from "@yz13/mono/components/button"
import dayjs from "dayjs"
import Link from "next/link"
import { PiLockKeyDuotone } from "react-icons/pi"

type Props = {
  params: {
    id: string
  }
}
const page = async ({ params }: Props) => {
  const id = params.id
  const lang = getCurrentLocale()
  const result = await work(id)
  const data = result?.data
  const created_at = dayjs(data?.created_at).format("DD MMMM, YYYY")
  const isPublic = data?.public ?? false
  const link = data?.link
  const noThumbnail = !data?.thumbnail
  return (
    <>
      <main className="space-y-6 w-full pt-36 px-6 pb-24">
        <div className="max-w-lg w-full mx-auto space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-medium line-clamp-1 inline-flex gap-2 items-center">
              {
                !isPublic &&
                <PiLockKeyDuotone size={32} />
              }
              {data?.name}
            </h1>
            {
              link &&
              <Button asChild><Link href={link}>Visit</Link></Button>
            }
          </div>
          <div className="flex items-center gap-2">
            <p className="capitalize text-base text-secondary">{data?.type}</p>
            <time className="text-base text-secondary">{created_at}</time>
          </div>
        </div>
        {
          noThumbnail &&
          <div className="w-full aspect-video"></div>
        }
        <div className="max-w-lg w-full mx-auto space-y-2">
          <p>This is a work</p>
        </div>
      </main>
    </>
  )
}
export default page
