import { ReactNode, useMemo } from "react";
import LayoutHeader from "@components/common/LayoutHeader";
import "@styles/components/Layout.css";

export type LayoutPropsType = {
  showBackButton: boolean;
  showLoadingIndicator: boolean;
  showLanguageSelector: boolean;
  children: ReactNode;
};

const Layout = ({
  children,
  showBackButton,
  showLoadingIndicator,
  showLanguageSelector,
}: LayoutPropsType) => {
  const memoizedLayoutHeader = useMemo(() => {
    return (
      <LayoutHeader
        showLoadingIndicator={showLoadingIndicator}
        showBackButton={showBackButton}
        showLanguageSelector={showLanguageSelector}
      />
    );
  }, [showLanguageSelector, showLoadingIndicator, showBackButton]);

  return (
    <div className="layout">
      {memoizedLayoutHeader}
      {children}
    </div>
  );
};

export default Layout;
