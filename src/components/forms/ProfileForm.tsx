import { Controller, FormState, useForm } from "react-hook-form";
import { useMemoizedTranslation } from "@hooks/useTranslation";
import { FormFields, ProfileFormFieldsType } from "@customTypes/index";
import { Form } from "react-bootstrap";
import { useAppDispatch } from "@redux/hooks";
import { beginUserEdition, sendVerificationEmail } from "@actions/index";
import VerifyEmail from "@components/VerifyEmail";
import FormContainer from "@components/common/FormContainer";

export type ProfileFormPropsType = {
  defaultValues: ProfileFormFieldsType;
  onEdit?: (formState: FormState<ProfileFormFieldsType>) => void;
};

const ProfileForm = ({ defaultValues }: ProfileFormPropsType) => {
  const { t } = useMemoizedTranslation();
  const dispatch = useAppDispatch();
  const { control, register } = useForm<ProfileFormFieldsType>({
    defaultValues: async () => defaultValues,
  });

  const renderInput = (fieldName: FormFields, type: string) => {
    const handleChange = (e: { target: { value: any } }) => {
      dispatch(
        beginUserEdition({
          field: fieldName,
          value: e.target.value,
        })
      );
    };

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
              onChange={handleChange}
            />
          </Form.Group>
        )}
      />
    );
  };

  const handleVerifyEmail = () => {
    dispatch(sendVerificationEmail());
  };

  return (
    <FormContainer
      formTitle={t("formTitles.userProfile")}
      displayAlerts={false}
    >
      {renderInput(FormFields.FIRST_NAME, "text")}
      {renderInput(FormFields.LAST_NAME, "text")}
      {renderInput(FormFields.PASSWORD, "password")}
      {renderInput(FormFields.PHONE_NUMBER, "phoneNumber")}
      <VerifyEmail onclickVerifyEmail={handleVerifyEmail} />
    </FormContainer>
  );
};

export default ProfileForm;
