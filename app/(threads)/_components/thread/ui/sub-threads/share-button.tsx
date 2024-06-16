"use client"

import { useTimeout } from "ahooks"
import { useState } from "react"
import { BiCheck, BiShareAlt } from "react-icons/bi"
import { BtnIcon } from "./btn-icon"
import { Button } from "./button"

type Props = {
  id: Number
}
const ShareButton = ({ id }: Props) => {
  const [copied, setCopied] = useState<boolean>(false)
  const copy = () => {
    const link = `https://yz13.space/${id}`
    navigator
      .clipboard
      .writeText(link)
      .then(() => {
        console.log("copied")
        setCopied(true)
      })
      .catch(console.log)
  }
  useTimeout(() => {
    setCopied(false)
  }, copied ? 1000 : undefined)
  return (
    <Button onClick={copy} disabled={copied}>
      <BtnIcon icon={copied ? BiCheck : BiShareAlt} />
    </Button>
  )
}
export { ShareButton }
