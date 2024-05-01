"use client"

import { DevStack } from "@/types"
import { cn } from "@repo/ui/cn"
import { useEffect, useState } from "react"
import { GridItem } from "../../../shared/stack-card"
import { getTech } from "../api/stack"

type Props = {
  className?: string
  stack?: string[]
  max?: number
}
const ProjectStack = ({ className = "", stack = [], max = 0 }: Props) => {
  const withMaxFilter = stack.filter((_, i) => max ? i + 1 <= max : _)
  const howMuchLeft = max ? stack.length - max : 0
  const [tech, setTech] = useState<DevStack[]>([])
  const isReady = tech.length === withMaxFilter.length
  useEffect(() => {
    if (!!withMaxFilter.length) {
      withMaxFilter.forEach(stack_item => {
        getTech(stack_item)
          .then(res => {
            if (res.data) {
              const length = res.data.length
              const item = res.data[0]
              if (length >= 1) setTech(prev => prev.findIndex(from_prev => from_prev.id === item.id) > -1 ? prev : [...prev, item])
            }
          })
      })
    }
    // console.log(stack)
  }, [withMaxFilter])
  if (!isReady) return (
    <div className={cn('w-full grid grid-cols-2 auto-rows-auto h-fit gap-4 py-8', className)}>
      {
        withMaxFilter.map(tech =>
          <div key={"framework-" + tech} className='flex items-center bg-muted animate-pulse rounded-xl w-full gap-2 cursor-pointer h-14' />
        )
      }
    </div>
  )
  return (
    <div className={cn('w-full grid grid-cols-2 auto-rows-auto h-fit gap-4 py-8', className)}>
      {
        tech
          .map(tech =>
            <GridItem
              key={"framework-" + tech.id}
              icon={tech.icon}
              name={tech.name}
              description={tech.description}
            />
          )
      }
      {
        howMuchLeft > 0 &&
        <div className='flex px-2 items-center w-full gap-2 cursor-pointer h-14'>
          <span className="text-muted-foreground">+ ещё {howMuchLeft}</span>
        </div>
      }
    </div>
  )
}
export { ProjectStack }
