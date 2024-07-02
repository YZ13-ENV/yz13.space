import { LuFunctionSquare } from "react-icons/lu"
import { CommandResponse } from "../registered-commands"


const router = {
  _: (): CommandResponse["result"] => {
    return {
      type: "string",
      payload: "no banner"
    }
  },
  go: (path: string): CommandResponse["result"] => {
    return {
      type: "string",
      payload: "moving to " + path,
    }
  }
}

const packageBanner = () => {
  const packageCommands = Object.keys(router)
  const commandsComponent = (
    <div className="w-full border rounded-xl h-fit p-6">
      <span className="text-sm px-4 py-2 rounded-md bg-foreground text-background">Router terminal package</span>
      <ul className="mt-4">
        {
          packageCommands.map(
            cmd => {
              const type = typeof router[cmd as keyof typeof router]
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

router._ = packageBanner

export { router }
