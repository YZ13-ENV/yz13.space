"use client"
import { Button } from "@yz13/mono/components/button"
import { useRouter, useSearchParams } from "next/navigation"
import { useMemo } from "react"
import { LuX } from "react-icons/lu"
import { getURL } from "../(auth)/(routes)/login/get-url"

const AbcReset = ({ lt }: { lt: string }) => {
  const router = useRouter()
  const path = "/works"
  const oldSearchParams = useSearchParams()
  const base = getURL()
  const url = new URL(path, base)
  const parsedParams = useMemo(() => {
    let result: { [key: string]: string } = {}
    oldSearchParams.forEach((value, key) => result[key] = value)
    return result
  }, [oldSearchParams])
  const searchParams = url.searchParams
  if (parsedParams) {
    const paramsKeys = Object.keys(parsedParams)
    paramsKeys.forEach(key => {
      const value = parsedParams[key]
      if (value) searchParams.set(key, value)
    })
  }
  return (
    <>
      <span className="text-4xl font-medium">/</span>
      <span className="text-4xl font-medium uppercase">{lt}</span>
      <Button
        onClick={() => {
          searchParams.delete("lt")
          const urlString = url.toString()
          router.push(urlString)
        }}
        variant="ghost"
        size="icon"
      >
        <LuX size={16} />
      </Button>
    </>
  )
}
export { AbcReset }
