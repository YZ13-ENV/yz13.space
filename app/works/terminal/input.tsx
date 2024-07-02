"use client"

import { Button } from "@/packages/ui/src/components/button"
import { Input } from "@/packages/ui/src/components/input"
import { useState } from "react"
import { useLogs } from "./store/logs.store"

type Props = {
  onCommand?: (cmd: string) => void
}
const TerminalInput = ({ onCommand }: Props) => {
  const username = "yz13"
  const [command, setCommand] = useState<string>("")
  const logs = useLogs(state => state.logs)
  const setLogs = useLogs(state => state.setLogs)
  const canBeCleared = logs.length >= 5
  return (
    <div className="shrink flex gap-2 px-6 font-mono h-12 items-center sticky bottom-0 bg-background border-t">
      <span className="text-sm shrink-0">
        {username}@yz13.space ~
      </span>
      <Input
        placeholder="type yz13 to show commands"
        spellCheck={false}
        className="h-5 text-sm p-0 !border-0 rounded-none !outline-none !ring-0 shadow-none"
        autoFocus
        onKeyUp={e => {
          const key = e.key
          if (key === "Enter") {
            if (onCommand) onCommand(command)
            setCommand("")
          }
        }}
        value={command}
        onChange={e => setCommand(e.target.value)}
      />
      <Button onClick={() => setLogs([])} disabled={!canBeCleared} variant="outline" size="sm">Clear</Button>
    </div>
  )
}
export { TerminalInput }
