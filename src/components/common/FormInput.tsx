import { FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";
import { CustomInputType, FormFields } from "@customTypes/index";
import { useMemoizedTranslation } from "@hooks/useTranslation";
import { useMemo } from "react";

export type FormInputPropsType = {
  type: CustomInputType;
  register: UseFormRegister<FieldValues>;
  fieldName: FormFields;
  errorMessage?: string;
  validations?: RegisterOptions<FieldValues>;
  onChange?: () => void;
  hidden?: boolean;
};

const FormInput = ({
  type,
  register,
  fieldName,
  errorMessage,
  validations,
  onChange,
  hidden = false,
}: FormInputPropsType) => {
  const { t } = useMemoizedTranslation();
  const memoizedFormInput = useMemo(() => {
    return (
      <div className={hidden ? "d-none" : ""}>
        <label htmlFor={fieldName}>{t(`forms.user.${fieldName}`)}</label>
        <input
          type={type}
          id={fieldName}
          autoComplete="off"
          {...register(fieldName, validations)}
        />
        <p className="errortext">{errorMessage}</p>
      </div>
    );
  }, [errorMessage, fieldName, register, t, type, validations, hidden]);

  return memoizedFormInput;
};

export default FormInput;
