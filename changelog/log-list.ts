import dayjs from "dayjs";
import { Changelog } from "./types";


export const logs: Changelog[] = [
  {
    version: "1.2.2",
    title: "New pages, new content",
    description: "Contacts, changelog and settings",
    published_at: dayjs("2024-09-10").toISOString(),
    list: [
      "Contacts page with links to my socials",
      "Changelog page with history of changes",
      "Settings page, where users can change behavior or appearence"
    ]
  }
]
