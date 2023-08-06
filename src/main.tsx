import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Header from "./Components/UI/Header.tsx";
import Nav from "./Components/UI/Nav.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <div id="backdrop"></div>
      <div id="modal"></div>
      <BrowserRouter>
        <Header />
        <Nav />
        <main className="xl:w-[1280px] xl:mx-auto min-h-[800px]">
          <App />
        </main>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
