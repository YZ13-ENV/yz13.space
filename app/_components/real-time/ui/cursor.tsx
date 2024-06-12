import { SVGProps } from "react"

type CursorProps = {
  cursorColor?: string
  cursorBorder?: string
} & SVGProps<SVGSVGElement>

const Cursor = ({ style, className = "", cursorBorder = "white", cursorColor = "black", ...props }: CursorProps) => {
  return (
    <svg
      style={style}
      className={className}
      width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M4.75418 17L1.62291 1.04089L16 8.91818L10.5 12.5L4.75418 17Z"
        fill={cursorColor} stroke={cursorBorder}
      />
    </svg>
  )
}
export { Cursor }
