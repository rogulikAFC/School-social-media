import { config } from "../../config";
import "./AuthorTag.css"
import UnknownUserImage from "../assets/UnknownUserImage.svg";

type AuthorTagProps = {
  user: User
  blockName: string
};

const AuthorTag = ({ user, blockName }: AuthorTagProps) => {
  let userImage = config.SERVER_URL + user.imagePath;

  return (
    <figure className={`author-tag ${blockName}__author-tag`}>
      {user.imagePath !== null ? <img src={userImage} /> : <img src={UnknownUserImage} />}
      <figcaption>Автор: {user.name}</figcaption>
    </figure>
  );
};

export default AuthorTag;
