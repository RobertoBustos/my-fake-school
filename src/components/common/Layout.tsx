import { ReactNode } from "react";
import LayoutHeader from "@components/common/LayoutHeader";
import "@styles/components/Layout.css";

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
