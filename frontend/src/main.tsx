import ReactDOM from "react-dom/client";
import "./index.css";
import "./reset.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./pages/Layouts/MainLayout/MainLayout";
import MainPage from "./pages/MainPage/MainPage";
import ArticlePage from "./pages/ArticlePage/ArticlePage";
import SearchPage from "./pages/SearchPage/SearchPage";
import SchoolPage from "./pages/SchoolPage/SchoolPage";
import ArticleCategoryPage from "./pages/ArticlesCategoryPage/ArticleCategoryPage";
import FileArticleCard from "./FileArticleCard/FileArticleCard";
import FileArticlesCategoryPage from "./pages/FileArticlesCategoryPage/FileArticlesCategoryPage";
import CreateSchoolPage from "./pages/CreateSchoolPage/CreateSchoolPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import UserContextProvider from "./contexts/UserContext";

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
      {
        path: "school/:schoolId",
        element: <SchoolPage />
      },
      {
        path: "school/:schoolId/category/:categoryId/articles",
        element: <ArticleCategoryPage />
      },
      {
        path: "school/:schoolId/category/:categoryId/documents",
        element: <FileArticlesCategoryPage />
      },
      {
        path: "school/create",
        element: <CreateSchoolPage />
      },
      {
        path: "sign_up",
        element: <SignUpPage />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <UserContextProvider>
    <RouterProvider router={router} />
  </UserContextProvider>
);
