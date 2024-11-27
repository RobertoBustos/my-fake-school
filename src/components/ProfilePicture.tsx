import "@styles/components/ProfilePicture.css";

const DEFAULT_PROFILE_IMAGE_URL =
  "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541";

export type ProfilePicturePropsType = {
  imageUrl?: string | null;
  onClick?: () => void;
};

const ProfilePicture = ({ imageUrl, onClick }: ProfilePicturePropsType) => {
  return (
    <div className="d-flex w-100 align-items-center justify-content-center">
      <img
        src={imageUrl || DEFAULT_PROFILE_IMAGE_URL}
        alt="avatar"
        className="avatar"
        onClick={onClick}
      />
    </div>
  );
};

export default ProfilePicture;
