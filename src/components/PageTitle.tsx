export type PageTitlePropsType = {
  titleText: string;
};

const PageTitle = ({ titleText }: PageTitlePropsType) => {
  return <h1>{titleText}</h1>;
};

export default PageTitle;
