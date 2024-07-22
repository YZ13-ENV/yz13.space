import { IconBase, SVGProps } from "./icon-base"

const NextIcon = ({ className, size = 24, ...props }: SVGProps) => {
  return (
    <IconBase size={size} className={className} {...props}>
      <g clip-path="url(#clip0_902_49)">
        <path d="M0.5 1C0.776 1 1 0.776 1 0.5C1 0.224 0.776 0 0.5 0C0.224 0 0 0.224 0 0.5C0 0.776 0.224 1 0.5 1Z" fill="black" />
        <path d="M0.831049 0.875049L0.384049 0.300049H0.300049V0.700049H0.367049V0.385049L0.777049 0.915049C0.796049 0.903049 0.814049 0.890049 0.831049 0.875049Z" fill="url(#paint0_linear_902_49)" />
        <path d="M0.706038 0.300049H0.639038V0.700049H0.706038V0.300049Z" fill="url(#paint1_linear_902_49)" />
      </g>
      <defs>
        <linearGradient id="paint0_linear_902_49" x1="0.517992" y1="0.717955" x2="0.715215" y2="0.962399" gradientUnits="userSpaceOnUse">
          <stop stop-color="white" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <linearGradient id="paint1_linear_902_49" x1="0.673023" y1="0.299921" x2="0.671907" y2="0.593673" gradientUnits="userSpaceOnUse">
          <stop stop-color="white" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <clipPath id="clip0_902_49">
          <rect width="1" height="1" fill="white" />
        </clipPath>
      </defs>
    </IconBase>
  )
}
export { NextIcon }
