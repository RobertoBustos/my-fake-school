import { FormFields } from "@customTypes/enums";
import { useMemoizedTranslation } from "@hooks/useTranslation";
import { Form } from "react-bootstrap";
import {
  Control,
  Controller,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import FormLabel from "./FormLabel";

export type FormInputControlPropsType = {
  control: Control<FieldValues> | undefined;
  register: UseFormRegister<FieldValues>;
  fieldName: FormFields;
  type: string;
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
          <FormLabel text={t(`forms.profile.${fieldName}`)} />
          <Form.Control
            {...register(fieldName)}
            type={type}
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
