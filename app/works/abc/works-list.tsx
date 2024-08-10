"use client"

import { getURL } from "@/app/(auth)/(routes)/login/get-url"
import { Stack } from "@/components/stack"
import { Button } from "@yz13/mono/components/button"
import { useRouter, useSearchParams } from "next/navigation"
import { useMemo } from "react"
import { BiRightArrowAlt } from "react-icons/bi"
import { PiGlobeDuotone, PiPackageDuotone, PiQuestionDuotone } from "react-icons/pi"
import { Work } from "./abc-store"

type WorkListProps = {
  abc?: string[]
  works?: Work[]
  lt?: string
}

const WorksList = ({ works = [], abc = [], lt }: WorkListProps) => {
  const searchParams = useSearchParams()
  const base = getURL()
  const path = "/works"
  const url = new URL(path, base)
  const router = useRouter()
  const parsedParams = useMemo(() => {
    let result: { [key: string]: string } = {}
    searchParams.forEach((value, key) => result[key] = value)
    return result
  }, [searchParams])
  const newSearchParams = url.searchParams
  if (!!parsedParams) {
    const keys: string[] = Object.keys(parsedParams)
    keys.forEach(key => {
      const value = parsedParams[key]
      if (value) newSearchParams.set(key, value)
    })
  }
  return (
    <>
      {
        abc.map(letter => {
          const matchedLT = lt ? letter === lt : false
          const worksThatMatchLetter = works.filter(work => String((work.name ?? "")?.slice(0, 1)).toLowerCase() === letter)
          const matchedWorksLength = worksThatMatchLetter.length
          return (
            <Stack.Wrapper id={`letter#${letter}`} key={`abc#${letter}`} className={matchedLT ? "border-foreground" : ""}>
              <Stack.Header>
                <span className="uppercase">{letter}</span>
              </Stack.Header>
              <Stack.Content>
                {
                  worksThatMatchLetter.map(
                    work => {
                      const link = work.link
                      const type = work.type
                      return <Button
                        onClick={() => {
                          newSearchParams.set("workId", String(work.id))
                          router.push(url.toString())
                        }}
                        key={work.id + "#" + letter}
                        variant="ghost"
                        className="w-full p-0 flex rounded-lg hover:bg-yz-neutral-200 h-10 items-center gap-2 justify-between relative"
                      >
                        {/* {link && <Link href={link} className="absolute top-0 left-0 w-full h-full rounded-lg" />} */}
                        <span className="inline-flex items-center gap-2">
                          <span className="size-10 inline-flex items-center justify-center">
                            {
                              type === "website"
                                ? <PiGlobeDuotone size={20} />
                                : type === "package"
                                  ? <PiPackageDuotone size={20} />
                                  : <PiQuestionDuotone size={20} />
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
export { WorksList }