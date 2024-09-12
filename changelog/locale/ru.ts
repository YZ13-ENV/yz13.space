import dayjs from "dayjs";
import { Changelog } from "../types";

export default [
  {
    version: "1.2.3",
    title: "Небольшое обновление",
    description: "Добавленна кнопка с ссылкой на страницу команды на главной странице",
    published_at: dayjs("2024-09-11").toISOString(),
    lang: ["ru"],
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
] as Readonly<Changelog>[]
