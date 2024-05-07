import { RepoLanguage } from "@/types/repo"

type Props = {
  keys: string[]
  stack: RepoLanguage
  sum: number
}
const LanguagesVisualization = ({ keys, stack, sum }: Props) => {
  return (
    <div className="flex items-center bg-background w-full h-10 gap-1 p-1 border-accents-2 border rounded-lg">
      {
        keys.map(
          key => {
            const stack_value: number = stack[key] || 0
            const percent = ((stack_value / sum) * 100).toFixed(1)
            return (
              <div
                key={"bar-" + key} style={{ width: `${percent}%` }}
                className="w-full h-full min-w-6 rounded-md bg-accents-1 border border-accents-2 flex items-center justify-center cursor-pointer transition-colors"
              >
                <span className="text-xs text-accents-7">{percent}</span>
              </div>
            )
          }
        )
      }
    </div>
  )
}
export { LanguagesVisualization }
