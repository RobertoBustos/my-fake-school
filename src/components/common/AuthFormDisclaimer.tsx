import { useMemo } from "react";
import { Link } from "react-router-dom";

export type AuthFormDisclaimerPropsType = {
  text?: string;
  linkText?: string;
  linkDestinationPath?: string;
};

const AuthFormDisclaimer = ({
  text = "",
  linkText = "",
  linkDestinationPath,
}: AuthFormDisclaimerPropsType) => {
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

export default AuthFormDisclaimer;
