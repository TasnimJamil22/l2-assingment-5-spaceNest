import Main from "@/Layout/Main";
import Home from "@/Pages/Home/Home";
import Products from "@/Pages/Products/Products";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/products",
        element: <Products></Products>,
      },
    ],
  },
]);

export default router;
