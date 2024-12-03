import { CustomInputType, FormFields } from "@customTypes/index";
import { useMemoizedTranslation } from "@hooks/index";
import { useMemo } from "react";
import { FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";

export type FormInputPropsType = {
  type: CustomInputType;
  register: UseFormRegister<FieldValues>;
  fieldName: FormFields;
  errorMessage?: string;
  validations?: RegisterOptions<FieldValues>;
  onValueChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hidden?: boolean;
};

const FormInput = ({
  type,
  register,
  fieldName,
  errorMessage,
  validations,
  onValueChange,
  hidden = false,
}: FormInputPropsType) => {
  const { t } = useMemoizedTranslation();
  const memoizedFormInput = useMemo(() => {
    const { onChange } = register(fieldName, validations);

    return (
      <div className={hidden ? "d-none" : ""}>
        <label htmlFor={fieldName}>{t(`forms.user.${fieldName}`)}</label>
        <input
          type={type}
          id={fieldName}
          autoComplete="off"
          {...register(fieldName, validations)}
          onChange={(e) => {
            onChange(e);
            if (onValueChange) {
              onValueChange(e);
            }
          }}
        />
        <p className="errortext">{errorMessage}</p>
      </div>
    );
  }, [
    register,
    fieldName,
    validations,
    hidden,
    t,
    type,
    errorMessage,
    onValueChange,
  ]);

  return memoizedFormInput;
};

export default FormInput;
