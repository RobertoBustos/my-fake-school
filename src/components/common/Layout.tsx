import { ReactNode, useMemo } from "react";
import PageTabText from "@components/common/PageTabText";
import "@styles/components/common/Layout.css";
import LayoutHeader from "@components/common/LayoutHeader";
import type { LayoutHeaderPropsType as HeaderProps } from "@components/common/LayoutHeader";
import LayoutFooter from "@components/common/LayoutFooter";
import type { LayoutFooterPropsType as FooterProps } from "@components/common/LayoutFooter";
import { Toaster } from "react-hot-toast";

export type Layout2PropsType = {
  children?: ReactNode;
  footer?: FooterProps;
  header?: HeaderProps;
  pageTabTitle?: string;
  showLanguageSelector?: boolean;
  showBackButton?: boolean;
  displayAlerts?: boolean;
};

const Layout = ({
  children,
  pageTabTitle = "",
  header = undefined,
  footer = undefined,
  displayAlerts = true,
}: Layout2PropsType) => {
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
