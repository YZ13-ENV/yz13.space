"use client"
import { cn } from "@/packages/ui/lib/utils"
import { Button } from "@repo/ui/button"
import { User } from "@supabase/supabase-js"
import { cubicBezier, motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { BiLoaderAlt, BiUpArrowAlt, BiX } from "react-icons/bi"
import { publishThread, SubThread } from "./api/publish-thread"
import { AutoResizeTextArea } from "./auto-resize-textarea"
import { useNewThreadControl } from "./store/control.store"

type Props = {
  user: User
}

const langs = [
  {
    label: "English",
    value: "en"
  },
  {
    label: "Russian",
    value: "ru"
  }
]

const NewThreadForm = ({ user }: Props) => {
  const setOpen = useNewThreadControl(state => state.setOpen)
  const metadata = user.user_metadata
  const name = metadata.name
  const avatar_url = metadata.avatar_url
  const [animated, setAnimated] = useState<boolean>(false)
  const [languages, setLanguages] = useState<string[]>([])
  const [text, setText] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const disabled = !text.length || loading || !languages.length
  const pickLang = (language: string) => {
    const isPicked = languages.includes(language)
    if (isPicked) {
      setLanguages(languages.filter(item => item !== language))
    } else setLanguages([...languages, language])
  }
  const publish = async () => {
    setLoading(true)
    const sub_thread: Partial<SubThread> = {
      attachments: [],
      author: [name],
      text: text,
      lang: languages,
    }
    try {
      const result = await publishThread(sub_thread)
      if (result) {
        console.log(result)
        setOpen(false)
      }
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }
  return (
    <motion.div
      layout
      transition={{
        type: "spring",
        duration: .750,
        delay: 0,
        easings: cubicBezier(.96, .00, .66, 1),
        bounce: .45
      }}
      initial={{ height: "60px" }}
      animate={{ height: "fit-content", minHeight: "60px" }}
      onClick={e => e.stopPropagation()}
      onAnimationComplete={() => setAnimated(true)}
      className="max-w-xl border w-full rounded-2xl max-h-full bg-background h-fit"
    >
      {
        animated &&
        <>
          <div className="w-full flex justify-between items-center p-2">
            <Button size="icon" variant="ghost" className="rounded-full"><BiX size={20} /></Button>
          </div>
          <div className="w-full flex flex-row items-start h-fit px-4 py-2 gap-4 overflow-y-auto no-scrollbar max-h-96">
            <Image
              src={avatar_url}
              className="rounded-full sticky top-0 w-9 aspect-square shrink-0"
              width={36} height={36} alt="user-avatar"
            />
            <AutoResizeTextArea
              text={text}
              onText={setText}
              placeholder="Whats happening?"
            />
          </div>
          <div className="flex p-2 flex-col gap-1">
            <span className="text-xs text-secondary py-1 px-2">Relative languages</span>
            <div className="w-full flex flex-wrap gap-1 items-start">
              {
                langs.map(
                  lang => {
                    const isPicked = languages.includes(lang.value)
                    return <span
                      onClick={() => pickLang(lang.value)}
                      key={lang.label + "#" + lang.value}
                      className={cn(
                        "text-xs rounded-md px-2 py-1 border border-transparent cursor-pointer",
                        isPicked ? "bg-foreground text-background" : "border-border bg-background text-secondary"
                      )}
                    >
                      {lang.label}
                    </span>
                  }
                )
              }
            </div>
          </div>
          <div className="w-full border-t p-2 flex items-center justify-between">
            <div></div>
            <Button onClick={publish} disabled={disabled} variant="default" className="rounded-xl gap-2 transition-all">
              {
                loading
                  ? <BiLoaderAlt size={16} className="animate-spin" />
                  : <BiUpArrowAlt size={16} />
              }
              Publish
            </Button>
          </div>
        </>
      }
    </motion.div>
  )
}
export { NewThreadForm }
