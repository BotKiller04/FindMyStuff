import './index.css';

import * as React from "react";
import { createRoot } from "react-dom/client";
import Home from './components/Home'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Login from './components/Login';
import SignUp from './components/SignUp';
import AddPost from './components/AddPost';
import CategoryPost from './components/CategoryPost';
import MyPosts from './components/MyPosts';


const router = createBrowserRouter([
  {
    path: "/",
    element: (
    <div>
    <Home/>
    <Link to="about">About us</Link>
    </div>
    ),
  },
  {
    path: "/login",
    element: (
      <Login/>
    ),
  },{
    path: "about",
    element: <div>About</div>,
  },
  {
    path: "/sign-up",
    element: (
      <SignUp/>
    ),
  },
  {
    path: "/add-post",
    element: (
      <AddPost/>
    ),
  },
  {
    path: "/category/:CatId",
    element: (
      <CategoryPost/>
    ),
  },
  {
    path: "/my-posts",
    element: (
      <MyPosts/>
    ),
  },

]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
