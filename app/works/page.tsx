import { Button } from "@/packages/ui/src/components/button"
import { cookies } from "next/headers"
import { BiCheckCircle } from "react-icons/bi"

const page = () => {
  const cookiesList = cookies()
  const locale = cookiesList.get("locale")?.value
  return (
    <>
      {
        locale &&
        <span className="absolute top-6 left-6 text-xs text-secondary">{locale}</span>
      }
      <div className="max-w-2xl h-fit mx-auto w-full z-10">
        <div className="w-full p-6">
          <span className="text-sm">Builded sites</span>
          <ul className="">
            <li className="w-full min-h-9 py-2 flex gap-4 border-b transition-colors hover:border-foreground">
              <div className="h-24 aspect-video border rounded-lg"></div>
              <div className="w-full flex flex-col">
                <span className="text-base font-medium">App name</span>
                <span className="text-xs text-secondary">App description</span>
              </div>
            </li>
          </ul>
        </div>
        <div className="w-full p-6">
          <div className="w-full h-fit flex items-center gap-4 overflow-x-auto no-scrollbar">
            <div className="h-96 aspect-[1/1.25] flex flex-col gap-2 rounded-xl border p-4">
              <h4 className="text-lg font-semibold">Components</h4>
              <span className="text-4xl font-bold text-foreground">{(2000).toLocaleString()}₽</span>
              <p className="text-sm text-secondary">Just components</p>
              <ul className="space-y-2 py-4">
                <li>
                  <div className="flex items-center gap-2">
                    <BiCheckCircle size={16} />
                    <span className="text-sm">React / Next.js / Tailwind CSS code</span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-2">
                    <BiCheckCircle size={16} />
                    <span className="text-sm">24-hour support response time</span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-2">
                    <BiCheckCircle size={16} />
                    <span className="text-sm">Pause or cancel anytime</span>
                  </div>
                </li>
              </ul>
              <Button className="w-full mt-auto">Contact me</Button>
            </div>
            <div className="h-96 aspect-[1/1.25] flex flex-col gap-2 rounded-xl border p-4">
              <h4 className="text-lg font-semibold">Pages</h4>
              <span className="text-4xl font-bold text-foreground">{(3499).toLocaleString()}₽</span>
              <p className="text-sm text-secondary">Just components</p>
              <ul className="space-y-2 py-4">
                <li>
                  <div className="flex items-center gap-2">
                    <BiCheckCircle size={16} />
                    <span className="text-sm">React / Next.js / Tailwind CSS code</span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-2">
                    <BiCheckCircle size={16} />
                    <span className="text-sm">24-hour support response time</span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-2">
                    <BiCheckCircle size={16} />
                    <span className="text-sm">Pause or cancel anytime</span>
                  </div>
                </li>
              </ul>
              <Button className="w-full mt-auto">Contact me</Button>
            </div>
            <div className="h-96 aspect-[1/1.25] flex flex-col gap-2 rounded-xl border p-4">
              <h4 className="text-lg font-semibold">Website</h4>
              <span className="text-4xl font-bold text-foreground">от {(11999).toLocaleString()}₽</span>
              <p className="text-sm text-secondary">Just components</p>
              <ul className="space-y-2 py-4">
                <li>
                  <div className="flex items-center gap-2">
                    <BiCheckCircle size={16} />
                    <span className="text-sm">React / Next.js / Tailwind CSS code</span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-2">
                    <BiCheckCircle size={16} />
                    <span className="text-sm">24-hour support response time</span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-2">
                    <BiCheckCircle size={16} />
                    <span className="text-sm">Pause or cancel anytime</span>
                  </div>
                </li>
              </ul>
              <Button className="w-full mt-auto">Contact me</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default page