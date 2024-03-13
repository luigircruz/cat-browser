import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages";
import CatDetails from "../pages/cat/cat-details";
import NotFound from "../pages/not-found";

const router = createBrowserRouter([
  {
    path: "/*",
    element: <HomePage />,
    errorElement: <NotFound />,
  },
  {
    path: "cat/:catId",
    element: <CatDetails />,
  },
]);

export default router;
