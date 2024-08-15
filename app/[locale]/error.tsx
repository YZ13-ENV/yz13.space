"use client"
import { DynamicImage } from "@/components/dynamic-image"
import Link from "next/link"

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) => {
  console.log(error)
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
      </div>
    </>
  )
}
export default ErrorPage