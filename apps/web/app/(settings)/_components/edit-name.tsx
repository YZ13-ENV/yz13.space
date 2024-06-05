"use client"
import { Button } from "@repo/ui/button"
import { Input } from "@repo/ui/input"
import { useEffect, useState } from "react"

type Props = {
  value?: string
  disabled?: boolean
  onSave?: (newValue: string) => void
}
const EditNameSection = ({ disabled = false, onSave, value = "" }: Props) => {
  const [text, setText] = useState<string>(value)
  const local_disabled = disabled ? disabled : value === text || !onSave || text.length <= 3
  const handleSave = () => {
    if (onSave) onSave(text)
  }
  useEffect(() => {
    if (value !== text) setText(value)
  }, [value])
  return (
    <section className="space-y-3 w-full p-4 h-fit border rounded-xl bg-accents-1">
      <div className="space-y-1">
        <h3 className="text-xl font-semibold">Name</h3>
        <p className="text-sm text-secondary">
          Name that users can know you there
        </p>
      </div>
      <Input
        value={text}
        onChange={e => setText(e.target.value)}
        className="bg-background" placeholder="Enter name"
      />
      <div className="w-full flex items-center justify-end">
        <Button
          disabled={local_disabled}
          onClick={handleSave}
          variant={local_disabled ? "outline" : "default"}
        >
          Save
        </Button>
      </div>
    </section>
  )
}
export { EditNameSection }
