import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
// import { StrictMode } from "react";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <BrowserRouter>
    <Router />
  </BrowserRouter>
  // </StrictMode>
);
