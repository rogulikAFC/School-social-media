import ShareButton from "../ShareButton/ShareButton";
import WAIcon from "../assets/WAIcon.svg";
import TelegramIcon from "../assets/TelegramIcon.svg";
import VKIcon from "../assets/VKIcon.svg";
import "./ShareContainer.css";

type ShareContainerProps = {
  location: string;
  title: string | null;
  blockName: string;
  modificatorNames: string[];
};

type ShareContainerPropsWithOptions = PartialBy<
  ShareContainerProps,
  "modificatorNames"
>;

const ShareContainer = ({
  location,
  title,
  blockName,
  modificatorNames,
}: ShareContainerPropsWithOptions) => (
  <div
    className={`${
      modificatorNames
        ? modificatorNames
            .map((mn) => `share-container_${mn}`)
            .join(" ")
        : ""
    } share-container ${blockName}__share-container`}
  >
    Поделиться:
    <div className="share-container__buttons">
      <ShareButton
        blockName="share-container"
        icon={TelegramIcon}
        shareUrl={`https://t.me/share/url?url=${location}&text=${title}`}
        dataAction={null}
      />
      <ShareButton
        blockName="share-container"
        icon={WAIcon}
        shareUrl={`https://web.whatsapp.com/send?text=${
          location + "     " + title
        }`}
        dataAction="share/whatsapp/share"
      />
      <ShareButton
        blockName="share-container"
        icon={VKIcon}
        shareUrl={`http://vkontakte.ru/share.php?url=${location}`}
        dataAction={null}
      />
    </div>
  </div>
);

export default ShareContainer;
