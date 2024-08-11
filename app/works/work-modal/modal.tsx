"use client"
import { getURL } from "@/app/(auth)/(routes)/login/get-url"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ReactNode, useEffect, useMemo } from "react"

const Modal = ({ children, queryParam }: { children?: ReactNode, queryParam?: string }) => {
  const router = useRouter()
  const pathname = usePathname()
  const base = getURL()
  const url = new URL(pathname, base)
  const newSearchParams = url.searchParams
  const searchParams = useSearchParams()
  const parsedParams = useMemo(() => {
    let result: { [key: string]: string } = {}
    searchParams.forEach((value, key) => result[key] = value)
    return result
  }, [searchParams])
  if (!!parsedParams) {
    const keys: string[] = Object.keys(parsedParams)
    keys.forEach(key => {
      const value = parsedParams[key]
      if (value) newSearchParams.set(key, value)
    })
  }
  useEffect(() => {
    if (typeof document !== "undefined") {
      const body = document.getElementById("root")
      if (body) body.classList.add("overview-hidden")
    }
    return () => {
      const body = document.getElementById("root")
      if (body) body.classList.add("overview-hidden")
    }
  }, [typeof document])
  return (
    <div
      onClick={e => {
        if (queryParam) {
          newSearchParams.delete(queryParam)
          router.push(url.toString())
        }
      }}
      className="flex inset-0 fixed bg-background/20 backdrop-blur-sm w-full h-screen items-center justify-center z-50"
    >
      <div className="w-fit h-fit"
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
export { Modal }
