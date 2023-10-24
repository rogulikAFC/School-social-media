import { FC, useState, useEffect } from "react";
import "./Header.css";
import SearchIcon from "../assets/SearchIcon.svg";
import HeaderElement from "./HeaderElement";
import Menu from "../assets/Menu.svg";

const Header: FC<{ blockName: string }> = ({ blockName }) => {
  const [mobileMenuOpened, setMobileMenuOpened] = useState<boolean>(false);

  return (
    <header className={`header ${blockName}__header`}>
      <div className="header-elements header__header-elements">
        <HeaderElement name="Test" relativeLink="/ladno" />
        <HeaderElement name="Just test" relativeLink="/Ladnoladno" />
        <HeaderElement name="Test" relativeLink="/ladno" />
        <HeaderElement name="Just test" relativeLink="/Ladnoladno" />
        <HeaderElement name="Test" relativeLink="/ladno" />
      </div>

      <button className="header__search-button">
        <img src={SearchIcon} alt="Search" />
      </button>

      <div className="mobile-menu header__mobile-menu">
        <button
          className="mobile-menu__menu-button"
          onClick={() => setMobileMenuOpened((isOpened) => !isOpened)}
        >
          <img src={Menu} alt="Menu" />

          <div
            className="mobile-menu__content"
            style={{ visibility: mobileMenuOpened ? "visible" : "hidden" }}
          >
            <HeaderElement name="Test" relativeLink="/ladno" />
            <HeaderElement name="Just test" relativeLink="/Ladnoladno" />
            <HeaderElement name="Test" relativeLink="/ladno" />
            <HeaderElement name="Just test" relativeLink="/Ladnoladno" />
            <HeaderElement name="Test" relativeLink="/ladno" />
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;
