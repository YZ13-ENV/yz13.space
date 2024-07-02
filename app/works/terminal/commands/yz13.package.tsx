import * as json from "@/package.json";
import { randomString } from "@/packages/api/src/helpers";
import { LuCheck, LuFunctionSquare, LuMinus } from "react-icons/lu";
import { plans as plans_list } from "../plans";
import { CommandResponse } from "../registered-commands";


const yz13 = {
  _: (): CommandResponse["result"] => {
    return {
      type: "string",
      payload: "no banner"
    }
  },
  plans: (): CommandResponse["result"] => {
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
  },
  version: (): CommandResponse["result"] => ({ type: "string", payload: json.version }),
};

const packageBanner = () => {
  const packageCommands = Object.keys(yz13)
  const commandsComponent = (
    <div className="w-full border rounded-xl h-fit p-6">
      <span className="text-sm px-4 py-2 rounded-md bg-foreground text-background">YZ13 terminal package</span>
      <ul className="mt-4">
        {
          packageCommands.map(
            cmd => {
              const type = typeof yz13[cmd as keyof typeof yz13]
              const isFunc = type === "function"
              return <li key={"#" + cmd}>
                <div className="w-full inline-flex items-center gap-1.5">
                  <span className="inline-flex justify-center aspect-square items-center">
                    {
                      isFunc &&
                      <LuFunctionSquare size={16} />
                    }
                  </span>
                  <span className="text-sm text-secondary w-20">{cmd}</span>
                  <span className="text-foreground text-sm">{type}</span>
                </div>
              </li>
            }
          )
        }
      </ul>
    </div>
  )
  const response: CommandResponse["result"] = {
    type: "component",
    payload: commandsComponent
  }
  return response
}

yz13._ = packageBanner

export { packageBanner, yz13 };

