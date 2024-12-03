import { FormFields } from "@customTypes/index";
import { useMemoizedTranslation } from "@hooks/index";
import "@styles/components/common/FormPasswordInput.css";
import { useMemo, useState } from "react";
import { FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export type FormPasswordInputPropsType = {
  register: UseFormRegister<FieldValues>;
  fieldName: FormFields;
  errorMessage?: string;
  validations?: RegisterOptions<FieldValues>;
  onValueChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const FormPasswordInput = ({
  register,
  fieldName,
  errorMessage,
  validations,
  onValueChange,
}: FormPasswordInputPropsType) => {
  const { t } = useMemoizedTranslation();
  const [isValueVisible, setIsValueVisible] = useState<boolean>(false);

  const memoizedFormInput = useMemo(() => {
    const { onChange } = register(fieldName, validations);

    const Icon = isValueVisible ? AiOutlineEyeInvisible : AiOutlineEye;

    return (
      <div>
        <label htmlFor={fieldName}>{t(`forms.user.${fieldName}`)}</label>
        <div className="inputcontainer">
          <input
            type={isValueVisible ? "text" : "password"}
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
          <Icon
            className="icon"
            onClick={() => setIsValueVisible(!isValueVisible)}
          />
        </div>
        <p className="errortext">{errorMessage}</p>
      </div>
    );
  }, [
    register,
    fieldName,
    validations,
    t,
    isValueVisible,
    errorMessage,
    onValueChange,
  ]);

  return memoizedFormInput;
};

export default FormPasswordInput;
