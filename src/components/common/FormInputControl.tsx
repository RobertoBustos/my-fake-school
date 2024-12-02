import FormLabel from "@components/common/FormLabel";
import { CustomInputType, FormFields } from "@customTypes/index";
import { useMemoizedTranslation } from "@hooks/index";
import { Form } from "react-bootstrap";
import {
  Control,
  Controller,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

export type FormInputControlPropsType = {
  control: Control<FieldValues> | undefined;
  register: UseFormRegister<FieldValues>;
  fieldName: FormFields;
  type: CustomInputType;
  handleChange: (fieldName: FormFields, value: string) => void;
};

const FormInputControl = ({
  control,
  register,
  fieldName,
  type,
  handleChange,
}: FormInputControlPropsType) => {
  const { t } = useMemoizedTranslation();
  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field }) => (
        <Form.Group id={fieldName}>
          <FormLabel text={t(`forms.user.${fieldName}`)} />
          <Form.Control
            type={type}
            {...register(fieldName)}
            onChange={(e) => {
              field.onChange(e);
              handleChange(fieldName, e.target.value);
            }}
          />
        </Form.Group>
      )}
    />
  );
};

export default FormInputControl;
