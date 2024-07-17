"use client"
import icon from "@/components/pixel-stack/icon.module.css"
import { AutoSwitcher, Header, HeaderList, Item, Stack, Wrapper } from "@/components/tech-stack"
import { useSpring } from "framer-motion"
import { useEffect, useMemo, useState } from "react"

const FrontendTechStack = ({ title, stack = [] }: { title?: string, stack?: Stack[] }) => {
  const [selected, setSelected] = useState<string | null>(null)
  const y = useSpring(0)
  const [index, setIndex] = useState<number | null>(null)
  const [isOut, setIsOut] = useState<boolean>(true)
  const maxIndex = (stack.length - 1)
  const isAutoMode = useMemo(() => { return index !== null }, [index])
  useEffect(() => {
    if (index !== null) {
      const target = stack.find((_, targetIndex) => index === targetIndex)
      if (target) setSelected(target.value)
    }
  }, [index])
  useEffect(() => {
    if (selected) {
      const target = stack.find(item => item.value === selected)
      if (target) y.set(target.y)
    } else y.set(0)
  }, [selected])
  return (
    <Wrapper className="w-full grid lg:grid-cols-4 grid-cols-2 grid-rows-3 lg:grid-rows-2"
      onEnter={() => {
        setIsOut(false)
      }}
      onLeave={() => {
        setSelected(null)
        setIsOut(true)
      }}
    >
      <AutoSwitcher stop={!isOut} index={index} maxIndex={maxIndex} onIndex={setIndex} />
      <Header title={title}>
        <HeaderList y={y} selected={selected} stack={stack} />
      </Header>
      {
        stack
          .map(
            (item, techIndex) => {
              const isSelected = techIndex === index
              return (
                <Item
                  key={"tech#" + techIndex}
                  stack={item}
                  onChange={setSelected}
                  className={isAutoMode ? isSelected ? icon["active-icon"] : "" : icon["icon-wrapper"]}
                />
              )
            }
          )
      }
    </Wrapper>
  )
}
export { FrontendTechStack }
