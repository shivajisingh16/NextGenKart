import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import ProductDetail from "./components/ProductDetail";
import { Route, Routes } from "react-router-dom";
import {  useMemo, useState } from "react";
import Notfound from "./components/Notfound";
import {toast} from 'react-toastify'

function App() {

  let cartData =useMemo(()=>{
    let storedCart = localStorage.getItem("cart") || "{}";
     return JSON.parse(storedCart);
  },[])

  const [cart, setCart] = useState(cartData);
 
  function addProductToCart(productId, count, img, title, price) {
    if(count==0){
      toast.warn("Add atleast one Product.")
      return;
    }
    if(cart[productId]&&count==cart[productId].count){
      toast.info(`Already added ${count} Product.`)
      return;
    }
    let newCart = { ...cart };

    if (!newCart[productId]) {
      newCart[productId] = {
        count: count,
        img: img,
        title: title,
        price: price,
      };
    } else {
      newCart[productId] = {
        ...newCart[productId],
        count: count,
      };
    }
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    
    toast.success(`${count} Product added succesfully`);
  }
  let totalCount = useMemo(()=>{
    return Object.keys(cart).reduce((total, current) => {
      return total + cart[current].count;
    }, 0);
  },[cart])

  function deleteItem(id) {
    let newCart = Object.keys(cart)
      .filter((productId) => productId != id)
      .reduce((newObj, key) => {
        newObj[key] = cart[key];
        return newObj;
      }, {});
      setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    toast.error("Product deleted succesfully.")
  }
  function updateCart(setChanged, givenCart) {
    localStorage.setItem("cart", JSON.stringify(givenCart));
    setCart(givenCart);
    setChanged(false);
    toast.success("Cart updated succesfully.")
  }
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header totalCount={totalCount} />
      <div className="mt-24"></div>
      <Routes>
        <Route index element={<Home />}></Route>
        <Route
          path="/product/:idParameter"
          element={<ProductDetail cart={cart} onClickAddToCart={addProductToCart} />}
        ></Route>
        <Route
          path="/cart"
          element={<Cart updateCart={updateCart} deleteItem={deleteItem} />}
        ></Route>
        <Route path="*" element={<Notfound />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
