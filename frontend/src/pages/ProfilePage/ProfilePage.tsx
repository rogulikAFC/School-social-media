import "./ProfilePage.css";
import { UserContext } from "../../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { config } from "../../../config";
import Title from "../../Title/Title";
import ProfileImage from "../../ProfileImage/ProfileImage";
import SchoolCard from "../../SchoolCard/SchoolCard";
import EntitiesContainer from "../../EntitiesContainer/EntitiesContainer";
import EntitiesCategory from "../../EntitiesCategory/EntitiesCategory";
import { Link, useParams } from "react-router-dom";

const ProfilePage = () => {
  const { userId } = useParams();
  const { getCredentials } = useContext(UserContext);
  const [user, setUser] = useState<User | null>(null);
  const [isSelfProfile, setIsSelfProfile] = useState<boolean>(false);

  useEffect(() => {
    (async () => setUser(await getCredentials()))();
  }, []);

  useEffect(() => {
    if (user?.id === userId) return setIsSelfProfile(true);

    return setIsSelfProfile(false);
  }, [user, userId]);

  return (
    <div className="profile main-page__profile">
      <div className="profile__header">
        <ProfileImage
          blockName="profile"
          imageSource={
            user?.imagePath ? config.SERVER_URL + user.imagePath : ""
          }
        />

        <div className="profile__info-container">
          <Title blockName="profile">
            {user?.name ?? ""}

           {isSelfProfile && <button className="form-button profile__form-button">Изменить</button>}
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

      {/* {user && <EntitiesCategory
        Container={EntitiesContainer}
        blockName="profile"
        title="Файлы"
        entitiesPluralName="file_articles"
        searchString={"userId=" + user.id}
      />} */}
    </div>
  );
};

export default ProfilePage;
