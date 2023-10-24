import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./reset.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./pages/Layouts/MainLayout/MainLayout";
import MainPage from "./pages/MainPage/MainPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <MainPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);