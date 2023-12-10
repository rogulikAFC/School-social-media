import "./MainPage.css";
import EntitiesContainerWithLoadMore from "../../EntitiesContainerWithLoadMore/EntitiesContainerWithLoadMore";
import EntitiesContainer from "../../EntitiesContainer/EntitiesContainer";

const MainPage = () => {
  return (
    <>
      <EntitiesContainerWithLoadMore
        blockName="main-page"
        Container={EntitiesContainer}
        entitiesPluralName="articles"
      />
    </>
  );
};

export default MainPage;
