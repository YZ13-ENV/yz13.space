import { SectionBackgroundBlur, SectionOverlay } from "../../section-switcher/ui/section-template"
import { fromBlob } from "../api/from-blob"
import { fromStorage } from "../api/from-db-storage"
import { BackgroundPlayer } from "./background-player"

const Background = async () => {
  const initial = await fromBlob()
  const fallback = await fromStorage()
  return (
    <>
      <BackgroundPlayer initial={initial} fallback={fallback} />
      <SectionBackgroundBlur />
      <SectionOverlay />
    </>
  )
}
export { Background }
