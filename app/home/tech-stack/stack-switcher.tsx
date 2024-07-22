"use client"
import { Switch } from "@repo/ui/switch"


export type StackName = "frontend" | "backend"

type Props = {
  defaultValue?: StackName
  value?: StackName
  onValue?: (value: StackName) => void
}
const StackSwitcher = ({ defaultValue, onValue, value }: Props) => {
  const lastValue = value ?? defaultValue ?? "frontend"
  const isChecked = lastValue === "backend"
  const onChecked = (checked: boolean) => {
    if (!!onValue) {
      if (checked === true) onValue("backend")
      if (checked === false) onValue("frontend")
    }
  }
  return (
    <div className="flex justify-center gap-4 w-full">
      <button onClick={() => onChecked(false)}>
        <span>Frontend</span>
      </button>
      <Switch checked={isChecked} onCheckedChange={onChecked} id="tech-stack-switch" />
      <button onClick={() => onChecked(true)}>
        <span>Backend</span>
      </button>
    </div>
  )
}
export { StackSwitcher }
