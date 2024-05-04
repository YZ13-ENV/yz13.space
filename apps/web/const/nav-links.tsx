import { ReactNode } from "react";
import { MdGridView, MdPhone } from "react-icons/md";

type NavLink = {
  label: string;
  value: string;
  icon?: ReactNode;
};
export const links: NavLink[] = [
  {
    label: "Projects",
    value: "/projects",
    icon: <MdGridView />
  },
  // {
  //   label: "Feature Flags",
  //   value: "/feature-flags",
  //   icon: <BiFlag />
  // },
  {
    label: "Contact",
    value: "/contact",
    icon: <MdPhone />
  },
  // {
  //   label: "About",
  //   value: "/about",
  //   icon: <LuBadgeInfo />
  // },
];
