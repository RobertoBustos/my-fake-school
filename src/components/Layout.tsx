import { ReactNode } from "react";
import "../css/Layout.css";

export type LayoutPropsType = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutPropsType) => {
  return <div className="layout">{children}</div>;
};

export default Layout;
