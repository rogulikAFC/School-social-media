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
import FileArticlesCategoryPage from "./pages/FileArticlesCategoryPage/FileArticlesCategoryPage";
import CreateSchoolPage from "./pages/CreateSchoolPage/CreateSchoolPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import UserContextProvider from "./contexts/UserContext";
import CreateArticlePage from "./pages/CreateArticlePage/CreateArticlePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ChangeUser from "./pages/ChangeUser/ChangeUser";

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
      },
      {
        path: "school/:schoolId/create_article",
        element: <CreateArticlePage />
      },
      {
        path: "profile/:userId",
        element: <ProfilePage />
      },
      {
        path: "profile/:userId/change",
        element: <ChangeUser />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <UserContextProvider>
    <RouterProvider router={router} />
  </UserContextProvider>
);
