import { BrowserMini, List } from "@microservices/widgets-lib"
import { ReactNode } from "react"
import { BiListUl } from "react-icons/bi"
import { IconType } from "react-icons/lib"
import { LuKeyRound } from 'react-icons/lu'


type ServiceRoute = {
  route: string // /router/**/*
  title: string
  icon?: IconType
  entry: ReactNode
}

type Service = {
  service_id: string
  title: string
  description?: string
  entry: ReactNode
  routes: ServiceRoute[]
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
    }
  ]
}

const registered_services: Service[] = [
  widgets_lib_service
]
export { registered_services }
