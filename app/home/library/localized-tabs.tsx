"use server"

import { getDict, getLocale } from "@/dictionaries/tools"
import { tabs } from "./const"


const getLocalizedTabs = async () => {
  const locale = getLocale()
  const tabsDict = await getDict("tabs", locale) as { labels: { label: string, value: string }[] }
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
