import { ReactElement, useMemo } from "react";

export type LayoutFooterPropsType = {
  className?: string;
  button?: ReactElement;
};

const LayoutFooter = ({ className, button }: LayoutFooterPropsType) => {
  const memoizedButton = useMemo(() => {
    if (button) {
      return button;
    }
  }, [button]);

  const memoizedFooter = useMemo(() => {
    return (
      <div className={className} data-testid="layout-footer">
        {memoizedButton}
      </div>
    );
  }, [memoizedButton, className]);

  return memoizedFooter;
};

export default LayoutFooter;
