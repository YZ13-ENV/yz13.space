import * as json from "@/package.json";
import { LuCheck, LuMinus } from "react-icons/lu";
import { plans } from "../plans";
import { CommandResponse } from "../registered-commands";


const yz13 = {
  plans: (): CommandResponse["result"] => {
    const type = "component"
    const component = (
      <div className="space-y-1">
        <span className="text-sm font-mono">Current plans</span>
        <ul>
          {
            plans.map(
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
  },
  version: (): CommandResponse["result"] => ({ type: "string", payload: json.version }),
};

export { yz13 };
