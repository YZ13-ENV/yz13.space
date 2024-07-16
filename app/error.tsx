"use client"
import { Logo } from "@/components/logo"
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
        <Link href="/home">
          <Logo
            width={256} height={256}
            className="opacity-10"
          />
        </Link>
      </div>
    </>
  )
}
export default ErrorPage