"use client"

import { useInterval } from "ahooks"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { useDate } from "../store/date-store"

const DateProvider = () => {
  const setDate = useDate(state => state.setDate)
  const [ready, setReady] = useState<boolean>(false)
  useInterval(() => {
    setDate(dayjs())
  }, ready ? 1000 : undefined)
  useEffect(() => {
    setReady(true)
  }, [])
  return <></>
}
export { DateProvider }
