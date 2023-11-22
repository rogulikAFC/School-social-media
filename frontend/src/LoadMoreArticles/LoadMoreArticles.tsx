import { useEffect, useState } from "react";
import LoadingImg from "../assets/Loading.svg";
import LoadMoreImg from "../assets/LoadMoreIcon.svg";
import "./LoadMoreArticles.css";

type LoadMoreArticlesProps = {
  onClick: () => void;
  blockName: string;
  isLoaded: boolean;
};

const LoadMoreArticles = ({
  onClick,
  blockName,
  isLoaded,
}: LoadMoreArticlesProps) => {
  const [icon, setIcon] = useState<string>(LoadMoreImg);

  useEffect(() => {
    isLoaded ? setIcon(LoadMoreImg) : setIcon(LoadingImg);
  }, [isLoaded]);

  return (
    <button className={`load-more-btn ${blockName}__load-more-btn`} onClick={onClick}>
      <img src={icon} alt="" />
      Загрузить ещё
    </button>
  );
};

export default LoadMoreArticles;
