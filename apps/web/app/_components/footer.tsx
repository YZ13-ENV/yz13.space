import json from "@/package.json"

const Footer = () => {
  const version = json.version
  return (
    <footer>
      <div className="w-full flex items-center justify-between">
        <span className="text-sm">©2024 YZ13</span>
        <span>v{version}</span>
      </div>
    </footer>
  )
}
export { Footer }
