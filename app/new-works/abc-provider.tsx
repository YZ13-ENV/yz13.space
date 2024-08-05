"use client"
import { useEffect } from "react"
import { useAbc } from "./abc-store"


type ProviderProps = {
  initialValue?: string[]
}

const AbcProvider = ({ initialValue = [] }: ProviderProps) => {
  const setAbc = useAbc(state => state.setAbc)
  useEffect(() => {
    if (!!initialValue) setAbc(initialValue)
  }, [initialValue])
  return <></>
}
export { AbcProvider }
