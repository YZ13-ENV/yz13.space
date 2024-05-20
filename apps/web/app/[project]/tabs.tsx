import { MdBarChart, MdGridView, MdOutlineViewKanban } from "react-icons/md"

export const tabs = [
  {
    icon: MdGridView,
    label: "Overview",
    value: ""
  },
  {
    icon: MdBarChart,
    label: "Speed insights",
    value: "/speed-insights"
  },
  {
    icon: MdOutlineViewKanban,
    label: "Kanban",
    value: "/kanban"
  }
]