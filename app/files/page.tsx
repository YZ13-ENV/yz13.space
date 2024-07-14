import { Dock } from "@/components/dock"
import { Button } from "@repo/ui/button"
import { cn } from "@repo/ui/cn"
import { PiArrowUpRight } from "react-icons/pi"
import files from "./files.module.css"


const page = () => {
  return (
    <>
      <Dock />
      <main className="w-full flex gap-2 p-2">
        <div className={cn(files["column"], "")}>
          <div className="w-full space-y-1 p-1 rounded-xl border border-yz-neutral-400 group">
            <div className={files["file-cover-wrapper"]}>
              <div className="w-full aspect-[2/0.5] rounded-xl bg-yz-neutral-200" />
              <div className="w-full h-fit absolute bottom-0 left-0 p-4 flex items-center justify-between">
                <span className="text-xs">Project</span>
                <span className="text-xs">Created-at</span>
              </div>
            </div>
            <Button className="w-full gap-2 text-xs" variant="secondary">
              View thing
              <PiArrowUpRight size={16} />
            </Button>
          </div>
          <div className="w-full space-y-1 p-1 rounded-xl border border-yz-neutral-400 group">
            <div className="w-full aspect-video rounded-xl bg-yz-neutral-200" />
            <Button className="w-full gap-2 text-xs" variant="secondary">
              View thing
              <PiArrowUpRight size={16} />
            </Button>
          </div>
          <div className="w-full space-y-1 p-1 rounded-xl border border-yz-neutral-400 group">
            <div className="w-full aspect-[4/3] rounded-xl bg-yz-neutral-200" />
            <Button className="w-full gap-2 text-xs" variant="secondary">
              View thing
              <PiArrowUpRight size={16} />
            </Button>
          </div>
        </div>

        <div className={cn(files["column"], "")}>
          <div className="w-full space-y-1 p-1 rounded-xl border border-yz-neutral-400 group">
            <div className="w-full aspect-video rounded-xl bg-yz-neutral-200" />
            <Button className="w-full gap-2 text-xs" variant="secondary">
              View thing
              <PiArrowUpRight size={16} />
            </Button>
          </div>
          <div className="w-full space-y-1 p-1 rounded-xl border border-yz-neutral-400 group">
            <div className="w-full aspect-[2/0.75] rounded-xl bg-yz-neutral-200" />
            <Button className="w-full gap-2 text-xs" variant="secondary">
              View thing
              <PiArrowUpRight size={16} />
            </Button>
          </div>
          <div className="w-full space-y-1 p-1 rounded-xl border border-yz-neutral-400 group">
            <div className="w-full aspect-[4/3] rounded-xl bg-yz-neutral-200" />
            <Button className="w-full gap-2 text-xs" variant="secondary">
              View thing
              <PiArrowUpRight size={16} />
            </Button>
          </div>
        </div>

        <div className={cn(files["column"], "")}>
          <div className="w-full space-y-1 p-1 rounded-xl border border-yz-neutral-400 group">
            <div className="w-full aspect-[4/3] rounded-xl bg-yz-neutral-200" />
            <Button className="w-full gap-2 text-xs" variant="secondary">
              View thing
              <PiArrowUpRight size={16} />
            </Button>
          </div>
          <div className="w-full space-y-1 p-1 rounded-xl border border-yz-neutral-400 group">
            <div className="w-full aspect-video rounded-xl bg-yz-neutral-200" />
            <Button className="w-full gap-2 text-xs" variant="secondary">
              View thing
              <PiArrowUpRight size={16} />
            </Button>
          </div>
          <div className="w-full space-y-1 p-1 rounded-xl border border-yz-neutral-400 group">
            <div className="w-full aspect-[2/0.5] rounded-xl bg-yz-neutral-200" />
            <Button className="w-full gap-2 text-xs" variant="secondary">
              View thing
              <PiArrowUpRight size={16} />
            </Button>
          </div>
        </div>

      </main>
    </>
  )
}
export default page