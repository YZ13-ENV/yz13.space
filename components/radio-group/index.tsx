"use client"
import { cn } from "@repo/ui/cn"
import { ReactNode, useEffect } from "react"
import { PiDotFill } from "react-icons/pi"
import { create } from "zustand"

type Store = {
  selected: string | undefined
  setSelected: (selected: string | undefined) => void
}

const useRadioStore = create<Store>(set => ({
  selected: undefined,
  setSelected: (selected) => set(() => ({ selected: selected }))
}))

interface RadioGroupProps {
  value?: string
  onValueChange?: (value: string) => void
  className?: string
  children?: ReactNode
}

const RadioGroup = ({ children, className = "", onValueChange, value }: RadioGroupProps) => {
  const current = useRadioStore(state => state.selected)
  const set = useRadioStore(state => state.setSelected)
  if (value) set(value)
  useEffect(() => {
    if (onValueChange && current) onValueChange(current)
  }, [current])
  return (
    <div className={cn("w-full", className)}>
      {children}
    </div>
  )
}

const RadioLabel = ({ value, children, className = "" }: { value: string, className?: string, children?: ReactNode }) => {
  const current = useRadioStore(state => state.selected)
  const isSelected = current === value
  return (
    <label
      htmlFor={value}
      className={cn(
        "border transition-colors cursor-pointer",
        isSelected ? "border-foreground" : "",
        className
      )}
    >
      {children}
    </label>
  )
}

const RadioItem = ({
  value, className = ""
}: {
  value: string, className?: string
}) => {
  const current = useRadioStore(state => state.selected)
  const set = useRadioStore(state => state.setSelected)
  const isSelected = current === value
  return (
    <button
      id={value}
      onClick={() => isSelected ? set(undefined) : set(value)}
      className={cn(
        "size-4 shrink-0 border rounded-md aspect-square",
        "flex items-center justify-center transition-colors",
        isSelected ? "bg-foreground/20 border-foreground" : "",
        className
      )}
    >
      {isSelected && <PiDotFill size={20} className="text-foreground" />}
    </button>
  )
}

export { RadioGroup, RadioItem, RadioLabel }
