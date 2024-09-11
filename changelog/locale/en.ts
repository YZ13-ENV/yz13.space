import dayjs from "dayjs";
import { Changelog } from "../types";

export default [
  {
    version: "1.2.3",
    title: "Minor update",
    description: "New button with link to team page, added on home page",
    published_at: dayjs("2024-09-11").toISOString(),
    lang: ["en"],
  },
  {
    version: "1.2.2",
    title: "New pages, new content",
    description: "Contacts, changelog and settings",
    published_at: dayjs("2024-09-10").toISOString(),
    lang: ["en"],
    list: [
      "Team page with information about team members",
      "Changelog page with history of changes",
      "Settings page, where users can change behavior or appearence"
    ]
  },
] as Readonly<Changelog>[]
