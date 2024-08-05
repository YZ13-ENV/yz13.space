import { works } from "@/actions/works"
import { Stack } from "@/components/stack"
import { Button } from "@yz13/mono/components/button"
import Link from "next/link"
import { BiRightArrowAlt } from "react-icons/bi"
import { PiUserDuotone } from "react-icons/pi"
import { AbcProvider } from "./abc-provider"


const AbcWorksList = async () => {
  const allWorksResponse = await works()
  const allWorks = allWorksResponse?.data ?? []
  const abcFromWorks = allWorks.length ? allWorks.map(item => String((item.name ?? "")?.slice(0, 1)).toLowerCase()) : []
  return (
    <>
      <AbcProvider initialValue={abcFromWorks} />
      {
        abcFromWorks.map(letter => {
          const worksThatMatchLetter = allWorks.filter(work => String((work.name ?? "")?.slice(0, 1)).toLowerCase() === letter)
          return (
            <Stack.Wrapper key={`abc#${letter}`}>
              <Stack.Header><span className="uppercase">{letter}</span></Stack.Header>
              <Stack.Content>
                {
                  worksThatMatchLetter.map(
                    work => {
                      const link = work.link
                      return <Button key={work.id + "#" + letter} variant="ghost" className="w-full p-0 flex rounded-lg hover:bg-yz-neutral-200 h-10 items-center gap-2 justify-between relative">
                        {link && <Link href={link} className="absolute top-0 left-0 w-full h-full rounded-lg" />}
                        <span className="inline-flex items-center gap-2">
                          <span className="size-10 inline-flex items-center justify-center">
                            <PiUserDuotone size={18} />
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

