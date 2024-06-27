import { LibraryContent } from "./content"
import { getLocalizedTabs } from "./localized-tabs"
import { LibraryWrapper } from "./wrapper"


const Library = async () => {
  const tabs = await getLocalizedTabs()
  const serverTabs = tabs.map(tab => ({ ...tab, icon: tab.icon({ size: 20, className: "md:w-[18px] w-[14px] shrink-0 z-[1]" }) }))
  return (
    <LibraryWrapper providedTabs={serverTabs}>
      <LibraryContent />
    </LibraryWrapper>
  )
}
export { Library }
