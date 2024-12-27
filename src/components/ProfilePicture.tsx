import { AppLoaders } from "@customTypes/index";
import { useAppSelector } from "@redux/hooks";
import { selectAuthAppLoader } from "@selectors/index";
import "@styles/components/ProfilePicture.css";
import { ChangeEvent, useRef, useState } from "react";
import { Spinner } from "react-bootstrap";
import CustomText from "./common/CustomText";

const DEFAULT_PROFILE_IMAGE_URL =
  "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541";

export type ProfilePicturePropsType = {
  imageUrl?: string | null;
  onFileChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  validation?: (file: File) => { result: boolean; message?: string };
};

const ProfilePicture = ({
  imageUrl,
  onFileChange,
  validation,
}: ProfilePicturePropsType) => {
  const [fileError, setFileError] = useState<string | null>(null);
  const isUploadingImage = useAppSelector(
    selectAuthAppLoader(AppLoaders.UPLOAD_PROFILE_PICTURE)
  );
  const fileRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = (e.target as HTMLInputElement).files;
    if (files) {
      if (validation) {
        const validationResult = validation(files[0]);
        if (validationResult.result && onFileChange) {
          onFileChange(e);
        } else {
          setFileError(validationResult.message || "");
        }
      }
      if (onFileChange && !validation) {
        onFileChange(e);
      }
    } else {
      setFileError("There's no file selected");
    }
  };

  return (
    <>
      {fileError !== null ? (
        <CustomText text={fileError} className="flex errortext text-center" />
      ) : null}
      <div className="d-flex flex-col w-100 align-items-center justify-content-center">
        {isUploadingImage ? (
          <Spinner
            animation="border"
            aria-hidden="true"
            style={{
              height: "10rem",
              width: "10rem",
              color: "black",
              backgroundColor: "lightgray",
            }}
          />
        ) : (
          <img
            src={imageUrl || DEFAULT_PROFILE_IMAGE_URL}
            alt="avatar"
            className="avatar"
            onClick={handleClick}
          />
        )}
        <input
          type="file"
          onChange={handleFileChange}
          className="d-none"
          multiple={false}
          ref={fileRef}
        />
      </div>
    </>
  );
};

export default ProfilePicture;
