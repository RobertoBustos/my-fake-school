import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export type PageTitlePropsType = {
  titleText: string;
};

const PageTitle = ({ titleText }: PageTitlePropsType) => {
  const location = useLocation();

  useEffect(() => {
    document.title = titleText;
  }, [location, titleText]);

  return null;
};

export default PageTitle;
