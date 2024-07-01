"use client"
import { randomString } from "@/packages/api/src/helpers"
import { useDebounceEffect } from "ahooks"
import dayjs from "dayjs"
import { keys } from "lodash"
import { useState } from "react"
import { LuFunctionSquare } from "react-icons/lu"
import { TerminalInput } from "./input"
import { CommandPending, CommandRequest, CommandResponse, registered_packages } from "./registered-commands"

type Log = CommandRequest | CommandPending | CommandResponse

const Terminal = () => {
  const [logs, setLogs] = useState<Log[]>([])

  const addLog = async (log: Log) => setLogs([...logs, log])
  const parseCommand = (commandId: string, commandToParse: string) => {
    const splitCommand = commandToParse.split(" ")
    const packageCall = splitCommand[0] as keyof typeof registered_packages
    const commandCall = splitCommand[1] as keyof typeof registered_packages[typeof packageCall]
    const isCallRootPackage = splitCommand.length === 1 && !!packageCall
    const isCommandCall = !!packageCall && !!commandCall
    if (isCallRootPackage) {
      const packageCommands = keys(registered_packages[packageCall])
      const commandsComponent = (
        <div className="w-full">
          <ul className="pl-6">
            {
              packageCommands.map(
                cmd => {
                  const type = typeof registered_packages[packageCall][cmd as keyof typeof registered_packages[typeof packageCall]]
                  const isFunc = type === "function"
                  return <li key={commandId + "#" + cmd}>
                    <div className="w-full inline-flex items-center gap-1.5">
                      <span className="inline-flex justify-center aspect-square items-center">
                        {
                          isFunc &&
                          <LuFunctionSquare size={16} />
                        }
                      </span>
                      <span className="text-sm">{cmd} / {type}</span>
                    </div>
                  </li>
                }
              )
            }
          </ul>
        </div>
      )
      const response: CommandResponse = {
        command: commandToParse,
        created_at: dayjs().toISOString(),
        id: commandId,
        type: "response",
        result: {
          type: "component",
          payload: commandsComponent
        }
      }
      addLog(response)
    }
    if (isCommandCall) {
      try {
        const cmd_res = registered_packages[packageCall][commandCall]()
        const response: CommandResponse = {
          command: commandToParse,
          created_at: dayjs().toISOString(),
          id: commandId,
          type: "response",
          result: cmd_res
        }
        addLog(response)
      } catch (e) {
        const response: CommandResponse = {
          command: commandToParse,
          created_at: dayjs().toISOString(),
          id: commandId,
          type: "response",
          result: {
            type: "string",
            payload: "Error while invoking func"
          }
        }
        addLog(response)
      }
    }
  }
  const onCommand = (cmd: string) => {
    const id = `#${randomString(6)}`
    const request: CommandRequest = {
      type: "request",
      command: cmd,
      id: id,
      created_at: dayjs().toISOString(),
    }
    addLog(request)
  }
  useDebounceEffect(() => {
    console.log(logs)
    logs.forEach(log => {
      const hasResponse = logs.find(item => item.type === "response" && item.id === log.id)
      if (hasResponse) return
      parseCommand(log.id, log.command)
    })
  }, [logs], { wait: 1000 })
  return (
    <div className="space-y-6 w-full h-fit p-6 max-h-[75dvh]">
      <span className="text-lg font-semibold font-mono">Terminal (beta)</span>
      <div className="w-full h-fit flex flex-col gap-1.5">
        {
          logs.map(
            (log, index) => {
              const type = log.type
              const isRequest = type === 'request'
              const isResponse = type === 'response'
              const time = dayjs(log.created_at).format("HH:mm")
              if (isRequest) return <span key={log + `#${type}` + index} className="font-mono text-sm">{time} {log.command}</span>
              if (isResponse) {
                const response = log.result
                const isString = response.type === 'string'
                const isNumber = response.type === 'number'
                const isList = response.type === 'list'
                const isComponent = response.type === 'component'
                if (isString) return (
                  <span key={log + `#${type}` + index} className="font-mono text-sm">
                    {time} {response.payload}
                  </span>
                )
                if (isNumber) return (
                  <span key={log + `#${type}` + index} className="font-mono text-sm">
                    {time} {response.payload}
                  </span>
                )
                if (isList) return (
                  <span key={log + `#${type}` + index} className="font-mono text-sm">
                    {time} {typeof response.payload}
                  </span>
                )
                if (isComponent) return response.payload
              }
            }
          )
        }
      </div>
      <TerminalInput onCommand={onCommand} />
    </div>
  )
}
export { Terminal }
