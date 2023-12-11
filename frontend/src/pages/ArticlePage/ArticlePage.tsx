import { useParams } from "react-router-dom";
import "./ArticlePage.css";
import CategoryTag from "../../CategoryTag/CategoryTag";
import AuthorTag from "../../AuthorTag/AuthorTag";
import { useEffect, useState } from "react";
import { config } from "../../../config";
import Preloader from "../../Preloader/Preloader";
import ShareContainer from "../../ShareContainer/ShareContainer";
import BluredImageBackground from "../../BluredImageBackground/BluredImageBackground";
import TitleForCards from "../../Title/TitleForCards";

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
      <div className="article-container__article-info article-info">
        <BluredImageBackground
          blockName="article-info"
          imageUrl={config.SERVER_URL + article.previewImagePath}
        />

        <figure className="article-info__image">
          <img src={config.SERVER_URL + article.previewImagePath} />

          <figcaption>
            <CategoryTag
              blockName="article-info"
              category={article!.category}
              isFilled={true}
            />
          </figcaption>
        </figure>

        <div className="article-info__title-with-additional-info">
          <div className="article-info__additional-info">
            <AuthorTag blockName="article-info" user={article!.user} />
            <span className="article-info__views">
              {article.viewsCount} просмотров
            </span>
            <span className="article-info__date">
              {dateString} в {timeString}
            </span>
          </div>
          <TitleForCards blockName="article-info">
            {article.title}
          </TitleForCards>
        </div>

        <ShareContainer
          location={location.toString()}
          title={articleFullTitle}
          blockName="article-info"
        />
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
