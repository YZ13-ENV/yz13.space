import { Locales } from "@/dictionaries/tools"
import { Button } from "@yz13/mono/components/button"
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi"
import { LuBell } from "react-icons/lu"

type ControlCenterProps = {
  lang?: Locales
}

const ControlCenter = ({ lang = "en" }: ControlCenterProps) => {
  return (
    <div className="w-full h-full flex p-2 lg:!flex-row flex-col gap-3">
      <div className="w-2/3 h-full">
        <div className="flex items-center flex-col gap-1.5 justify-center w-full h-full">
          <LuBell size={48} className="text-secondary" />
          <span className="text-secondary">No notifications yet</span>
        </div>
      </div>
      <div className="w-1/3 h-full space-y-3">
        <div className="flex flex-col">
          <span className="text-secondary">Вторник</span>
          <span className="text-secondary text-lg font-medium">13 Августа 204</span>
        </div>
        <div className="w-full h-fit space-y-2 p-2 rounded-xl border">
          <div className="w-full h-6 flex items-center justify-between">
            <Button className="size-6" size="icon" variant="ghost">
              <BiLeftArrowAlt size={16} />
            </Button>
            <Button className="size-6" size="icon" variant="ghost">
              <BiRightArrowAlt size={16} />
            </Button>
          </div>
          <div className="w-full aspect-square rounded-xl border"></div>
        </div>
        <div className="w-full aspect-video rounded-xl border">
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-sm text-secondary">No events yet</span>
          </div>
        </div>
      </div>
    </div>
  )
}
export { ControlCenter }
