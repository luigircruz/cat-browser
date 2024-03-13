import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages";
import CatDetails from "../pages/cat/cat-details";
import NotFound from "../pages/not-found";
import { getBreeds } from "../services/breeds";

const router = createBrowserRouter([
  {
    path: "/",
    loader: getBreeds,
    element: <HomePage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/cat/:catId",
    element: <CatDetails />,
  },
]);

export default router;
