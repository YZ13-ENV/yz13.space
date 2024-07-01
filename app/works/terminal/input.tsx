"use client"

import { Input } from "@/packages/ui/src/components/input"
import { useState } from "react"

type Props = {
  onCommand?: (cmd: string) => void
}
const TerminalInput = ({ onCommand }: Props) => {
  const username = "yz13"
  const [command, setCommand] = useState<string>("")
  return (
    <div className="flex gap-2 font-mono">
      <span className="text-sm shrink-0">
        {username}@yz13.space ~
      </span>
      <Input
        placeholder="type yz13 to show commands"
        spellCheck={false}
        className="h-5 text-sm p-0 !border-0 rounded-none !outline-none !ring-0" autoFocus
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
    </div>
  )
}
export { TerminalInput }
