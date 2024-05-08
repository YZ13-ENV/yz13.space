import { ThemeSwitcher } from "@/app/_components/entities/theme"
import { Footer } from "@/components/shared/footer"
import { ThemedLogo } from "@/components/shared/theme-logo"
import { User } from "@/components/shared/user"
import Image from "next/image"
import Link from "next/link"

const page = () => {
  return (
    <div className="w-full space-y-12">
      <header className="max-w-5xl w-full px-6 mx-auto border flex bg-accents-1 items-center justify-between h-16 rounded-b-xl">
        <Link href="/" className="inline-flex items-center gap-1">
          <ThemedLogo width={120} height={36} alt="header-logo" />
        </Link>
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <User size={36} />
        </div>
      </header>
      <div className="max-w-5xl w-full p-6 mx-auto border bg-accents-1 h-fit rounded-xl">
        <section className="w-full">
          <h2 className="text-4xl font-bold">YZ13</h2>
          <p className="text-base text-secondary">YZ13 trademark includes logo & name, can used as only logo, or only name, or logo & name</p>

          <div className="w-full my-6">
            <div className="w-full flex flex-col">
              <div className="w-full h-64 flex items-center justify-center bg-black">
                <Image src="/brand/yz13-full-dark.svg" width={200} height={56} alt="logo-example" />
              </div>
              <div className="w-full h-64 flex items-center justify-center bg-white">
                <Image src="/brand/yz13-full-light.svg" width={200} height={56} alt="logo-example" />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full">
          <h3 className="text-3xl font-bold">Symbol</h3>
          <p className="text-base text-secondary">The YZ13 symbol should only be used in places where there is not enough room to display the full logo, or in cases where only brand symbols of multiple brands are displayed.</p>
          <div className="w-full my-6">
            <div className="w-full flex lg:flex-row flex-col">
              <div className="w-full h-64 flex items-center justify-center bg-white">
                <Image src="/brand/yz13-light.svg" width={56} height={56} alt="logo-example" />
              </div>
              <div className="w-full h-64 flex items-center justify-center bg-black">
                <Image src="/brand/yz13-dark.svg" width={56} height={56} alt="logo-example" />
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="max-w-5xl w-full p-6 mx-auto border h-fit bg-accents-1 rounded-xl">
        <section className="w-full">
          <h2 className="text-4xl font-bold">Misuse</h2>
          <p className="mt-4 mb-3 font-light">Here are some examples of ways that you should not use the YZ13 marks:</p>
          <ul className="space-y-4">
            <li className="list-disc ml-6">
              <span className="font-light">Do not use YZ13 marks in the name of your business, product, service, application, domain name, publication, or other offering.</span>
            </li>
            <li className="list-disc ml-6">
              <span className="font-light">Do not use marks, logos, company names, slogans, domain names, or designs that are confusingly similar to any YZ13 marks.</span>
            </li>
            <li className="list-disc ml-6">
              <span className="font-light">Do not use the YZ13 marks in any manner likely to create confusion as to the sponsorship or relationship, affiliation, or endorsement of your company, product or service by YZ13.</span>
            </li>
            <li className="list-disc ml-6">
              <span className="font-light">Do not use the YZ13 marks in a false or misleading manner.</span>
            </li>
            <li className="list-disc ml-6">
              <span className="font-light">Do not display the YZ13 marks more prominently than your trademarks, product, service, or company name.</span>
            </li>
            <li className="list-disc ml-6">
              <span className="font-light">Do not use YZ13 marks for commercial purposes. e.g. do not include YZ13 marks on merchandise or marketing collateral for your commercial products or services.</span>
            </li>
            <li className="list-disc ml-6">
              <span className="font-light">Do not modify the YZ13 marks.</span>
            </li>
            <li className="list-disc ml-6">
              <span className="font-light">Do not use the YZ13 marks on or in connection with any defamatory, scandalous, pornographic, obscene or other objectionable materials.</span>
            </li>
          </ul>
        </section>
      </div>
      <Footer className="max-w-5xl px-0 mx-auto bg-accents-1 rounded-t-xl border" />
    </div>
  )
}
export default page