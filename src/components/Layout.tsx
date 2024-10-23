import { ReactNode } from "react";
import "../css/Layout.css";
import LayoutHeader from "./common/LayoutHeader";

export type LayoutPropsType = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutPropsType) => {
  return (
    <div className="layout">
      <LayoutHeader showLoadingIndicator showBackButton showLanguageSelector />
      {children}
    </div>
  );
};

export default Layout;
