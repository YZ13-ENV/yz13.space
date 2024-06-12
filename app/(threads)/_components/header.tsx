import Image from "next/image"

const Header = () => {
  return (
    <header className="w-full">
      <Image src="/brand/yz13-dark.svg" width={36} height={36} alt="brand-logo" />
    </header>
  )
}
export { Header }
