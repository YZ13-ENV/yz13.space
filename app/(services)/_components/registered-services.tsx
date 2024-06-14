import { Playground } from "@/microservices/playground/src"
import { BrowserMini, CalendarEvents, List, MusicPlayer } from "@microservices/widgets-lib"
import { ReactNode } from "react"
import { BiCalendar, BiListUl } from "react-icons/bi"
import { BsMusicPlayer } from "react-icons/bs"
import { HiMiniCursorArrowRipple } from "react-icons/hi2"
import { IconType } from "react-icons/lib"
import { LuKeyRound } from 'react-icons/lu'

type ServiceRoute = {
  route: string // /router/**/*
  title: string
  icon?: IconType
  entry: ReactNode
  as?: "widget" | "page" // default "widget"
}

type Service = {
  service_id: string
  title: string
  description?: string
  entry: ReactNode
  routes: ServiceRoute[]
}

const playground_service: Service = {
  service_id: "real-time",
  title: "Realtime",
  entry: <Playground />,
  routes: [
    {
      route: "/",
      icon: HiMiniCursorArrowRipple,
      entry: <Playground />,
      title: "Playground",
    }
  ]
}

const widgets_lib_service: Service = {
  service_id: "widgets",
  title: "Widgets library",
  description: "A simple widgets library",
  entry: <List />,
  routes: [
    {
      route: '/list',
      entry: <List />,
      icon: BiListUl,
      title: "List"
    },
    {
      route: "/browser",
      entry: <BrowserMini />,
      icon: LuKeyRound,
      title: "Password manager"
    },
    {
      route: "/calendar",
      entry: <CalendarEvents />,
      icon: BiCalendar,
      title: "Calendar"
    },
    {
      route: "/music-player",
      entry: <MusicPlayer />,
      icon: BsMusicPlayer,
      title: "Music player"
    }
  ]
}

const registered_services: Service[] = [
  widgets_lib_service,
  playground_service
]
export { registered_services }
