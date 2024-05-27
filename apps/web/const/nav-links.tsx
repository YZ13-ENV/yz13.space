import { BiHomeAlt2 } from "react-icons/bi";
import { IconType } from "react-icons/lib";
import { MdPhone } from "react-icons/md";
import { TbBrandAppgallery } from "react-icons/tb";

type NavLink = {
  label: string;
  value: string;
  icon?: IconType;
};
export const links: NavLink[] = [
  {
    label: "Home",
    value: "/",
    icon: BiHomeAlt2
  },
  {
    label: "Projects",
    value: "/projects",
    icon: TbBrandAppgallery
  },
  {
    label: "Contact",
    value: "/contact",
    icon: MdPhone
  },
];
