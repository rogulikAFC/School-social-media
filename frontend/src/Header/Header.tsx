import { useState } from "react";
import "./Header.css";
import SearchIcon from "../assets/SearchIcon.svg";
import HeaderElement, {
  HeaderElementProps,
} from "./HeaderElement/HeaderElement";
import Menu from "../assets/Menu.svg";
import SearchField from "../Fields/SearchField/SearchField";
import { useNavigate } from "react-router-dom";

type HeaderProps = {
  blockName: string;
};

const Header = ({ blockName }: HeaderProps) => {
  const [mobileMenuOpened, setMobileMenuOpened] = useState<boolean>(false);
  const [searchContainerOpened, setSearchContainerOpened] =
    useState<boolean>(false);

  const navigate = useNavigate();

  const headerElementsProps: HeaderElementProps[] = [
    { name: "Главная", onClick: () => navigate("") },
    { name: "Тестовая 1", onClick: () => navigate("") },
    { name: "Тестовая 2", onClick: () => navigate("") },
    { name: "Тестовая 3", onClick: () => navigate("") },
    { name: "Тестовая 4", onClick: () => navigate("") },
  ];

  const headerElements = headerElementsProps.map((props) => (
    <HeaderElement {...props} />
  ));

  return (
    <header className={`header ${blockName}__header`}>
      <nav className="header__content">
        <div
          className="header-elements header__header-elements"
          style={{
            display: searchContainerOpened ? "none" : "flex",
          }}
        >
          {headerElements}
        </div>

        <button
          className="header__search-button"
          onClick={() => setSearchContainerOpened((prevStatus) => !prevStatus)}
          style={{ display: searchContainerOpened ? "none" : "block" }}
        >
          <img src={SearchIcon} alt="Search" />
        </button>

        <nav
          className="mobile-menu header__mobile-menu"
          style={{
            visibility: searchContainerOpened ? "hidden" : "visible",
            position: searchContainerOpened ? "absolute" : "static",
          }}
        >
          <button
            className="mobile-menu__menu-button"
            onClick={() => setMobileMenuOpened((isOpened) => !isOpened)}
          >
            <img src={Menu} alt="Menu" />
            <div
              className="mobile-menu__content-container"
              style={{
                visibility: mobileMenuOpened ? "visible" : "hidden",
              }}
            >
              <div className="mobile-menu__background" />
              <div className="mobile-menu__content">{headerElements}</div>
            </div>
          </button>
        </nav>

        <div
          className="search-container header__search-container"
          style={{
            visibility: searchContainerOpened ? "visible" : "hidden",
            position: searchContainerOpened ? "static" : "absolute",
          }}
        >
          <SearchField
            blockName="search-container"
            onCancelClick={() => setSearchContainerOpened(false)}
          />
        </div>
      </nav>
    </header>
  );
};

export default Header;
