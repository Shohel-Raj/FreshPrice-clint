import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import About from "../Pages/About";
import SignUp from "../Pages/SignUp/SignUp";
import Login from "../Pages/Login/Login";
import PrivateRoute from "./PrivateRoute";
import AllProducts from "../Pages/AllProducts";
import RootLayout from "../Layout/RootLayout";
import DashboardLayout from "../Layout/DashboardLayout";
import Statistics from "../Pages/Statistics";
import AddAdvertisement from "../Component/Form/AddAdvertisment";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "/allproduct",
        element:
          <AllProducts />
      },
      {
        path: "/About",
        element: <PrivateRoute>
          <About />
        </PrivateRoute>
      }
    ]
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path:'add-advertisement',
        element:<PrivateRoute>
          <AddAdvertisement/>
        </PrivateRoute>
      }
    ],
  },
]);


export default router;