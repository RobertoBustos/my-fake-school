import { useForm } from "react-hook-form";
import { useMemoizedTranslation } from "@hooks/useTranslation";
import { FormFields, ProfileFormFieldsType } from "@customTypes/index";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { beginUserEdition, uploadUserProfilePicture } from "@actions/index";
import VerifyEmail from "@components/VerifyEmail";
import FormContainer from "@components/common/FormContainer";
import { parseFullName } from "@utils/index";
import FormInputControl from "@components/common/FormInputControl";
import FormLabel from "@components/common/FormLabel";
import ProfilePicture from "@components/ProfilePicture";
import { ChangeEvent, useRef } from "react";
import { selecProfilePhotoURL } from "@redux/selectors";

export type ProfileFormPropsType = {
  defaultValues: ProfileFormFieldsType;
};

const ProfileForm = ({ defaultValues }: ProfileFormPropsType) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const { t } = useMemoizedTranslation();
  const dispatch = useAppDispatch();
  const { control, register, getValues, watch } =
    useForm<ProfileFormFieldsType>({
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

  const handleClick = () => {
    fileRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = (e.target as HTMLInputElement).files;

    if (files) {
      dispatch(uploadUserProfilePicture({ file: files[0] }));
    }
  };

  return (
    <FormContainer
      formTitle={t("formTitles.userProfile")}
      displayAlerts={false}
    >
      <ProfilePicture imageUrl={photoURL} onClick={handleClick} />
      <input
        type="file"
        onChange={handleFileChange}
        ref={fileRef}
        className="d-none"
        multiple={false}
      />
      <FormLabel
        text={defaultValues.email || ""}
        className="w-100 text-center"
      />
      <FormInputControl
        control={control}
        register={register}
        fieldName={FormFields.FIRST_NAME}
        type={"text"}
        handleChange={handleChange}
      />
      <FormInputControl
        control={control}
        register={register}
        fieldName={FormFields.LAST_NAME}
        type={"text"}
        handleChange={handleChange}
      />
      <FormInputControl
        control={control}
        register={register}
        fieldName={FormFields.NEW_PASSWORD}
        type="passowrd"
        handleChange={handleChange}
      />
      {displayConfirmPasswordInput ? (
        <FormInputControl
          control={control}
          register={register}
          fieldName={FormFields.CONFIRM_NEW_PASSWORD}
          type="passowrd"
          handleChange={handleChange}
        />
      ) : null}
      <FormInputControl
        control={control}
        register={register}
        fieldName={FormFields.PHONE_NUMBER}
        type={"text"}
        handleChange={handleChange}
      />
      <VerifyEmail />
    </FormContainer>
  );
};

export default ProfileForm;
