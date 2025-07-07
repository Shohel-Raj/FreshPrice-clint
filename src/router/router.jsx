import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Pages/Home";
import About from "../Pages/About";

const router = createBrowserRouter([
    {
      path: "/",
      Component:RootLayout,
      children:[
        {
            index:true,
            Component:Home
        },
        {
            path:"/About",
            Component:About
        }
      ]
    },

  ]);


  export default router;