import Home from "./components/Home";
import Cart from "./components/Cart";
import ProductDetail from "./components/ProductDetail";
import { Route, Routes } from "react-router-dom";
import Notfound from "./components/Notfound";
import Login from "./components/Login";
import Layout from "./Layout";
import SignUp from "./components/SignUp";
import AuthRoute from "./Routes/AuthRoute";
import UserRoute from "./Routes/UserRoute";
import UserProvider from "./Providers/UserProvider";
import CartProvider from "./Providers/CartProvider";

function App() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <UserProvider>
        <CartProvider>
          <Routes>
            <Route
              path="/"
              element={
                  <Layout />
              }
            >
              <Route path="" element={<Home />} />
              <Route path="product/:idParameter" element={<ProductDetail />} />
              <Route path="cart" element={<Cart />} />
            </Route>
            <Route path="*" element={<Notfound />}></Route>
            <Route
              path="login"
              element={
                <AuthRoute>
                  <Login />
                </AuthRoute>
              }
            ></Route>
            <Route
              path="signup"
              element={

                  <SignUp />
              }
            ></Route>
          </Routes>
        </CartProvider>
      </UserProvider>
    </div>
  );
}

export default App;
