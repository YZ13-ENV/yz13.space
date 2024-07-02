"use client"

import { cn } from "@/packages/ui/lib/utils"
import dayjs from "dayjs"
import { HTMLAttributes, forwardRef } from "react"
import { Log, useLogs } from "../store/logs.store"

export interface TerminalRenderProps
  extends HTMLAttributes<HTMLDivElement> { }


const TerminalRender = forwardRef<HTMLDivElement, TerminalRenderProps>(
  ({ className, ...props }, ref) => {
    const { logs, setLogs } = useLogs()
    const setFuncAsExecuted = (log: Log) => {
      const updated = logs.map(item => {
        const isTarget = item.id === log.id && item.type === log.type
        if (isTarget && item.type === "response") return { ...item, result: { ...item.result, executed: true } }
        return item
      })
      setLogs(updated)
    }
    if (!logs.length) return null
    return (
      <div
        ref={ref}
        className={cn("w-full h-fit px-6 flex flex-col gap-3", className)}
        {...props}
      >
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
                if (response.func) {
                  const isExecuted = response.executed === true
                  console.log(isExecuted)
                  if (!isExecuted) {
                    try {
                      if (response.props) response.func(response.props)
                      if (!response.props) response.func()
                    } catch (e) {
                      console.log(e)
                    } finally {
                      setFuncAsExecuted(log)
                    }
                  }
                }
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
                if (isComponent) return <div key={log + `#${type}` + index}>{response.payload}</div>
              }
            }
          )
        }
      </div>
    )
  })
export { TerminalRender }
