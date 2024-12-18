import { beginUserEdition, setUserUpdatedData, uploadUserProfilePicture } from "@actions/index";
import { profilePictureValidtion } from "@components/forms/formValidations";
import { FormFields, ProfileFormFieldsType, UpdateServicePayloadType } from "@customTypes/index";
import { useMemoizedTranslation } from "@hooks/index";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { selecProfilePhotoURL, selectLoggedInUserData } from "@selectors/index";
import { deleteProfilePictureUnsavedService, updateProfileService, uploadProfilePictureService, validateCredentials } from "@services/index";
import { notify, parseFullName, shapeFirebaseAuthError } from "@utils/index";
import { ChangeEvent, useCallback } from "react";
import { useForm } from "react-hook-form";

export type UseProfilePropsType = {
    isReduxMode?: boolean;
}

export const useProfile = ({ isReduxMode = false }: UseProfilePropsType) => {
    const userInfo = useAppSelector(selectLoggedInUserData);
    const reduxModePhotoUrl = useAppSelector(selecProfilePhotoURL);
    const dispatch = useAppDispatch()
    const { t } = useMemoizedTranslation();
    const {
        register,
        getValues,
        formState: { errors, dirtyFields, isDirty, isValid, isSubmitting },
        watch,
        resetField,
        setValue,
        handleSubmit,
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
    const displayConfirmPasswordInput: boolean =
        watch(FormFields.NEW_PASSWORD) !== "";
    const photoURL = isReduxMode ? reduxModePhotoUrl : watch(FormFields.PHOTO_URL)

    const handleFileChange = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
        const files = (e.target as HTMLInputElement).files;
        if (files) {
            if (isReduxMode) {
                return dispatch(uploadUserProfilePicture({ file: files[0] }));
            }
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
                    return handleFileChangeResponse(true, response.downloadURL, photoURL);
                } catch (error) {
                    return handleFileChangeResponse(false, error as string, photoURL);
                }
            } else {
                return handleFileChangeResponse(false, validation.message!, photoURL);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleFileChangeResponse = useCallback(async (result: boolean, message: string, photoURL: string | null | undefined) => {
        if (photoURL && photoURL !== "" && photoURL !== null) {
            await deleteProfilePictureUnsavedService(photoURL);
        }
        if (result) {
            setValue(FormFields.PHOTO_URL, message, {
                shouldDirty: true,
            });
        } else {
            resetField(FormFields.PHOTO_URL);
        }
    }, [resetField, setValue])

    const onSubmit = useCallback(async (data: ProfileFormFieldsType) => {
        let payload: UpdateServicePayloadType = {};
        try {
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
    }, [dirtyFields.firstName, dirtyFields.lastName, dirtyFields.newPassword, dirtyFields.photoURL, dispatch, resetField, t])

    const handleFieldChange = useCallback((fieldName: FormFields, value: string) => {
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
    }, [dispatch, getValues])

    return {
        userInfo,
        register,
        getValues,
        errors,
        dirtyFields,
        isDirty,
        isValid,
        isSubmitting,
        watch,
        resetField,
        setValue,
        handleSubmit,
        displayConfirmPasswordInput,
        photoURL,
        handleFileChange,
        onSubmit,
        handleFieldChange,
    }
}