"use client"

import { Vitals } from "@yz13/api/db/types"
import { useEffect } from "react"
import { useVitals } from "../store/vitals-store"

const VitalsProvider = ({ vitals = [] }: { vitals?: Vitals[] }) => {
  const setVitals = useVitals(state => state.setVitals)
  useEffect(() => {
    if (vitals.length > 0) setVitals(vitals)
  }, [vitals])
  return <></>
}
export { VitalsProvider }
