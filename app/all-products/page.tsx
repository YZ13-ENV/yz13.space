import { Logo } from "@/components/logo";
import { Locales, getLocale } from "@/dictionaries/tools";
import { dynamicMetadata } from "@/metadata";
import { Metadata } from "next";
import Link from "next/link";
import { Product } from "./product";
import { apps } from "./products/apps";
import { platform } from "./products/platform";
import { storage } from "./products/storage";


export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const searchParamLang = searchParams.lang
  const locale = getLocale()
  const lang = (searchParamLang ? searchParamLang : locale) as Locales
  const metadata = dynamicMetadata(lang)
  return metadata
}

type Props = {
  searchParams: {
    lang?: string
  }
}

const page = () => {
  return (
    <>
      <Link href="/home">
        <Logo
          width={36} height={36}
          className="lg:absolute shrink-0 relative top-0 mt-6 ml-6 left-0"
        />
      </Link>
      <div className="max-w-3xl w-full mx-auto p-6">
        <h1 className="text-3xl font-bold">Explore YZ13 products</h1>
      </div>
      <div className="max-w-3xl w-full mx-auto p-6 h-fit">
        <Product section={platform} />
        <Product section={apps} />
        <Product section={storage} />
      </div>
    </>
  )
}
export default page