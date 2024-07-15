import json from "@/package.json"

type Props = {
  className?: string
}
const Footer = ({ className = "" }: Props) => {
  const version = json.version
  return (
    <footer className={className}>
      <div className="w-full flex items-center justify-between">
        <span className="text-sm">©2024 YZ13</span>
        <span className="text-sm">v{version}</span>
      </div>
    </footer>
  )
}
export { Footer }
