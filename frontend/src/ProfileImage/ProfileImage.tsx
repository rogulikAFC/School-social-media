import "./ProfileImage.css";

type ProfileImageProps = {
  blockName: string;
  imageSource: string | null;
};

const ProfileImage = ({ blockName, imageSource }: ProfileImageProps) => {
  return (
    <img
      className={`profile-image ${blockName}__profile-image`}
      src={imageSource ? imageSource : "null"}
    />
  );
};

export default ProfileImage;
