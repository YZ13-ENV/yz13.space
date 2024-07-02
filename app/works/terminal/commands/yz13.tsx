import { randomString } from "@/packages/api/src/helpers";
import { LuCheck, LuMinus } from "react-icons/lu";
import { plans as plans_list } from "../plans";
import { CommandResponse } from "../registered-commands";


const plans = (): CommandResponse["result"] => {
  const componentID = "#" + randomString(10)
  const type = "component"
  const component = (
    <div key={componentID} className="space-y-1">
      <span className="text-sm font-mono">Current plans</span>
      <ul className="pl-6">
        {
          plans_list.map(
            item => <li key={item.id + "#" + item.name} className="h-6">
              <div className="flex items-center gap-1 h-full font-mono">
                <span className="w-4 aspect-square inline-flex items-center justify-center">
                  {item.checked ? <LuCheck size={14} /> : <LuMinus size={14} />}
                </span>
                <span className="text-sm">{item.name}</span>
              </div>
            </li>
          )
        }
      </ul>
    </div>
  )
  return {
    type: type,
    payload: component
  }
}
export { plans };
