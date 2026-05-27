import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home, { loader as homeLoader } from "./components/Home.jsx";
import Posts, { action as postsAction } from "./components/Posts.jsx";
import Update, { action as updateAction } from "./components/Update.jsx";
import Delete, { action as deleteAction } from "./components/Delete.jsx";

const Layout = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout><Home /></Layout>,
    loader: homeLoader,
  },
  {
    path: "/posts",
    element: <Layout><Posts /></Layout>,
    action: postsAction,
  },
  {
    path: "/update",
    element: <Layout><Update /></Layout>,
    action: updateAction,
  },
  {
    path: "/delete",
    element: <Layout><Delete /></Layout>,
    action: deleteAction,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);