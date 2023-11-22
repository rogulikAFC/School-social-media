import { useParams } from "react-router-dom";
import "./ArticlePage.css";
import CategoryTag from "../../CategoryTag/CategoryTag";
import AuthorTag from "../../AuthorTag/AuthorTag";
import { useEffect, useState } from "react";
import { config } from "../../../config";
import Preloader from "../../Preloader/Preloader";
import ShareContainer from "../../ShareContainer/ShareContainer";

const ArticlePage = () => {
  const { articleId } = useParams();

  const [article, setArticle] = useState<ArticleWithContent>();

  useEffect(() => {
    const getArticle = async () => {
      let response = await fetch(
        config.SERVER_URL + `api/articles/${articleId}`
      );
      let articleFromJson: ArticleWithContent = await response.json();

      setArticle(articleFromJson);
    };

    getArticle();
  }, []);

  let date = new Date(article?.createdUTC + " GMT");

  let dateString = date.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let timeString = date.toLocaleTimeString("ru-RU", {
    timeStyle: "short",
  });

  let articleFullTitle =
    article?.title + " - " + article?.user.name + ", " + article?.school.name;

  return article ? (
    <div className="article-container main-page__article-container">
      <div
        className={`article-container__heading ${
          article.previewImagePath ? "" : "article-container__heading_no-image"
        }`}
      >
        <ShareContainer
          location={location.toString()}
          title={articleFullTitle}
          blockName="article-container"
          modificatorNames={
            article.previewImagePath ? ["top"] : ["top", "no-image"]
          }
        />

        {article.previewImagePath ? (
          <div
            className="article-container__heading-background-image"
            style={{
              backgroundImage: `url(${
                config.SERVER_URL + article.previewImagePath
              })`,
            }}
          />
        ) : (
          ""
        )}
        {article.previewImagePath ? (
          <div className="article-container__left">
            <CategoryTag
              blockName="article-container"
              category={article!.category}
              isFilled={true}
              modificatorName={null}
            />
            <img
              src={config.SERVER_URL + article.previewImagePath}
              alt=""
              className="article-container__preview-img"
            />
          </div>
        ) : (
          ""
        )}

        {article.previewImagePath ? (
          ""
        ) : (
          <CategoryTag
            blockName="article-container"
            category={article!.category}
            isFilled={true}
            modificatorName="no-image"
          />
        )}

        <div
          className={`article-container__right ${
            article.previewImagePath ? "" : "article-container__right_no-image"
          }`}
        >
          <div
            className={`article-container__additional-info ${
              article.previewImagePath
                ? ""
                : "article-container__additional-info_no-image"
            }`}
          >
            <AuthorTag blockName="article-container" user={article!.user} />
            <span className="article-container__views">
              {article.viewsCount} просмотров
            </span>
            <span className="article-container__date">
              {dateString} в {timeString}
            </span>
          </div>

          <div
            className={`article-container__title ${
              article.previewImagePath
                ? ""
                : "article-container__title_no-image"
            }`}
          >
            {article.title}
          </div>

          <ShareContainer
            location={location.toString()}
            title={articleFullTitle}
            blockName="article-container"
            modificatorNames={article.previewImagePath ? ["bottom", "with-image"] : ["bottom", "no-image"]}
          />
        </div>
      </div>

      <div
        className="article-container__content"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </div>
  ) : (
    <Preloader />
  );
};

export default ArticlePage;
