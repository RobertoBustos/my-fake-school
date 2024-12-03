import { beginUserEdition, uploadUserProfilePicture } from "@actions/index";
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
import { FormFields, ProfileFormFieldsType } from "@customTypes/index";
import { useMemoizedTranslation } from "@hooks/index";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { selecProfilePhotoURL } from "@selectors/index";
import { parseFullName } from "@utils/index";
import { ChangeEvent } from "react";
import { useForm } from "react-hook-form";

export type ProfileFormPropsType = {
  defaultValues: ProfileFormFieldsType;
};

const ProfileForm = ({ defaultValues }: ProfileFormPropsType) => {
  const { t } = useMemoizedTranslation();
  const dispatch = useAppDispatch();
  const {
    register,
    getValues,
    watch,
    formState: { errors },
  } = useForm<ProfileFormFieldsType>({
    mode: "all",
    defaultValues: async () => defaultValues,
  });
  const photoURL = useAppSelector(selecProfilePhotoURL);
  const displayConfirmPasswordInput: boolean =
    watch(FormFields.NEW_PASSWORD) !== "";

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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = (e.target as HTMLInputElement).files;
    if (files) {
      dispatch(uploadUserProfilePicture({ file: files[0] }));
    }
  };

  return (
    <FormContainer formTitle={t("formTitles.userProfile")}>
      <ProfilePicture
        imageUrl={photoURL}
        onFileChange={handleFileChange}
        validation={profilePictureValidtion}
      />
      <CustomText
        text={defaultValues.email || ""}
        className="w-100 text-center text-bold"
      />
      <form noValidate>
        <FormInput
          type="text"
          register={register}
          fieldName={FormFields.FIRST_NAME}
          onValueChange={(e) => {
            handleChange(FormFields.FIRST_NAME, e.target.value);
          }}
          errorMessage={errors.firstName?.message}
          validations={nameValidations}
        />
        <FormInput
          type="text"
          register={register}
          fieldName={FormFields.LAST_NAME}
          onValueChange={(e) => {
            handleChange(FormFields.LAST_NAME, e.target.value);
          }}
          errorMessage={errors.lastName?.message}
        />
        <FormPasswordInput
          register={register}
          fieldName={FormFields.NEW_PASSWORD}
          onValueChange={(e) => {
            handleChange(FormFields.NEW_PASSWORD, e.target.value);
          }}
          errorMessage={errors.newPassword?.message}
          validations={newPasswordValidations}
        />
        {displayConfirmPasswordInput ? (
          <FormPasswordInput
            register={register}
            fieldName={FormFields.CONFIRM_NEW_PASSWORD}
            onValueChange={(e) => {
              handleChange(FormFields.CONFIRM_NEW_PASSWORD, e.target.value);
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
            handleChange(FormFields.PHONE_NUMBER, e.target.value);
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
