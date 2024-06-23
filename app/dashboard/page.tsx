import { Header } from "@/app/home/header"
import { cn } from "@/packages/ui/lib/utils"
import { BiGitCommit } from "react-icons/bi"

const page = () => {

  const recent_tasks = Array.from({ length: 5 }).map((_, i) => i)
  return (
    <>
      <Header />
      <div className="max-w-7xl flex gap-6 mx-auto w-full p-6">
        <div className="w-1/3 h-96 space-y-3">
          <h3 className="text-sm uppercase text-secondary">
            Recent tasks
          </h3>
          <ul>
            {
              recent_tasks.map(task =>
                <li
                  key={`recent-task#${task}`}
                  className={cn(
                    "p-3 hover:bg-yz-neutral-100 border-b border-x transition-colors",
                    "first:rounded-t-xl first:border-t",
                    "last:rounded-b-xl"
                  )}
                >
                  <div
                    className="w-full flex flex-col gap-2"
                  >
                    <div className="w-full flex justify-between">
                      <span className="text-sm text-secondary">
                        order/
                        <span className="text-foreground">#123abc</span>
                      </span>
                      <span className="text-xs text-secondary">1 day ago</span>
                    </div>
                    <div className="flex gap-1">
                      <BiGitCommit className="text-secondary" size={16} />
                      <span className="text-xs text-foreground">commit commentary</span>
                    </div>
                  </div>
                </li>
              )
            }
          </ul>
        </div>
        <div className="w-2/3 h-96">
          <div className="w-full h-full rounded-xl bg-yz-neutral-100" />
        </div>
      </div>
    </>
  )
}
export default page