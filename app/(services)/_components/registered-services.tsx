import { Playground } from "@/microservices/playground/src"
import { BrowserMini, CalendarEvents, List, MusicPlayer } from "@microservices/widgets-lib"
import { ReactNode } from "react"
import { BiCalendar, BiListUl } from "react-icons/bi"
import { BsMusicPlayer } from "react-icons/bs"
import { HiMiniCursorArrowRipple } from "react-icons/hi2"
import { IconType } from "react-icons/lib"
import { LuKeyRound } from 'react-icons/lu'
import { MdDataset } from "react-icons/md"
import { Redirect } from "./redirect"

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
  routes: ServiceRoute[]
  isExternal?: boolean
}

const playground_service: Service = {
  service_id: "real-time",
  title: "Realtime",
  routes: [
    {
      route: "/",
      icon: HiMiniCursorArrowRipple,
      entry: <Playground />,
      title: "Playground",
    }
  ]
}

const json_service: Service = {
  service_id: "json-store",
  title: "JSON Store",
  isExternal: true,
  routes: [
    {
      route: "/",
      icon: MdDataset,
      entry: <Redirect href="https://json.yz13.space" />,
      title: "JSON Store"
    }
  ]
}

const widgets_lib_service: Service = {
  service_id: "widgets",
  title: "Widgets library",
  description: "A simple widgets library",
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
  playground_service,
  json_service
]
export { registered_services }
