import { FC } from "react";
import { Outlet } from "react-router-dom";
import "./MainLayout.css";
import Header from "../../../Header/Header";

const MainLayout: FC = () => (
  <div className="main-container">
    <Header blockName="main-container" />
    <div className="main-container__content">
      <Outlet />
    </div>
  </div>
);

export default MainLayout;
