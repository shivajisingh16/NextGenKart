import React from "react";
import ReactDOM from "react-dom/client";
import ProductDetail from "./components/ProductDetail.jsx";
import Cart from "./components/Cart.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Home from "./components/Home.jsx";
import App from "./App.jsx";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<App/>}>
//       <Route path="" element={<Home/>}></Route>
//       <Route path="product/:idParameter" element={<ProductDetail/>}></Route>
//       <Route path="cart" element={<Cart/>}></Route>
//     </Route>
//   )
// );

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
