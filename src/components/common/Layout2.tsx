import { ReactNode } from "react";
import PageTitle from "@components/common/PageTitle";
import LayoutHeader2 from "@components/common/LayoutHeader2";
import LayoutFooter2 from "@components/common/LayoutFooter2";
import type { LayoutHeader2PropsType as HeaderProps } from "@components/common/LayoutHeader2";
import type { LayoutFooter2PropsType as FooterProps } from "@components/common/LayoutFooter2";

export type Layout2PropsType = {
  children?: ReactNode;
  footer?: FooterProps;
  header?: HeaderProps;
  pageTabTitle?: string;
  showLanguageSelector?: boolean;
  showBackButton?: boolean;
};

const Layout2 = ({
  children,
  pageTabTitle = "",
  header = undefined,
  footer = undefined,
}: Layout2PropsType) => {
  let bodyHeight = 100;

  if (footer) {
    bodyHeight -= 8;
  }

  if (header) {
    bodyHeight -= 10;
  }

  return (
    <div className="w-100 vh-100">
      <PageTitle titleText={pageTabTitle} />
      {header ? (
        <LayoutHeader2
          showLanguageSelector={header.showLanguageSelector}
          showBackButton={header.showBackButton}
        />
      ) : null}
      <div
        className="d-flex flex-column align-items-center justify-content-center w-100"
        style={{
          minHeight: `${bodyHeight}vh`,
        }}
      >
        {children}
      </div>
      {footer ? (
        <LayoutFooter2
          buttonLabel={footer.buttonLabel}
          handleClick={footer.handleClick}
        />
      ) : null}
    </div>
  );
};

export default Layout2;
