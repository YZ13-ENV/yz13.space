import { Logo } from "@/components/logo";
import { metadata as layoutMetadata } from "@/const/metadata";
import { Metadata } from "next";
import Link from "next/link";
import { Product } from "./product";
import { apps } from "./products/apps";
import { platform } from "./products/platform";
import { storage } from "./products/storage";


export const metadata: Metadata = {
  ...layoutMetadata,
  title: "All Products"
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