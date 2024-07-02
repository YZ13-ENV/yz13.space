"use client"
import { randomString } from "@/packages/api/src/helpers"
import { cn } from "@/packages/ui/lib/utils"
import { useDebounceEffect } from "ahooks"
import dayjs from "dayjs"
import { ElementRef, useRef, useState } from "react"
import { executeCommand } from "./executor"
import { TerminalInput } from "./input"
import { CommandRequest } from "./registered-commands"
import { TerminalRender } from "./render"
import { Log, useLogs } from "./store/logs.store"


const Terminal = ({ className = "" }: { className?: string }) => {
  const { logs, setLogs } = useLogs()
  const [debouncedLogs, setDebouncedLogs] = useState<Log[]>([])
  const addLog = async (log: Log) => setLogs([...logs, log])
  const ref = useRef<ElementRef<"div">>(null)
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
    const debouncedLength = debouncedLogs.length
    const currentLength = logs.length
    if (debouncedLength !== currentLength) {
      setDebouncedLogs(logs)
      const div = ref.current
      if (div) {
        div.scrollIntoView({ behavior: "smooth", block: "end", inline: "end" })
      }
    }
    logs.forEach(log => {
      const hasResponse = logs.find(item => item.type === "response" && item.id === log.id)
      if (hasResponse) return
      const response = executeCommand(log.id, log.command)
      response.then(rs => rs && addLog(rs))
    })
  }, [logs, ref], { wait: 1000 })
  return (
    <div id="terminal" className={cn(
      "space-y-6 w-full h-fit max-h-[75dvh] overflow-y-auto no-scrollbar",
      className
    )}>
      <div className="px-6 pt-6">
        <span className="text-lg font-semibold font-mono">Terminal (beta)</span>
      </div>
      <TerminalRender ref={ref} />
      <TerminalInput onCommand={onCommand} />
    </div>
  )
}
export { Terminal }
