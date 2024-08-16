"use client"
import { Button } from "@yz13/mono/components/button"
import { useInterval } from "ahooks"
import Link from "next/link"
import { useState } from "react"
import { LuCheck, LuCopy, LuMail } from "react-icons/lu"


const StatusButtons = () => {
  const [copied, setCopied] = useState<boolean>(false)
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error(error);
    }
  }
  useInterval(() => {
    setCopied(false)
  }, copied ? 2000 : undefined)
  return (
    <>
      <Button className="size-10 shrink-0 rounded-lg" size="icon" variant="outline" asChild>
        <Link href={"mailto:YZTHECEO@yandex.ru"}>
          <LuMail size={18} />
        </Link>
      </Button>
      <Button
        onClick={() => {
          setCopied(true)
          copy("YZTHECEO@yandex.ru")
        }}
        className="size-10 shrink-0 rounded-lg"
        size="icon"
        variant="outline"
      >
        {
          copied
            ? <LuCheck size={18} />
            : <LuCopy size={18} />
        }
      </Button>
    </>
  )
}
export { StatusButtons }
