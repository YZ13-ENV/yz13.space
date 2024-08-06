import { Locales, getDict } from "@/dictionaries/tools"
import { HTMLAttributes } from "react"


export type TextType = "p" | "span"

export interface HeadingProps extends HTMLAttributes<HTMLParagraphElement> {
  type?: TextType
  lang?: Locales
  dict: string
  field: string
}

const LocalizedText = async ({ type = "span", dict, field, lang = "en", className, ...props }: HeadingProps) => {
  const Text = type
  const localizationDictionary = await getDict<any>(dict, lang)
  const value = localizationDictionary[field]
  return <Text className={className} {...props}>{value}</Text>
}



export { LocalizedText }
