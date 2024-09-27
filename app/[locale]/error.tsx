"use client"
import { DynamicImage } from "@/components/dynamic-image"
import { useInterval } from "ahooks"
import { Loader2Icon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

type PageError = Error & { digest?: string }

const ErrorPage = ({
  error,
  reset,
}: {
  error: PageError
  reset: () => void
}) => {
  const [tries, setTries] = useState(0)
  const [err, setErr] = useState<PageError | null>(error)
  useInterval(() => {
    setTries(tries + 1)
    reset()
  }, err ? 3000 : undefined)
  return (
    <>
      <div className="w-full flex-col gap-6 flex items-center justify-center h-screen">
        <div className="h-64 w-64 xl:absolute shrink-0 relative top-0 left-0">
          <Link href="/home">
            <DynamicImage
              image={{
                dark: "https://yzstatic.yz13.space/logo/yz-dark.svg",
                light: "https://yzstatic.yz13.space/logo/yz-light.svg"
              }}
              className="opacity-10"
              alt="logo"
            />
          </Link>
        </div>
        <Loader2Icon size={16} className="animate-spin" />
      </div>
    </>
  )
}
export default ErrorPage
