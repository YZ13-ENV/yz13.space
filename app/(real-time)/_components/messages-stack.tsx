"use client"
import { Button } from "@repo/ui/button"
import { Input } from "@repo/ui/input"
import { createClient } from "@yz13/supabase/client"
import { useLocalStorageState, useTimeout } from "ahooks"
import dayjs from "dayjs"
import { motion } from "framer-motion"
import { ElementRef, useEffect, useRef, useState } from "react"
import { BiUpArrowAlt, BiUser } from "react-icons/bi"
import { getLastMessages, onMessages, uploadMessage } from "./api/messages"
import { VisitorMessage, VisitorMessageWithID, useMessage } from "./store/message-store"

const MessagesStack = () => {
  const [sid] = useLocalStorageState<string | null>("anon-sid", { defaultValue: null })
  const [messages, setMessages] = useState<VisitorMessageWithID[]>([])
  const client = createClient()
  const messages_channel = client.channel("messages")
  const [text, setText] = useState<string>("")
  const input_ref = useRef<ElementRef<"input">>(null)
  const [show, setShow] = useState<boolean>(false)
  const setMessage = useMessage(state => state.setMessage)
  useTimeout(() => {
    setShow(false)
  }, show ? 3000 : undefined)
  useEffect(() => {
    setShow(true)
  }, [messages])
  const sendMessage = () => {
    const message: VisitorMessage = {
      created_at: dayjs().toISOString(),
      text: text,
      uid: sid || "anon"
    }
    messages_channel.send({
      type: "broadcast",
      event: "message",
      payload: message
    })
      .then(() => {
        setMessage(message)
        uploadMessage(message)
      })
    setText("")
  }
  useEffect(() => {
    getLastMessages()
      .then(res => {
        const data = (res.data || [])
        setMessages(data)
      })
  }, [])
  useEffect(() => {
    onMessages(change => {
      const event_type = change.eventType
      getLastMessages()
        .then(res => {
          const data = (res.data || [])
          setMessages(data)
        })
      if (event_type === "INSERT") {
        const newMessage = change.new
        setMessage(newMessage)
      }
    })
  }, [messages])
  useEffect(() => {
    const input = input_ref.current
    if (typeof document !== "undefined" && input) {
      document.addEventListener("keyup", e => {
        if (e.code === "Space") {
          input.focus()
        }
      })
    }
  }, [typeof document, input_ref])
  return (
    <div className="w-full max-w-sm space-y-3">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="w-full space-y-2"
      >
        {
          messages
            .slice(0, 5)
            .reverse()
            .map(message =>
              <div key={message.created_at + message.uid} className="flex items-start gap-2">
                <div className="w-9 aspect-square rounded-full bg-accents-1 border flex items-center justify-center">
                  <BiUser className="text-secondary" size={16} />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <span className="font-medium text-sm">Visitor</span>
                    <span className="text-xs text-secondary">#{message.uid.slice(0, 6)}</span>
                  </div>
                  <span className="text-xs">{message.text}</span>
                  <span className="text-xs text-secondary">{dayjs(message.created_at).format("HH:mm")}</span>
                </div>
              </div>
            )
        }
      </motion.div>
      <div className="flex items-center gap-2">
        <Input
          ref={input_ref}
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyUp={e => e.code === "Enter" && sendMessage()}
          placeholder="Write message"
          className="w-full h-9 rounded-full bg-background"
        />
        <Button
          disabled={text.length === 0}
          onClick={sendMessage}
          onKeyDown={e => e.key === "Enter" && text.length !== 0 ? sendMessage() : null}
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
