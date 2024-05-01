import { ReactNode } from "react";
import { LuBadgeInfo } from "react-icons/lu";
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
  {
    label: "Contact",
    value: "/contact",
    icon: <MdPhone />
  },
  {
    label: "About",
    value: "/about",
    icon: <LuBadgeInfo />
  },
];
