import Login from "./view/login";
import Users from "./view/Users";
import Signup from "./view/Signup";
import NotFound from "./view/Notfound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./view/Dashboard";
import UserForm from "./view/UserForm";
import { Navigate, createBrowserRouter } from "react-router-dom";


const Router = createBrowserRouter([
   //! route dengan keadan sudah login 
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/users" />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/users/new",
        element: <UserForm key="userCreate"/>,
      },
      {
        path: "/users/:id",
        element: <UserForm key="userUpdate"/>,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
//!route dengan keadaan belum login
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },

      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default Router;
