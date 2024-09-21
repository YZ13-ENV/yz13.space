"use client"
import { Loader2Icon } from "lucide-react"
import { Button } from "@yz13/mono/components/button"
import { useState } from "react"
import { InspirationCard } from "./inspiration-card"
import { inspirations } from "@/actions/inspiration"
import { Locales, useI18n } from "@/locales/client"

type ListProps = {
  lang?: Locales
  data?: any[]
  loader?: boolean
  offset?: number
}

const InspirationList = ({ offset: providedOffset = 0, lang = "en", data = [], loader = false }: ListProps) => {
  const [offset, setOffset] = useState<number>(providedOffset)
  const [list, setList] = useState<any[]>(data)
  const [loading, setLoading] = useState<boolean>(false)
  const [end, setEnd] = useState<boolean>(false)
  const disabled = loading
  const t = useI18n()
  const load = async () => {
    setLoading(true)
    try {
      const items = await inspirations(lang, offset)
      console.log(items)
      const isEmpty = items ? items.length === 0 : true
      if (!isEmpty) {
        setList([...list, ...items])
        setOffset(prev => prev + 12)
      } else setEnd(true)
      setLoading(false)
    } catch (e) {
      setLoading(false)
    }
  }
  return (
    <>
      {
        list.map(inspiration => <InspirationCard key={inspiration.id} inspiration={inspiration} />)
      }
      {
        loader && !end &&
        <div className="flex items-center justify-center col-span-full">
          <Button
            onClick={load}
            disabled={disabled}
            className="gap-2"
            variant="ghost"
            size="sm"
          >
            {loading && <Loader2Icon size={16} className="animate-spin" />}
            {!loading && t("inspiration.action.load-more")}
          </Button>
        </div>
      }
    </>
  )
}
export { InspirationList }
