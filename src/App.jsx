import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import ProductDetail from "./components/ProductDetail";
import { Route, Routes } from "react-router-dom";
import {  createContext, useEffect, useMemo, useState } from "react";
import Notfound from "./components/Notfound";
import {toast} from 'react-toastify'
import Login  from "./components/Login";
import Layout from "./Layout";
import SignUp from "./components/SignUp";
import axios from "axios";
import Loading from "./components/Loading";

export const userContext = createContext();

function App() {
  let [user,setUser] = useState();
  let [loading,setLoading] =useState(true);
  useEffect(()=>{
    let token=localStorage.getItem('token');
    if(token){
      axios.get("https://myeasykart.codeyogi.io/me",{
        headers:{
          Authorization:token,
        }
      }).then((response)=>{
        setUser(response.data);
        setLoading(false);
      })
    }
    else{
      setLoading(false);
    }
  },[])
 
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
  if(loading)return <Loading/>
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <userContext.Provider value={{user,setUser}}>
      <Routes>
        <Route path='/' element={<Layout totalCount={totalCount} />}>
          <Route path='' element={<Home/>}/>
          <Route path='product/:idParameter' element={<ProductDetail cart={cart} onClickAddToCart={addProductToCart}/> }/>
          <Route path="cart" element={<Cart updateCart={updateCart} deleteItem={deleteItem} />} />
        </Route>
        <Route path="*" element={<Notfound />}></Route>
        <Route path="login" element={<Login/>}></Route>
        <Route path="signup" element={<SignUp/>}></Route>
      </Routes>
      </userContext.Provider>
    </div>
  );
}

export default App;
