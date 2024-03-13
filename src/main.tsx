import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import router from "./config/router";
import "./styles/globals.scss";
import { CatImagesByBreedContextProvider } from "./contexts/images-by-breed.context";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CatImagesByBreedContextProvider>
      <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
    </CatImagesByBreedContextProvider>
    <Toaster position="top-right" richColors visibleToasts={1} />
  </React.StrictMode>
);
