import { AppLoaders } from "@customTypes/index";
import { useAppSelector } from "@redux/hooks";
import { selectAppLoader } from "@redux/selectors";
import "@styles/components/ProfilePicture.css";
import { Spinner } from "react-bootstrap";

const DEFAULT_PROFILE_IMAGE_URL =
  "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541";

export type ProfilePicturePropsType = {
  imageUrl?: string | null;
  onClick?: () => void;
};

const ProfilePicture = ({ imageUrl, onClick }: ProfilePicturePropsType) => {
  const isUploadingImage = useAppSelector(
    selectAppLoader(AppLoaders.UPLOAD_PROFILE_PICTURE)
  );

  return (
    <div className="d-flex w-100 align-items-center justify-content-center">
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
          onClick={onClick}
        />
      )}
    </div>
  );
};

export default ProfilePicture;
