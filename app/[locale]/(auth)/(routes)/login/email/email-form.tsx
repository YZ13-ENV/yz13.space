"use client"
import { Button } from "@yz13/mono/components/button"
import { Input } from "@yz13/mono/components/input"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { createClient } from "yz13/supabase/client"

type Props = {
  continue?: string
}

const EmailForm = ({ continue: continueLink = "/" }: Props) => {
  const sp = createClient()
  const [email, setEmail] = useState<string>("")
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [hasError, setError] = useState<boolean>(false)
  const [password, setPassword] = useState<string>("")
  const disabled = password.length < 6 || email.length < 6
  const router = useRouter()
  const signIn = async () => {
    const { data, error } = await sp.auth.signInWithPassword({
      email: email,
      password: password,
    })
    const user = data.user
    if (error) setError(true)
    if (user) router.push(continueLink)
  }
  return (
    <>
      <Input
        className="h-10"
        placeholder="Enter email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <Input
        type={showPassword ? "text" : "password"}
        className="h-10"
        placeholder="Enter password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      {
        hasError &&
        <span className="text-xs text-error-foreground">Ошибка, проверьте правильно ли введены почта и/или пароль</span>
      }
      <Button
        onClick={signIn}
        disabled={disabled}
        className="w-full rounded-lg mt-2" size="lg"
      >
        Sign in
      </Button>
    </>
  )
}
export { EmailForm }

