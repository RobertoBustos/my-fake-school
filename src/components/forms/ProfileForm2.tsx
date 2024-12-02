import { setUserUpdatedData } from "@actions/index";
import ProfilePicture from "@components/ProfilePicture";
import VerifyEmail from "@components/VerifyEmail";
import CustomText from "@components/common/CustomText";
import FormContainer from "@components/common/FormContainer";
import FormInput from "@components/common/FormInput";
import {
  confirmNewPasswordValidations,
  nameValidations,
  newPasswordValidations,
  phoneNumberValidations,
  profilePictureValidtion,
} from "@components/forms/formValidations";
import {
  FormFields,
  ProfileFormFieldsType,
  UpdateServicePayloadType,
} from "@customTypes/index";
import { useMemoizedTranslation } from "@hooks/index";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { selectLoggedInUserData } from "@selectors/index";
import {
  deleteProfilePictureUnsavedService,
  updateProfileService,
  uploadProfilePictureService,
  validateCredentials,
} from "@services/index";
import { fakeDelayPromise, notify, shapeFirebaseAuthError } from "@utils/index";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";

export type ProfileFormPropsType = {
  reference: any;
  onIsValidChange?: Dispatch<SetStateAction<boolean>>;
  onIsLoadingChange?: Dispatch<SetStateAction<boolean>>;
};

const ProfileForm = ({
  reference,
  onIsValidChange,
  onIsLoadingChange,
}: ProfileFormPropsType) => {
  //to access the submit action from outside the form
  useImperativeHandle(reference, () => ({
    submitForm() {
      handleSubmit(onSubmit)();
    },
  }));
  const { t } = useMemoizedTranslation();
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(selectLoggedInUserData);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isDirty, dirtyFields },
    watch,
    resetField,
    setValue,
  } = useForm<ProfileFormFieldsType>({
    mode: "all",
    defaultValues: {
      firstName: userInfo.displayName?.split(",")[1] || "",
      lastName: userInfo.displayName?.split(",")[0] || "",
      newPassword: "",
      confirmNewPassword: "",
      phoneNumber: userInfo.phoneNumber || "",
      photoURL: userInfo.photoURL,
    },
  });
  const fileRef = useRef<HTMLInputElement>(null);
  const displayConfirmPasswordInput: boolean =
    watch(FormFields.NEW_PASSWORD) !== "";
  const [fileError, setFileError] = useState<string | null>(null);
  const photoURL = watch(FormFields.PHOTO_URL);

  //handling file input events
  const handleClick = () => {
    fileRef.current?.click();
  };
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = (e.target as HTMLInputElement).files;
    if (files) {
      const validation = profilePictureValidtion(files[0]);
      if (validation.result) {
        try {
          const response = await uploadProfilePictureService({
            file: files[0],
            path: "users/" + files[0].name,
          });
          if ("message" in response) {
            throw new Error(
              t(`errors.${shapeFirebaseAuthError(response.message)}`)
            );
          }
          handleFileChangeResponse(true, response.downloadURL);
        } catch (error) {
          handleFileChangeResponse(false, error as string);
        }
      } else {
        handleFileChangeResponse(false, validation.message!);
      }
    }
  };
  const handleFileChangeResponse = async (result: boolean, message: string) => {
    if (photoURL && photoURL !== "" && photoURL !== null) {
      await deleteProfilePictureUnsavedService(photoURL);
    }
    if (result) {
      setValue(FormFields.PHOTO_URL, message, {
        shouldDirty: true,
      });
      setFileError("");
    } else {
      resetField(FormFields.PHOTO_URL);
      setFileError(message);
    }
  };

  const onSubmit = async (data: ProfileFormFieldsType) => {
    let payload: UpdateServicePayloadType = {};
    try {
      await fakeDelayPromise(undefined, 500);
      if (dirtyFields.newPassword) {
        payload.password = {
          currentPassword: data.confirmNewPassword!,
          newPassword: data.newPassword!,
        };
      }
      let profile = Object();
      if (dirtyFields.photoURL) {
        profile!.photoURL = data.photoURL;
      }
      if (dirtyFields.firstName || dirtyFields.lastName) {
        profile!.displayName = data.lastName + "," + data.firstName;
      }
      if (Object.keys(profile).length > 0) {
        payload.profile = profile;
      }
      if (payload.password?.currentPassword) {
        const response = await validateCredentials(
          payload.password.currentPassword
        );
        if ("message" in response) {
          throw t(`errors.${shapeFirebaseAuthError(response.message)}`);
        }
      }
      const response = await updateProfileService(payload);
      if ("message" in response) {
        throw t(`errors.${shapeFirebaseAuthError(response.message)}`);
      }
      resetField("newPassword");
      resetField("confirmNewPassword");
      resetField(FormFields.PHOTO_URL, { defaultValue: data.photoURL });
      dispatch(setUserUpdatedData(payload));
    } catch (error) {
      notify.error(error as string);
    }
  };

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
      {fileError !== null ? (
        <CustomText text={fileError} className="errortext text-center" />
      ) : null}
      <ProfilePicture imageUrl={photoURL} onClick={handleClick} />
      <input
        type="file"
        onChange={handleFileChange}
        ref={fileRef}
        className="d-none"
        multiple={false}
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
        <FormInput
          type="password"
          register={register}
          fieldName={FormFields.NEW_PASSWORD}
          errorMessage={errors.newPassword?.message}
          validations={newPasswordValidations}
        />
        {displayConfirmPasswordInput ? (
          <FormInput
            type="password"
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
};

export default ProfileForm;
