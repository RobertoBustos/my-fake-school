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
import { useMemoizedTranslation } from "@hooks/index";
import { useProfile } from "@hooks/useProfile";
import { Dispatch, SetStateAction, forwardRef, useEffect } from "react";

export type ProfileFormPropsType = {
  onIsValidChange?: Dispatch<SetStateAction<boolean>>;
  onIsLoadingChange?: Dispatch<SetStateAction<boolean>>;
};

const ProfileForm = forwardRef<HTMLFormElement, ProfileFormPropsType>(
  ({ onIsValidChange, onIsLoadingChange }) => {
    const { t } = useMemoizedTranslation();
    const {
      handleFileChange,
      onSubmit,
      displayConfirmPasswordInput,
      register,
      errors,
      isValid,
      isDirty,
      isSubmitting,
      handleSubmit,
      userInfo,
      photoURL,
    } = useProfile({
      isReduxMode: false,
    });

    useEffect(() => {
      if (onIsValidChange) {
        onIsValidChange(isValid && isDirty);
      }
    }, [isValid, isDirty, onIsValidChange]);

    useEffect(() => {
      if (onIsLoadingChange) {
        onIsLoadingChange(isSubmitting);
      }
    }, [isSubmitting, onIsLoadingChange]);

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
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormInput
            type="text"
            register={register}
            fieldName={FormFields.FIRST_NAME}
            errorMessage={errors.firstName?.message}
            validations={nameValidations}
          />
          <FormInput
            type="text"
            register={register}
            fieldName={FormFields.LAST_NAME}
            errorMessage={errors.lastName?.message}
          />
          <FormPasswordInput
            register={register}
            fieldName={FormFields.NEW_PASSWORD}
            errorMessage={errors.newPassword?.message}
            validations={newPasswordValidations}
          />
          {displayConfirmPasswordInput ? (
            <FormPasswordInput
              register={register}
              fieldName={FormFields.CONFIRM_NEW_PASSWORD}
              errorMessage={errors.confirmNewPassword?.message}
              validations={confirmNewPasswordValidations}
            />
          ) : null}
          <FormInput
            type="number"
            register={register}
            fieldName={FormFields.PHONE_NUMBER}
            errorMessage={errors.phoneNumber?.message}
            validations={phoneNumberValidations}
          />
          <FormInput
            type="text"
            register={register}
            fieldName={FormFields.PHOTO_URL}
            hidden
          />
        </form>
        <VerifyEmail />
      </FormContainer>
    );
  }
);

export default ProfileForm;
