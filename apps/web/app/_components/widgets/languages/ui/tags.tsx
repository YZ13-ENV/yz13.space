import { RepoLanguage } from "@/types/repo"

type Props = {
  keys: string[]
  stack: RepoLanguage
  sum: number
}
const LanguagesTags = ({ keys, stack, sum }: Props) => {
  return (
    <div className="flex flex-wrap items-start w-full gap-1">
      {
        keys.map(key => {
          const stack_value: number = stack[key] || 0
          const percent = ((stack_value / sum) * 100).toFixed(1)
          return <div key={key} className="flex items-center gap-1 px-2 rounded-md bg-accents-2 py-1">
            <span className="text-xs font-medium text-accent-foreground">{key}</span>
            <span className="text-xs text-secondary">{percent}%</span>
          </div>
        })
      }
    </div>
  )
}
export { LanguagesTags }
