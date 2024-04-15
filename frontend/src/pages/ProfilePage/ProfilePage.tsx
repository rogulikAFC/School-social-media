import "./ProfilePage.css";
import { useEffect, useState } from "react";
import { config } from "../../../config";
import Title from "../../Title/Title";
import ProfileImage from "../../ProfileImage/ProfileImage";
import SchoolCard from "../../SchoolCard/SchoolCard";
import EntitiesContainer from "../../EntitiesContainer/EntitiesContainer";
import EntitiesCategory from "../../EntitiesCategory/EntitiesCategory";
import { useParams } from "react-router-dom";
import useCheckIfUserImageValid from "../../hooks/useCheckIfUserImageValid";
import useCheckIfSelfProfile from "../../hooks/useCheckIfSelfProfile";

const ProfilePage = () => {
  const { userId: userFromProfileId } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const { isSelfProfile } = useCheckIfSelfProfile(userFromProfileId);
  const { isUserImageValid } = useCheckIfUserImageValid(user);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        config.SERVER_URL + "api/Users/" + userFromProfileId
      );

      if (!response.ok) return;

      const userFromResponse = await response.json();

      setUser(userFromResponse);
    })();
  }, []);

  return (
    <div className="profile main-page__profile">
      <div className="profile__header">
        {user?.imagePath && isUserImageValid && (
          <ProfileImage
            blockName="profile"
            imageSource={
              user?.imagePath ? config.SERVER_URL + user.imagePath : ""
            }
          />
        )}

        <div className="profile__info-container">
          <Title blockName="profile">
            {user?.name ?? ""}

            {isSelfProfile && (
              <button className="form-button profile__form-button">
                Изменить
              </button>
            )}
          </Title>

          {user?.school && (
            <SchoolCard blockName="profile" entity={user?.school} />
          )}

          <div className="profile__other-info-container">
            <div className="profile__email">{user?.email ?? ""}</div>
            <div className="profile__views-count">
              {user?.profileViewCount} просмотров
            </div>
          </div>
        </div>
      </div>

      {user && (
        <EntitiesCategory
          Container={EntitiesContainer}
          blockName="profile"
          title="Статьи"
          entitiesPluralName="articles"
          searchString={"userId=" + user.id}
        />
      )}
    </div>
  );
};

export default ProfilePage;
