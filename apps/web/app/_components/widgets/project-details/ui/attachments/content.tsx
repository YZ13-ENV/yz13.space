import { getProject } from "@yz13/api/db/project"
import { getStorageItem } from "@yz13/supabase/storage"
import Image from "next/image"

type Props = {
  id: string
}
const Content = async ({ id }: Props) => {
  const pr_response = await getProject(id)
  const project = pr_response.data ? pr_response.data[0] : null
  const attachments = project ? project.attachments.map(attachment => getStorageItem([attachment])) : []

  return (
    <ul className="p-1 w-full overflow-x-auto">
      {
        attachments.map(attachment =>
          <li key={attachment} className="p-4">
            <Image src={attachment} className="rounded-2xl !relative" fill alt="attachment" />
          </li>
        )
      }
    </ul>
  )
}
export { Content }
