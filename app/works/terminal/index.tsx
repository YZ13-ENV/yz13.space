"use client"
import { randomString } from "@/packages/api/src/helpers"
import { useDebounceEffect } from "ahooks"
import dayjs from "dayjs"
import { keys } from "lodash"
import { useState } from "react"
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
    console.log(isCallRootPackage, isCommandCall)
    if (isCallRootPackage) {
      const packageCommands = keys(registered_packages[packageCall])
      const commands = packageCommands.join(" ")
      const response: CommandResponse = {
        command: commandToParse,
        created_at: dayjs().toISOString(),
        id: commandId,
        type: "response",
        result: {
          type: "string",
          payload: commands
        }
      }
      addLog(response)
    }
    if (isCommandCall) {
      try {
        const cmd_res = registered_packages[packageCall][commandCall]()
        const isArray = Array.isArray(cmd_res) ? "list" : false
        const recordedType = typeof cmd_res
        if (isArray === "list" || recordedType === "string" || recordedType === 'number') {
          const response: CommandResponse = {
            command: commandToParse,
            created_at: dayjs().toISOString(),
            id: commandId,
            type: "response",
            // @ts-ignore
            result: {
              type: isArray === "list" ? isArray : recordedType as CommandResponse["result"]["type"],
              payload: cmd_res
            }
          }
          addLog(response)
        }
      } catch (e) {
        const response: CommandResponse = {
          command: commandToParse,
          created_at: dayjs().toISOString(),
          id: commandId,
          type: "response",
          result: {
            type: "string",
            payload: "Error"
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
