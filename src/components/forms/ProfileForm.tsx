import ProfilePicture from "@components/ProfilePicture";
import VerifyEmail from "@components/VerifyEmail";
import CustomText from "@components/common/CustomText";
import FormContainer from "@components/common/FormContainer";
import FormInput from "@components/common/FormInput";
import FormPasswordInput from "@components/common/FormPasswordInput";
import {
  confirmNewPasswordValidations,
  nameValidations,
  newPasswordValidations,
  phoneNumberValidations,
  profilePictureValidtion,
} from "@components/forms/formValidations";
import { FormFields } from "@customTypes/index";
import { useMemoizedTranslation, useProfile } from "@hooks/index";

const ProfileForm = () => {
  const { t } = useMemoizedTranslation();
  const {
    handleFileChange,
    handleFieldChange,
    displayConfirmPasswordInput,
    register,
    errors,
    userInfo,
    photoURL,
  } = useProfile({
    isReduxMode: true,
  });

  return (
    <FormContainer formTitle={t("formTitles.userProfile")}>
      <ProfilePicture
        imageUrl={photoURL}
        onFileChange={handleFileChange}
        validation={profilePictureValidtion}
      />
      <CustomText
        text={userInfo.email || ""}
        className="w-100 text-center text-bold"
      />
      <form noValidate>
        <FormInput
          type="text"
          register={register}
          fieldName={FormFields.FIRST_NAME}
          onValueChange={(e) => {
            handleFieldChange(FormFields.FIRST_NAME, e.target.value);
          }}
          errorMessage={errors.firstName?.message}
          validations={nameValidations}
        />
        <FormInput
          type="text"
          register={register}
          fieldName={FormFields.LAST_NAME}
          onValueChange={(e) => {
            handleFieldChange(FormFields.LAST_NAME, e.target.value);
          }}
          errorMessage={errors.lastName?.message}
        />
        <FormPasswordInput
          register={register}
          fieldName={FormFields.NEW_PASSWORD}
          onValueChange={(e) => {
            handleFieldChange(FormFields.NEW_PASSWORD, e.target.value);
          }}
          errorMessage={errors.newPassword?.message}
          validations={newPasswordValidations}
        />
        {displayConfirmPasswordInput ? (
          <FormPasswordInput
            register={register}
            fieldName={FormFields.CONFIRM_NEW_PASSWORD}
            onValueChange={(e) => {
              handleFieldChange(
                FormFields.CONFIRM_NEW_PASSWORD,
                e.target.value
              );
            }}
            errorMessage={errors.confirmNewPassword?.message}
            validations={confirmNewPasswordValidations}
          />
        ) : null}
        <FormInput
          type="number"
          register={register}
          fieldName={FormFields.PHONE_NUMBER}
          onValueChange={(e) => {
            handleFieldChange(FormFields.PHONE_NUMBER, e.target.value);
          }}
          errorMessage={errors.phoneNumber?.message}
          validations={phoneNumberValidations}
        />
      </form>
      <VerifyEmail />
    </FormContainer>
  );
};

export default ProfileForm;
