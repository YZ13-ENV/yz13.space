
import { member } from "@/actions/team-member"
import CommitsActivity from "@/components/commits-activity"
import { Locales } from "@/locales/server"
import dayjs from "dayjs"

export type ActivityEvent = {
  id: string
  type: string,
  created_at: string
}


const UserActivity = async ({ lang = "en", uid }: { uid: string, lang?: Locales }) => {
  const user = await member(uid)
  const data = user?.data
  const now = dayjs()
  const year = data?.["experience-from"] ?? 2024
  const actualYear = now.year()
  const yearDifference = (actualYear + 1) - year
  const yearsArr = Array.from({ length: yearDifference }).map((_, i) => year + i).sort((a, b) => b - a)
  return (
    <CommitsActivity.Wrapper>
      <div className="flex items-center flex-col gap-2">
        <div className="w-full overflow-x-auto flex justify-start items-center gap-0.5">
          {
            (yearsArr.sort().reverse()).map(year =>
              <CommitsActivity.Map key={year} lang={lang} year={year} />
            )
          }
        </div>
        <CommitsActivity.Legend />
      </div>
    </CommitsActivity.Wrapper>
  )
}
export { UserActivity }
