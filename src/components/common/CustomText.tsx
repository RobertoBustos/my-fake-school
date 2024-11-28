export type CustomTextPropsType = {
  text: string;
  className?: string;
};

const CustomText = ({ text, className }: CustomTextPropsType) => {
  return <p className={className}>{text}</p>;
};

export default CustomText;
