"use client"

import { Button } from "@/packages/ui/src/components/button"

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) => {
  return (
    <div className="w-full h-screen gap-4 flex flex-col items-center justify-center">
      <div className="max-w-4xl p-4 space-y-4 bg-accents-1 border rounded-xl">
        <div className="w-full flex items-center justify-between">
          <span className="text-lg font-semibold">
            {error.name}: {error.message}
          </span>
          <span className="text-sm text-accents-4">
            {error.digest}
          </span>
        </div>
        <pre className="m-0">
          {error.stack}
        </pre>
        <div className="w-full flex justify-end">
          <Button onClick={reset}>Refresh</Button>
        </div>
      </div>
    </div>
  )
}
export default Error