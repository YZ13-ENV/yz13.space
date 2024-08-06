import { Locales, getDict } from "@/dictionaries/tools";
import { get } from "lodash";
import { HTMLAttributes } from "react";

export type Heading = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  heading?: Heading
  lang?: Locales
  dict: string
  field: string
}

const getNestedDictionary = (dictionary: { [key: string]: any }, field: string[], defaultValue?: string) => {
  return get(dictionary, field, defaultValue)
}

const LocalizedHeading = async ({ heading = "h1", dict, field, lang = "en", className, ...props }: HeadingProps) => {
  const Heading = heading
  const localizationDictionary = await getDict<any>(dict, lang)
  const isNested = field.includes(".")
  const value = isNested ? getNestedDictionary(localizationDictionary, field.split(".")) : localizationDictionary[field]
  return <Heading className={className} {...props}>{value}</Heading>
}



export { LocalizedHeading };
