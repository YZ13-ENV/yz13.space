import dayjs from "dayjs";
import { Changelog } from "./types";


export const logs: Changelog[] = [
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
  {
    version: "1.2.2",
    title: "Новые страницы, новый контент",
    description: "Команда, история изменений и настройки",
    published_at: dayjs("2024-09-10").toISOString(),
    lang: ["ru"],
    list: [
      "Страница команды с информацией о каждом участнике",
      "История изменения",
      "Настройки, где пользователи могут изменить поведение и вид приложения"
    ]
  }
]
