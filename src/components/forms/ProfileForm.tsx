import { Controller, useForm } from "react-hook-form";
import { useMemoizedTranslation } from "@hooks/useTranslation";
import { FormFields, ProfileFormFieldsType } from "@customTypes/index";
import { Form } from "react-bootstrap";
import { useAppDispatch } from "@redux/hooks";
import { beginUserEdition } from "@actions/index";
import VerifyEmail from "@components/VerifyEmail";
import FormContainer from "@components/common/FormContainer";
import { parseFullName } from "@utils/index";

export type ProfileFormPropsType = {
  defaultValues: ProfileFormFieldsType;
};

const ProfileForm = ({ defaultValues }: ProfileFormPropsType) => {
  const { t } = useMemoizedTranslation();
  const dispatch = useAppDispatch();
  const { control, register, getValues } = useForm<ProfileFormFieldsType>({
    defaultValues: async () => defaultValues,
  });

  const handleChange = (fieldName: FormFields, value: string) => {
    if (
      fieldName === FormFields.FIRST_NAME ||
      fieldName === FormFields.LAST_NAME
    ) {
      const displayName = parseFullName(
        getValues(FormFields.FIRST_NAME),
        getValues(FormFields.LAST_NAME)
      );
      dispatch(
        beginUserEdition({
          field: FormFields.DISPLAY_NAME,
          value: displayName,
        })
      );
      return;
    }
    dispatch(
      beginUserEdition({
        field: fieldName,
        value: value,
      })
    );
  };

  const renderInput = (fieldName: FormFields, type: string) => {
    return (
      <Controller
        name={fieldName}
        control={control}
        render={({ field }) => (
          <Form.Group id={fieldName}>
            <Form.Label>{t(`forms.profile.${fieldName}`)}</Form.Label>
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

  return (
    <FormContainer
      formTitle={t("formTitles.userProfile")}
      displayAlerts={false}
    >
      {renderInput(FormFields.FIRST_NAME, "text")}
      {renderInput(FormFields.LAST_NAME, "text")}
      {renderInput(FormFields.PASSWORD, "password")}
      {renderInput(FormFields.PHONE_NUMBER, "number")}
      <VerifyEmail />
    </FormContainer>
  );
};

export default ProfileForm;
