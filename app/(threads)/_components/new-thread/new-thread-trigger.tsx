"use client"
import { Button } from "@repo/ui/button"
import { BiPlus } from "react-icons/bi"
import { useNewThreadControl } from "./store/control.store"

const NewThreadTrigger = ({ label }: { label?: string }) => {
  const setOpen = useNewThreadControl(state => state.setOpen)
  return (
    <Button onClick={() => setOpen(true)} size="sm" className="gap-2">
      <BiPlus size={16} />
      {label}
    </Button>
  )
}
export { NewThreadTrigger }
