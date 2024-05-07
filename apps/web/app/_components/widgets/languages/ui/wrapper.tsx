import { getRepoLanguages } from "@/api/repo"
import { keys } from "lodash"
import { LanguagesTags } from "./tags"
import { LanguagesVisualization } from "./visualization"


type Props = {
  owner: string
  repo: string
}
const LanguagesWrapper = async ({ owner, repo }: Props) => {
  const stack: any = await getRepoLanguages(owner, repo)
  const stack_keys = keys(stack)
  const stack_values = stack_keys.map(item => stack[item])
  const stack_sum: number = stack_values.length !== 0 ? stack_values.reduce((a, b) => a + b) : 0
  return (
    <>
      <LanguagesVisualization keys={stack_keys} stack={stack} sum={stack_sum} />
      <LanguagesTags keys={stack_keys} stack={stack} sum={stack_sum} />
    </>
  )
}
export { LanguagesWrapper }
