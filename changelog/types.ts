import { Locales } from "@/locales/server"

export type Changelog = {
  version: string
  title: string
  description: string
  published_at: string
  lang: Locales[]
  list?: string[]
}
