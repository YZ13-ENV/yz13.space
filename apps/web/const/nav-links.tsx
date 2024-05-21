import { BiHomeAlt2 } from "react-icons/bi";
import { IconType } from "react-icons/lib";
import { MdGridView, MdPhone } from "react-icons/md";

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
    icon: MdGridView
  },
  {
    label: "Contact",
    value: "/contact",
    icon: MdPhone
  },
];
