import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Header from "./Components/UI/Header.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <RouterProvider router={router}> */}
    <BrowserRouter>
      <Header />
      <main className="xl:w-[1280px] xl:mx-auto">
        <App />
      </main>
    </BrowserRouter>
    {/* </RouterProvider> */}
  </React.StrictMode>
);
