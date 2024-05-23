"use client"

import { useSession } from "@/hooks/useSession"
import { Button } from "@repo/ui/button"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@repo/ui/input-otp"
import { generateCode, generateSession, getLastCode, sendCode } from "@yz13/api/db/session"
import { useDebounceEffect, useInterval } from "ahooks"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

const CodeBlock = () => {
  const [code, setCode] = useState<number>(0)
  const [timer, setTimer] = useState<number>(0)
  const [enteredCode, setEnteredCode] = useState<number>()
  const router = useRouter()
  const isPassed = code !== 0 ? code === enteredCode : false
  const [session, _, setSession] = useSession()
  const generateCodeAndStartTimer = async () => {
    setTimer(60)
    const new_code = await generateCode()
    sendCode(new_code)
    setCode(new_code)
  }
  useInterval(() => {
    if (timer !== 0) setTimer(prev => prev - 1)
  }, timer ? 1000 : undefined)
  useDebounceEffect(() => {
    if (isPassed) {
      generateSession()
        .then(res => {
          if (res) {
            setSession(res)
            router.refresh()
            router.push("/secured")
          }
        })
    }
  }, [isPassed], { wait: 1000 })
  useDebounceEffect(() => {
    if (!code && !session) {
      getLastCode()
        .then(code => {
          if (code) setCode(code)
          if (!code) generateCodeAndStartTimer()
        })
    }
  }, [code, session], { wait: 1000 })
  if (session) return <Button className="w-full" asChild><Link href="/secured">You already authorized</Link></Button>
  return (
    <div className="w-full flex flex-col items-center justify-center gap-4">
      {
        process.env.NODE_ENV === "development" &&
        <span>{code}</span>
      }
      <InputOTP
        maxLength={6} className="mx-auto" disabled={!code}
        value={(enteredCode || "").toString()}
        onChange={(value) => setEnteredCode(parseInt(value))}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} className="w-12 h-12 text-2xl font-bold aspect-square" />
          <InputOTPSlot index={1} className="w-12 h-12 text-2xl font-bold aspect-square" />
          <InputOTPSlot index={2} className="w-12 h-12 text-2xl font-bold aspect-square" />
          <InputOTPSlot index={3} className="w-12 h-12 text-2xl font-bold aspect-square" />
          <InputOTPSlot index={4} className="w-12 h-12 text-2xl font-bold aspect-square" />
          <InputOTPSlot index={5} className="w-12 h-12 text-2xl font-bold aspect-square" />
        </InputOTPGroup>
      </InputOTP>
      <Button disabled={!!timer} onClick={() => generateCodeAndStartTimer()} className="w-full" variant="ghost">Send new code {timer !== 0 && (timer > 9 ? `0:${timer}` : `0:0${timer}`)}</Button>
    </div>
  )
}
export { CodeBlock }
