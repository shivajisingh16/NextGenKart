import React, { useEffect } from "react";
import CartRow from "./CartRow";
import { HiArrowSmLeft } from "react-icons/hi";
import { Link} from 'react-router-dom'
import { useState } from "react";
import { useMemo } from "react";
import EmptyCart from "./EmptyCart";
function Cart({updateCart,deleteItem}) {
  let cartData = localStorage.getItem("cart") || "{}";
  let storedCart =JSON.parse(cartData);
  let [changed,setChanged] =useState(false);
  let [cart,setCart] =useState(storedCart);
  useEffect(()=>{
    setCart(storedCart)
  },[cartData])
  let subTotal = useMemo(()=>{
    return Object.keys(cart).reduce((total,id)=>{
      return total+(cart[id].price * cart[id].count);
    },0)
  },[cart])
  
    if(Object.keys(cart).length==0){
      return <EmptyCart/>
    }


function handleCountChange(id,event){
  if(event.target.value>0){
  cart[id].count= +(event.target.value);
  setCart({...cart});
  setChanged(true);
  }
}
 
  return (
    <>
      <div className="md:w-[90vw] bg-white rounded-sm grow my-4 sm:p-8 sm:mx-auto flex gap-8 flex-col">
      <Link className="w-fit px-4 py-1 rounded-md font-semibold bg-primary-500 text-white ml-10 mt-5 "  to="/">
        Back
      </Link>
   
      <div className="w-fit lg:w-[80%] mx-auto border-0 sm:border border-gray-200 px-5 sm:px-0 max-h-[400px] overflow-y-scroll">
        <table className=" w-full">
          <thead className="hidden sm:table-header-group">
          <tr className="text-gray-700 font-semibold bg-gray-50">
            <th className="p-3">Product</th>
            <th className="px-5">Price</th>
            <th className="px-5">Quantity</th>
            <th className="px-5">Subtotal</th>
          </tr>
          </thead>
          
          <tbody>
          {Object.keys(cart).map((productId) => (
            <CartRow
              key ={productId}
              id={productId}
              title={cart[productId].title}
              img={cart[productId].img}
              price={cart[productId].price}
              count={cart[productId].count}
              totalPrice={cart[productId].price * cart[productId].count}
              deleteItem={deleteItem}
              handleCountChange={handleCountChange}
            />
          ))}
          </tbody>
        </table>
        </div>
        <div className="w-fit lg:w-[80%] sm:mt-[-33px]  mx-auto p-4 flex flex-col sm:flex-row justify-between  gap-3 items-end">
          <div className="flex gap-2">
            <input type="text" placeholder="Coupon Code" className="border border-gray-400 w-36 px-2 py-1 font-semibold rounded-md" />
            <button className="hover:bg-darkorange-500 bg-primary-500  rounded-md font-semibold text-white px-8 py-1">Apply Coupon</button>
          </div>
          <button disabled={!changed} onClick={()=>updateCart(setChanged,cart)} className="hover:bg-darkorange-500 bg-primary-500 disabled:bg-primary-100  rounded-md font-semibold text-white px-8 py-1 self-stretch sm:self-end">Update Cart</button>
        </div>
        <div className="w-[80%] sm:w-80 font-semibold text-gray-600  border border-gray-200 self-end mx-auto sm:mr-36">
          <h3 className="bg-gray-50 p-2 border-b border-gray-200 text-lg">Cart totals</h3>
          <p className="p-2 border-b  border-gray-200 mx-4"><span className="w-[40%] pr-4 inline-block">Subtotals</span>${subTotal.toFixed(2)}</p>
          <p className="p-2 border-b border-gray-200 mx-4"><span className="w-[40%] inline-block">Total</span>${subTotal.toFixed(2)}</p>
          <button className="hover:bg-darkorange-500 bg-primary-500  rounded-md font-semibold text-white px-8 py-2 w-[90%] mx-4 my-4">Proceed to Checkout</button>
        </div>
      </div>
    </>
  );
}

export default Cart;
