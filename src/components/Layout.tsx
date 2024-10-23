import { ReactNode } from "react";
import "../css/Layout.css";
import MemoizedAlert from "./MemoizedAlert";
import MemoizedLoader from "./MemoizedLoader";

export type LayoutPropsType = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutPropsType) => {
  return (
    <div className="layout">
      <MemoizedAlert />
      <MemoizedLoader />
      {children}
    </div>
  );
};

export default Layout;
