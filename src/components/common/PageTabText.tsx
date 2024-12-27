import { useEffect } from "react";

export type PageTabTextPropsType = {
  titleText: string;
};

const PageTabText = ({ titleText }: PageTabTextPropsType) => {
  useEffect(() => {
    document.title = titleText;
  }, [titleText]);

  return null;
};

export default PageTabText;
