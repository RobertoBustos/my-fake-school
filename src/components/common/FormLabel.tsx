import { Form } from "react-bootstrap";

export type FormLabelPropsType = {
  text: string;
  className?: string;
};

const FormLabel = ({ text, className }: FormLabelPropsType) => {
  return <Form.Label className={className}>{text}</Form.Label>;
};

export default FormLabel;
