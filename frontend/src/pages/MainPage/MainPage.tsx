import { useEffect, useState } from "react";
import { config } from "../../../config";
import ArticleCard from "../../ArticleCard/ArticleCard";
import "./MainPage.css";
import Preloader from "../../Preloader/Preloader";
import loadMoreIcon from "../../assets/LoadMoreIcon.svg";

const MainPage = () => {
  const [articles, setArticles] = useState<Article[]>();
  const [pageNum, setPageNum] = useState<number>(1);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const pageSize = 4;

  useEffect(() => {
    const getArticles = async () => {
      if (isLastPage) {
        return;
      }

      let response = await fetch(
        config.SERVER_URL + `api/Articles?pageNum=${pageNum}&pageSize=${pageSize}`
      );
      let json = await response.json();

      let articlesFromJson: Article[] = json;

      if (articlesFromJson.length < pageSize) {
        setIsLastPage(true);
      }

      if (!articles) {
        setArticles(articlesFromJson);

        return;
      }

      setArticles((prevArticles) => [...prevArticles!, ...articlesFromJson]);
    };

    getArticles();
  }, [pageNum]);

  let category: Category = {
    name: "Test category",
    id: "lakjlkadsjflkasdjflaksdjf",
  };

  let school: School = {
    id: "36c105d6-2f7e-4346-80ff-a11ba79b1892",
    fullAddress: "Saint-Petersburg, Kupchino dom 1",
    name: "School 87982",
    imagePath: "Images/SchoolImages/Testschoolimage.jpg",
    nameWithAddress: "School 87982 (Saint-Petersburg, Kupchino dom 1)",
  };

  let user: User = {
    id: "lakdfjalkdsf",
    name: "Test user name",
    profileViewCount: 10,
    imagePath: "Images/UserImages/c61f5c6d-7fde-4c07-b395-422dd1f9cda9.png",
    school: school,
  };

  let article: Article = {
    id: "akdfjaklsdfj",
    title: "Title lorem ipsum dorem sit amen lana layu",
    category: category,
    viewsCount: 115,
    user: user,
    school: school,
    createdUTC: "10/23/2023 4:47:58 PM +00:00",
    rating: 10,
    previewImagePath:
      "Images/ArticlePreviewsImages/3ed6b75e-9f9c-4499-b052-74301d048ae0.png",
  };

  return (
    <>
      <div className="main-page__articles">
        {articles ? (
          articles.map((article) => (
            <ArticleCard
              article={article}
              key={article.id}
              blockName="main-page"
            />
          ))
        ) : (
          <Preloader />
        )}
      </div>

      {articles ? (
        <button
          className="main-page__load-more-btn"
          onClick={() => {
            setPageNum((prevPageNum) => ++prevPageNum);
          }}
        >
          <img src={loadMoreIcon} alt="" />
          Загрузить ещё
        </button>
      ) : (
        ""
      )}
    </>
  );
};

export default MainPage;
