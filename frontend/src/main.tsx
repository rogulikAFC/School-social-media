import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./reset.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./pages/Layouts/MainLayout/MainLayout";
import MainPage from "./pages/MainPage/MainPage";
import ArticlePage from "./pages/ArticlePage/ArticlePage";
import SearchPage from "./pages/SearchPage/SearchPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <MainPage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "article/:articleId",
        element: <ArticlePage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
