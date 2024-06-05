"use client"
import { Button } from "@repo/ui/button"
import { Input } from "@repo/ui/input"
import { createClient } from "@yz13/supabase/client"
import { useLocalStorageState } from "ahooks"
import dayjs from "dayjs"
import { useState } from "react"
import { BiUpArrowAlt, BiUser } from "react-icons/bi"
import { VisitorMessage, useMessages } from "./messages-store"

const MessagesStack = () => {
  const [sid] = useLocalStorageState<string | null>("anon-sid", { defaultValue: null })
  const messages = useMessages(state => state.messages)
  const client = createClient()
  const messages_channel = client.channel("messages")
  console.log(messages)
  const [text, setText] = useState<string>("")
  const sendMessage = () => {
    const message: VisitorMessage = {
      created_at: dayjs().toISOString(),
      text: text,
      uid: sid || "anon"
    }
    messages_channel.subscribe((status) => {
      if (status === "SUBSCRIBED") {
        messages_channel.send({
          type: "broadcast",
          event: "message",
          payload: message
        })
        setText("")
      }
    })
  }
  return (
    <div className="w-full max-w-sm space-y-3">

      {
        messages.length !== 0
        &&
        <div className="w-full space-y-2">
          {
            messages.map(message =>
              <div key={message.created_at + message.uid} className="flex items-start gap-2">
                <div className="w-9 aspect-square rounded-full bg-accents-1 border flex items-center justify-center">
                  <BiUser className="text-secondary" size={16} />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <span className="font-medium text-sm">Username</span>
                    <span className="text-xs text-secondary">#di21d</span>
                  </div>
                  <span className="text-xs">Message</span>
                  <span className="text-xs text-secondary">12:10</span>
                </div>
              </div>
            )
          }
        </div>
      }

      <div className="flex items-center gap-2">
        <Input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Write message"
          className="w-full h-9 rounded-full bg-background"
        />
        <Button
          disabled={text.length === 0}
          onClick={sendMessage}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          size="icon"
          className="shrink-0 rounded-full"
        >
          <BiUpArrowAlt size={20} />
        </Button>
      </div>
    </div>
  )
}
export { MessagesStack }
