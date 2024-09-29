import "@xyflow/react/dist/base.css";

type LayoutProps = Readonly<{
  children?: React.ReactNode;
}>;
const layout = ({ children }: LayoutProps) => {
  return children
}
export default layout
