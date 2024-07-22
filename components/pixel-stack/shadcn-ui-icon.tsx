import { IconBase, SVGProps } from "./icon-base"

const ShadcnIcon = ({ className, size = 24, ...props }: SVGProps) => {
  return (
    <IconBase size={size} className={className} {...props}>
      <g clip-path="url(#clip0_902_5)">
        <mask id="mask0_902_5" maskUnits="userSpaceOnUse" x="0" y="0" width="1" height="1">
          <path d="M1 0H0V1H1V0Z" fill="white" />
        </mask>
        <g mask="url(#mask0_902_5)">
          <path d="M0.812 0.5L0.5 0.812" stroke="black" stroke-width="0.1" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M0.750006 0.156006L0.156006 0.750006" stroke="black" stroke-width="0.1" stroke-linecap="round" stroke-linejoin="round" />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_902_5">
          <rect width="1" height="1" fill="white" />
        </clipPath>
      </defs>
    </IconBase>
  )
}
export { ShadcnIcon }
