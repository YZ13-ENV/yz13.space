"use client"

import { useDate } from "@/app/_components/entities/date"

const Today = () => {
  const date = useDate(state => state.date)
  const day = date.format("ddd")
  const day_num = date.format("DD")
  return (
    <>
      <span className="text-center text-base text-secondary">{day}</span>
      <span className="text-4xl font-semibold">{day_num}</span>
    </>
  )
}
export {
  Today
}
