const statusLabels = [
  {
    status: "in-dev",
    label: "in dev",
  },
  {
    status: "in-plans",
    label: "in plans",
  },
  {
    status: "in-beta",
    label: "in beta",
  },
  {
    status: "public",
    label: "public",
  },
];
// export type ProductStatus = "in-dev" | "in-plans" | "in-beta" | "public";
export const getStatus = (status: string) =>
  statusLabels.find((item) => item.status === status);
