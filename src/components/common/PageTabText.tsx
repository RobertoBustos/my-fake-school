import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export type PageTabTextPropsType = {
  titleText: string;
};

const PageTabText = ({ titleText }: PageTabTextPropsType) => {
  const location = useLocation();

  useEffect(() => {
    document.title = titleText;
  }, [location, titleText]);

  return null;
};

export default PageTabText;
