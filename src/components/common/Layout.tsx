import { ReactNode, useMemo } from "react";
import LayoutHeader from "@components/common/LayoutHeader";
import "@styles/components/Layout.css";
import PageTitle from "@components/common/PageTitle";

export type LayoutPropsType = {
  pageTitle: string;
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
  pageTitle,
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
      <PageTitle titleText={pageTitle} />
      {memoizedLayoutHeader}
      {children}
    </div>
  );
};

export default Layout;
