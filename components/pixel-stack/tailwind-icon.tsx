import { IconBase, SVGProps } from "./icon-base"

const TailwindIcon = ({ className, size = 24, ...props }: SVGProps) => {
  return (
    <IconBase size={size} className={className} {...props}>
      <g clip-path="url(#clip0_902_53)">
        <path d="M0.5 0.199951C0.367 0.199951 0.283 0.266951 0.25 0.399951C0.3 0.332951 0.358 0.307951 0.425 0.324951C0.463 0.334951 0.49 0.361951 0.52 0.392951C0.569 0.442951 0.626 0.499951 0.75 0.499951C0.883 0.499951 0.967 0.432951 1 0.299951C0.95 0.366951 0.892 0.391951 0.825 0.374951C0.787 0.364951 0.76 0.337951 0.73 0.306951C0.681 0.257951 0.624 0.199951 0.5 0.199951ZM0.25 0.499951C0.117 0.499951 0.033 0.566951 0 0.699951C0.05 0.632951 0.108 0.607951 0.175 0.624951C0.213 0.634951 0.24 0.661951 0.27 0.692951C0.319 0.742951 0.376 0.799951 0.5 0.799951C0.633 0.799951 0.717 0.732951 0.75 0.599951C0.7 0.666951 0.642 0.691951 0.575 0.674951C0.537 0.665951 0.51 0.637951 0.48 0.606951C0.431 0.557951 0.374 0.499951 0.25 0.499951Z" fill="#848484" />
      </g>
      <defs>
        <clipPath id="clip0_902_53">
          <rect width="1" height="1" fill="white" />
        </clipPath>
      </defs>
    </IconBase>
  )
}
export { TailwindIcon }
