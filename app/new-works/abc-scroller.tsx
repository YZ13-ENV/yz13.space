"use client"
import { useEffect } from "react"

type Props = {
  lt?: string
}

const AbcScroller = ({ lt }: Props) => {
  useEffect(() => {
    if (lt && typeof document !== "undefined") {
      const ID = `letter#${lt}`
      const target = document.getElementById(ID)
      if (target) target.scrollIntoView({ block: "center", behavior: "smooth" })
    }
  }, [lt, typeof document])
  return <></>
}
export { AbcScroller }
