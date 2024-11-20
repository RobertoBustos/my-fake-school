import { useMemo } from "react";
import { Link } from "react-router-dom";

export type FormFooterPropsType = {
  text?: string;
  linkText?: string;
  linkDestinationPath?: string;
};

const FormFooter = ({
  text = "",
  linkText = "",
  linkDestinationPath,
}: FormFooterPropsType) => {
  const memoizedAuthFormDisclaimer = useMemo(() => {
    return (
      <div className="w-100 text-center mt-2">
        {text}
        {linkDestinationPath && linkText ? (
          <Link to={linkDestinationPath}>{linkText}</Link>
        ) : null}
      </div>
    );
  }, [linkDestinationPath, linkText, text]);

  return memoizedAuthFormDisclaimer;
};

export default FormFooter;
