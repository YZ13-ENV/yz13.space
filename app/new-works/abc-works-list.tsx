import { works } from "@/actions/works"
import { Stack } from "@/components/stack"
import { Button } from "@yz13/mono/components/button"
import { uniq } from "lodash"
import Link from "next/link"
import { BiRightArrowAlt } from "react-icons/bi"
import { PiGlobeDuotone, PiPackageDuotone, PiQuestionDuotone } from "react-icons/pi"
import { AbcProvider } from "./abc-provider"
import { AbcScroller } from "./abc-scroller"

type AbcWorksListProps = {
  lt?: string
}
const AbcWorksList = async ({ lt }: AbcWorksListProps) => {
  const allWorksResponse = await works()
  const allWorks = allWorksResponse?.data ?? []
  const abcFromWorks = uniq(allWorks.length ? allWorks.map(item => String((item.name ?? "")?.slice(0, 1)).toLowerCase()) : []).sort()
  return (
    <>
      <AbcScroller lt={lt} />
      <AbcProvider initialValue={abcFromWorks} />
      {
        abcFromWorks.map(letter => {
          const matchedLT = lt ? letter === lt : false
          const worksThatMatchLetter = allWorks.filter(work => String((work.name ?? "")?.slice(0, 1)).toLowerCase() === letter)
          return (
            <Stack.Wrapper id={`letter#${letter}`} key={`abc#${letter}`} className={matchedLT ? "border-foreground" : ""}>
              <Stack.Header><span className="uppercase">{letter}</span></Stack.Header>
              <Stack.Content>
                {
                  worksThatMatchLetter.map(
                    work => {
                      const link = work.link
                      const type = work.type
                      return <Button key={work.id + "#" + letter} variant="ghost" className="w-full p-0 flex rounded-lg hover:bg-yz-neutral-200 h-10 items-center gap-2 justify-between relative">
                        {link && <Link href={link} className="absolute top-0 left-0 w-full h-full rounded-lg" />}
                        <span className="inline-flex items-center gap-2">
                          <span className="size-10 inline-flex items-center justify-center">
                            {
                              type === "website"
                                ? <PiGlobeDuotone size={18} />
                                : type === "package"
                                  ? <PiPackageDuotone size={18} />
                                  : <PiQuestionDuotone size={18} />
                            }
                          </span>
                          <span className="inline-flex flex-col items-start">
                            <span className="text-sm font-medium text-foreground">{work.name}</span>
                            <span className="text-xs text-secondary capitalize">{work.type}</span>
                          </span>
                        </span>
                        {link && <BiRightArrowAlt size={18} className="relative right-2" />}
                      </Button>
                    }
                  )
                }
              </Stack.Content>
            </Stack.Wrapper>
          )
        })
      }
    </>
  )
}
export { AbcWorksList }

