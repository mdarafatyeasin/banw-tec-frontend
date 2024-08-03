import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignupOption from "../Pages/SignUp/SignupOption";
import Doctor from "../Pages/SignUp/Doctor";
import Patient from "../Pages/SignUp/Patient";
import Dashboard from "../Dashboard/Dashboard";
import Blogs from "../Pages/Blogs/Blogs/Blogs";
import PostBlog from "../Pages/Blogs/PostBlog/PostBlog";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "",
        element: <Home/>,
      },
      {
        path: "/home",
        element: <Home/>,
      },
      {
        path: "/login",
        element: <Login/>,
      },
      {
        path: "/signup",
        element: <SignupOption/>,
      },
      {
        path: "/signup/doctor",
        element: <Doctor/>,
      },
      {
        path: "/signup/patient",
        element: <Patient/>,
      },
      {
        path: "/dashboard",
        element: <Dashboard/>,
      },
      {
        path: "/blogs",
        element: <Blogs/>,
      },
      {
        path: "/blogs/post",
        element: <PostBlog/>,
      },
    ],
  },
]);
