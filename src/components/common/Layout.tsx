import type { LayoutFooterPropsType as FooterProps } from "@components/common/LayoutFooter";
import LayoutFooter from "@components/common/LayoutFooter";
import type { LayoutHeaderPropsType as HeaderProps } from "@components/common/LayoutHeader";
import LayoutHeader from "@components/common/LayoutHeader";
import PageTabText from "@components/common/PageTabText";
import "@styles/components/common/Layout.css";
import { ReactNode, useMemo } from "react";
import { Toaster } from "react-hot-toast";

export type LayoutPropsType = {
  children?: ReactNode;
  footer?: FooterProps;
  header?: HeaderProps;
  pageTabTitle?: string;
  showLanguageSelector?: boolean;
  showBackButton?: boolean;
};

const Layout = ({
  children,
  pageTabTitle = "",
  header = undefined,
  footer = undefined,
}: LayoutPropsType) => {
  const memoizedPageTabText = useMemo(() => {
    return <PageTabText titleText={pageTabTitle} />;
  }, [pageTabTitle]);

  return (
    <div className="layout">
      <Toaster position="bottom-right" reverseOrder={false} />
      {memoizedPageTabText}
      {header ? (
        <LayoutHeader
          showLanguageSelector={header.showLanguageSelector}
          showBackButton={header.showBackButton}
          className="header"
        />
      ) : null}
      <div className="content">{children}</div>
      {footer ? (
        <LayoutFooter className="footer" button={footer.button} />
      ) : null}
    </div>
  );
};

export default Layout;
