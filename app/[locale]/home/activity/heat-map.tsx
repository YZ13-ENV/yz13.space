import CommitsActivity from "@/components/commits-activity"
import { Locales } from "@/locales/server"
import { HeatMapScrollWrapper } from "./map-wrapper"

type Props = {
  years?: number[]
  lang?: Locales
}

const HeatMap = ({ years = [], lang = "en" }: Props) => {
  return (
    <HeatMapScrollWrapper>
      {
        (years.sort()).map(year =>
          <CommitsActivity.Map
            key={year}
            lang={lang}
            year={year}
          />
        )
      }
    </HeatMapScrollWrapper>
  )
}
export { HeatMap }
