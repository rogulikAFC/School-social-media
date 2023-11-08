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

  // let titleHeight = document.getElementById("article-container__title")?.clientHeight;

  useEffect(() => {
    const getArticle = async () => {
      let response = await fetch(
        config.SERVER_URL + `api/articles/${articleId}`
      );
      let articleFromJson: ArticleWithContent = await response.json();

      setArticle(articleFromJson);
    };

    // const getTitleHeight = () => {
    //   var title = document.getElementById("article-container__title");

    //   console.log(title);

    //   setTitleHeight(title?.clientHeight);
    // };

    getArticle();
    // getTitleHeight();
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
      <div className="article-container__heading">
        <ShareContainer
          location={location.toString()}
          title={articleFullTitle}
          blockName="article-container"
          modificatorName="top"
        />

        <div
          className="article-container__heading-background-image"
          style={{
            backgroundImage: `url(${
              config.SERVER_URL + article.previewImagePath
            })`,
          }}
        />
        <div className="article-container__left">
          {article.previewImagePath ? (
            <CategoryTag
              blockName="article-container"
              category={article!.category}
              isFilled={true}
              modificatorName={null}
            />
          ) : (
            ""
          )}
          <img
            src={config.SERVER_URL + article.previewImagePath}
            alt=""
            className="article-container__preview-img"
          />
        </div>

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

        <div className="article-container__right">
          <div className="article-container__additional-info">
            <AuthorTag blockName="article-container" user={article!.user} />
            <span className="article-container__views">
              {article.viewsCount} просмотров
            </span>
            <span className="article-container__date">
              {dateString} в {timeString}
            </span>
          </div>

          <div className="article-container__title">{article.title}</div>

          <ShareContainer
            location={location.toString()}
            title={articleFullTitle}
            blockName="article-container"
            modificatorName="bottom"
          />
        </div>
      </div>

      <div
        className="article-container__content"
        dangerouslySetInnerHTML={{ __html: article.content }}
      >
        {/* {article.content} */}
        {/* Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis ratione quos incidunt aspernatur odio, obcaecati totam non labore eum ad deleniti optio sint consequuntur commodi illum rerum maiores laborum. Ullam?
        Exercitationem doloremque numquam quasi enim, totam dolorum voluptatem nisi similique autem magnam labore, ad veritatis nobis quis iusto fugiat asperiores architecto sequi laborum qui ipsum officiis. Veritatis itaque illo dignissimos.
        Error voluptatibus animi doloribus voluptas aperiam nemo, ducimus aut cupiditate at laboriosam aspernatur aliquam quas eius voluptate ipsam. Voluptatibus in officiis minus iure consequatur vero ab corporis laborum, harum quibusdam?
        Hic reprehenderit unde id deserunt esse tempore in exercitationem molestias necessitatibus eligendi alias adipisci vitae assumenda omnis eum nesciunt quod quae quis, aut nulla totam dolores cupiditate facere aperiam? Et?
        Adipisci dignissimos maxime vero a nulla ratione voluptatum cum est ea reiciendis odit aut excepturi asperiores neque, vitae veritatis repudiandae minus amet inventore laborum perferendis? Illo architecto ratione repellendus voluptatum?
        Laudantium ipsum atque, nam sapiente quia consectetur adipisci harum obcaecati, vitae error placeat molestias? Nisi dolor quos expedita ex mollitia deserunt optio accusamus, corporis dolorem quia doloribus aperiam placeat laboriosam.
        Quis esse cum perspiciatis laudantium saepe, molestias dolores nam, voluptas ducimus vel voluptates eum veniam assumenda pariatur quisquam est vero distinctio deserunt eaque unde error soluta numquam at aliquid. Obcaecati!
        Fugiat eos corporis dolore distinctio voluptate consequatur, repellat eaque, sed iste ratione repudiandae vero voluptatibus. Voluptatem modi sint assumenda obcaecati culpa! Similique iusto dolorum animi sit quaerat at atque distinctio.
        Est molestias magni magnam laudantium animi esse! Labore, aspernatur maxime? Illum amet, provident quia consectetur voluptates esse labore sint ad beatae accusamus minus aliquid tempore soluta repudiandae aspernatur. Excepturi, quae!
        Ipsum nihil beatae recusandae veritatis itaque, iusto, possimus reprehenderit libero sit nulla aliquam dolorem? Necessitatibus dicta tenetur pariatur dolor harum voluptatibus. Neque esse doloribus vero soluta expedita quas dolor molestiae.
        Accusamus neque voluptatibus, aspernatur fugiat, quam eveniet quasi at aperiam cum animi iure amet id illo reiciendis maiores quae delectus minus, voluptas veritatis voluptatum eaque porro dignissimos sit cumque. Dicta.
        Exercitationem, eum delectus odio neque odit similique hic ab ratione expedita impedit harum officiis corporis quo iusto earum placeat illo totam dignissimos unde. Magnam obcaecati, quo expedita facere quidem harum.
        Voluptatem aspernatur facere pariatur illo reprehenderit deleniti molestias eveniet quia eaque, officia quam optio quidem eos ipsa vero nemo corporis molestiae ut nam illum eius ab perferendis. Ducimus, minus nulla.
        Aliquam tenetur culpa molestias pariatur enim magni assumenda eligendi dicta vel nam excepturi omnis cupiditate a odit eaque aliquid iste architecto quasi sunt, consequatur reprehenderit! Ratione accusamus earum impedit iste?
        Accusantium, libero eveniet! Assumenda iusto reprehenderit repudiandae nesciunt sed asperiores est labore ab neque commodi nulla dignissimos magni cumque itaque nisi, inventore consequatur. Quam, dolores doloremque soluta officiis quia quisquam. */}
      </div>
    </div>
  ) : (
    <Preloader />
  );
};

export default ArticlePage;
