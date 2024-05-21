"use client"

import { Commit } from "@/types/repo"
import { useEffect } from "react"
import { useCommits } from "../store/commits-store"

const CommitsProvider = ({ commits = [] }: { commits?: Commit[] }) => {
  const setCommits = useCommits(state => state.setCommits)
  useEffect(() => {
    if (commits.length > 0) setCommits(commits)
  }, [commits])
  return <></>
}
export { CommitsProvider }
