"use server"

import { Locales, getDict, getLocale } from "@/dictionaries/tools"
import { tabs } from "./const"


const getLocalizedTabs = async (provided_lang?: Locales) => {
  const locale = getLocale()
  const lang = provided_lang ? provided_lang : locale
  const tabsDict = await getDict("tabs", lang) as { labels: { label: string, value: string }[] }
  const localTabs = tabs.map(tab => {
    const target = tabsDict.labels.find(item => item.value === tab.value)
    if (target) {
      return {
        ...tab,
        label: target.label
      }
    } else return tab
  })
  return localTabs
}
export { getLocalizedTabs }
