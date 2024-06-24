import { cn } from "@/packages/ui/lib/utils"
import { Header } from "../home/header"
import { Pricing } from "./prices"

const page = () => {
  const Connector = ({ className }: { className?: string }) => {
    return (
      <svg
        className={cn("connector w-fulls", className)}
        viewBox="0 0 304 146" fill="none" xmlns="http://www.w3.org/2000/svg"
      >
        <path className="delay-100 animate-pulse" d="M304 72.9998L0 73" stroke="white" stroke-width="2" />
        <path className="delay-300 animate-pulse" d="M0 145L117.728 145C155.46 145 192.41 134.247 224.25 114L246.841 99.6343C263.926 88.77 283.753 82.9999 304 82.9999" stroke="white" stroke-width="2" />
        <path className="delay-500 animate-pulse" d="M-5.42022e-06 0.999927L117.728 0.999917C155.46 0.999914 192.41 11.7529 224.25 31.9999L246.841 46.3656C263.926 57.2299 283.753 63 304 63" stroke="white" stroke-width="2" />
      </svg>
    )
  }
  return (
    <>
      <Header />
      <div className="relative w-full max-w-5xl mx-auto mt-20">
        {/* <Connector className="absolute -left-[100%] top-0 w-full" /> */}
        {/* <Connector className="absolute rotate-180 -right-[100%] top-0 w-full" /> */}
        <div className="relative flex flex-col items-center justify-center w-full gap-2 border aspect-video">
          <div className="absolute top-0 left-0 w-full h-16 border-b"></div>
          <div className="absolute bottom-0 left-0 w-full h-16 border-t"></div>
          <div className="absolute top-0 left-0 w-16 h-full border-r"></div>
          <div className="absolute top-0 right-0 w-16 h-full border-l"></div>
          <h1 className="text-5xl font-bold">
            Find a plan that fit you
          </h1>
          <p className="text-xl text-center text-secondary">
            Help you get what you want
          </p>
        </div>
      </div>
      <div className="w-full max-w-5xl mx-auto border-x">
        <Pricing />
      </div>
      <div className="w-full max-w-5xl mx-auto border">
        <div className="flex w-full divide-x">
          <div className="w-1/3 p-6">
            <h3 className="text-4xl font-bold">
              Frequently asked questions.
            </h3>
          </div>
          <div className="w-2/3">
            <ul className="divide-y">
              <li className="w-full h-24"></li>
              <li className="w-full h-24"></li>
              <li className="w-full h-24"></li>
              <li className="w-full h-24"></li>
              <li className="w-full h-24"></li>
              <li className="w-full h-24"></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
export default page