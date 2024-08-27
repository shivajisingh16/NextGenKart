import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import {BrowserRouter,} from "react-router-dom";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <ToastContainer
        toastClassName="rounded-lg"
        bodyClassName="px-2 "
        className="ml-3 w-fit gap-5 sm:w-80 rounded-xl"
        theme="colored"
        position="top-right top-[70px]"
        autoClose={2000}
      />
    </BrowserRouter>
  </React.StrictMode>
);
