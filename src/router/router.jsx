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
import AddProduct from "../Component/Form/AddProduct";
import MyProduct from "../Pages/MyProduct";
import MyAdds from "../Pages/MyAdds";
import VendorRouter from "./VendorRouter";
import AllAds from "../Pages/AllAds";
import AllOrders from "../Pages/AllOrders";
import AllUsersPaginated from "../Pages/AllUsers";
import BecomeVendorForm from "../Component/Form/BecomeVendorForm";
import LoadingSpinner from "../Component/Shared Comonent/LoadingSpinner/LoadingSpinner";
import ProductDetails from "../Pages/ProductDetails";
import DashboardRedirect from "../Layout/DashboardRedirect";
import VendorDashboard from "../Pages/VendorDashboard";
import PriceTrand from "../Pages/PriceTrand";
import WatchList from "../Pages/WatchList";
import MyOrder from "../Pages/MyOrder";
import AllProductadmin from "../Pages/AllProductadmin";
import Payment from "../Pages/Payment";
import AllVendor from "../Pages/AllVendor";
import ErrorPage from "../Pages/Error";
import AdminRoute from "./AdminRoute";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        Component: Home,
        loader:()=>fetch(`${import.meta.env.VITE_API_URL}/grouped-by-market`),
        hydrateFallbackElement:<LoadingSpinner/>
        
      },
      {
        path: "/allproduct",
        element:
          <AllProducts />
      },
      {
        path: "/productDetails/:productId",
        element: <PrivateRoute>
          <ProductDetails />
        </PrivateRoute>
      },
      {
        path: "/About",
        element: 
          <About />
       
      },
      {
        path: 'payment/:id',
        element: <PrivateRoute>
          <Payment />
        </PrivateRoute>
      },
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
            <DashboardRedirect />
          </PrivateRoute>
        ),
      },
      {
        path:'admin-home',
        element:
        
        <AdminRoute>
         <PrivateRoute>
          <Statistics/>
        </PrivateRoute> 
        </AdminRoute>
        
      },
      {
        path:'vendor-home',
        element:<PrivateRoute>
          <VendorDashboard/>
        </PrivateRoute>
      },
      {
        path: 'all-users',
        element: <PrivateRoute>
          <AllUsersPaginated />
        </PrivateRoute>
      },
      {
        path: 'all-products',
        element: <PrivateRoute>
          <AllProductadmin />
        </PrivateRoute>
      },
      {
        path: 'all-vendor',
        element: <PrivateRoute>
          <AllVendor/>
        </PrivateRoute>
      },
      {
        path: 'all-ads',
        element: <PrivateRoute>
          <AllAds />
        </PrivateRoute>
      },
      {
        path: 'all-orders',
        element: <PrivateRoute>
          <AllOrders />
        </PrivateRoute>
      },
      {
        path: 'add-advertisement',
        element: <PrivateRoute>
          <VendorRouter>
            <AddAdvertisement />
          </VendorRouter>

        </PrivateRoute>
      },
      {
        path: 'add-product',
        element: <PrivateRoute>
          <VendorRouter>
            <AddProduct />
          </VendorRouter>

        </PrivateRoute>
      },
      {
        path: 'my-products',
        element: <PrivateRoute>
          <VendorRouter>
            <MyProduct />
          </VendorRouter>
        </PrivateRoute>
      },

      {
        path: 'my-advertisements',
        element: <PrivateRoute>
          <VendorRouter>
            <MyAdds />
          </VendorRouter>

        </PrivateRoute>
      },

      // use menu

      {
        path: 'vendor-Request',
        element: <PrivateRoute>
          <BecomeVendorForm />
        </PrivateRoute>
      },
      {
        path: 'user-home',
        element: <PrivateRoute>
          <PriceTrand />
        </PrivateRoute>
      },
      {
        path: 'watchlist',
        element: <PrivateRoute>
          <WatchList />
        </PrivateRoute>
      },
      
      {
        path: 'my-orders',
        element: <PrivateRoute>
          <MyOrder />
        </PrivateRoute>
      },

    ],
  },
]);


export default router;