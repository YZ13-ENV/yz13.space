import dayjs from "dayjs";

type Plan = {
  id: string;
  name: string;
  created_at: string;
  checked: boolean;
};
const plans: Plan[] = [
  {
    id: "redesign",
    checked: true,
    name: "Redesign",
    created_at: dayjs().toISOString(),
  },
  {
    id: "terminal",
    checked: false,
    name: "Create on work page a terminal",
    created_at: dayjs().toISOString(),
  },
];
export { plans, type Plan };
