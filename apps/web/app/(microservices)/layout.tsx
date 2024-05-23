import fs from "fs";
import path from "path";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode
}
const layout = ({ children }: Props) => {
  const dir = path.join(process.cwd(), "../../", "microservices")
  const folders = fs.readdirSync(dir)

  return (
    <div className="flex">
      <aside className="w-20 p-3 space-y-2 border-r h-dvh shrink-0 inline-block">
        {
          folders.map(folder =>
            <button key={folder} className="w-full p-3 bg-accents-2 rounded-lg">
              <span className="w-full aspect-square inline-block bg-accents-3"></span>
              <span className="text-xs text-center line-clamp-1">{folder}</span>
            </button>
          )
        }
      </aside>
      {children}
    </div>
  )
}
export default layout