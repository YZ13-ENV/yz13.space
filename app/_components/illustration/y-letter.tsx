import { SVGProps } from "./catch-phrase"

const YLetter = ({ className = "", ...props }: SVGProps) => {
  return (
    <svg className={className} width="252" height="252" viewBox="0 0 252 252" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="1" y="1" width="250" height="250" rx="60" stroke="black" strokeWidth="2" strokeDasharray="20 20" />
      <path d="M143.965 154.857V225.5H108.322V154.857C108.322 154.777 108.302 154.697 108.265 154.626L41.371 26.5H81.7421L125.979 118.502C126.063 118.676 126.238 118.786 126.43 118.786C126.623 118.785 126.798 118.675 126.881 118.501L170.832 26.5H210.632L144.022 154.627C143.985 154.698 143.965 154.777 143.965 154.857Z" fill="#DCDCDC" stroke="black" strokeLinejoin="round" />
      <line x1="126.5" y1="26.0003" x2="126.376" y2="226" stroke="black" stroke-dasharray="2 2" />
      <line x1="26" y1="125.5" x2="226" y2="125.5" stroke="black" stroke-dasharray="2 2" />
      <circle cx="143.487" cy="224.396" r="5.1686" fill="#EAEAEA" stroke="black" />
      <circle cx="108.941" cy="224.396" r="5.1686" fill="#EAEAEA" stroke="black" />
      <circle cx="210.759" cy="26.2141" r="5.1686" fill="#EAEAEA" stroke="black" />
      <circle cx="82.5778" cy="26.2141" r="5.1686" fill="#EAEAEA" stroke="black" />
      <circle cx="170.759" cy="26.2141" r="5.1686" fill="#EAEAEA" stroke="black" />
      <circle cx="42.5778" cy="26.2141" r="5.1686" fill="#EAEAEA" stroke="black" />
      <line x1="113.931" y1="113.625" x2="137.973" y2="137.667" stroke="black" strokeDasharray="2 2" />
      <line x1="113.224" y1="137.668" x2="137.266" y2="113.625" stroke="black" strokeDasharray="2 2" />
    </svg>
  )
}
export { YLetter }
