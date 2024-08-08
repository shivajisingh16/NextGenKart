import React, { useEffect, useMemo, useState } from "react";
import Product from "./Product";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Notfound from "./Notfound";
import { getProducts } from "../data/apiData";
import Loading from "./Loading";
function Home() {
 
  let [productData, setProductData] = useState();
  let [data,setData]= useState();
  let [type, setType] = useState("default");
  let [input, setInput] = useState("");
  let [page, setPage] = useState(1);
  let [skip, setSkip] = useState(1);
  
  useEffect(() => {
    let response = getProducts(skip - 1);
    response.then((res) => {
      setProductData(res);
      setData(res.products);
    });
  }, [skip]);
  let total= useMemo(()=>{
    if(!productData)return
    return productData.total/30;
  },[productData])
  useEffect(()=>{
    if(!productData)return
    setData(productData.products.filter((product) => {
      return product.title.toLowerCase().indexOf(input.toLowerCase()) != -1;
    }));
  },[input]);
  
  useEffect(()=>{
    if(!productData)return
    let sortedData=[...data];
    if (type === "title") {
      sortedData.sort((a, b) => {
        if (a.title > b.title) return 1;
        else return -1;
      });
    } 
    else if (type === "priceAsscending") {
      sortedData.sort((a, b) => {
        return +a.price - +b.price;
      });
    } 
    else if (type === "priceDescending") {
      sortedData.sort((a, b) => {
        return +b.price - +a.price;
      });
    }
    else{
      sortedData=productData.products.filter((product)=>{
        return product.title.toLowerCase().indexOf(input.toLowerCase())!=-1;
      })
    }
    setData(sortedData);
  },[type]);
  
  if (!productData) return <Loading />;
  function handleOnSelect(e) {
    setType(e.target.value);
  }

  function handleOnChange(e) {
    setInput(e.target.value.trim());
  }
  function handlePrevious() {
    if (page <= 1) return;
    setPage(page - 3);
  }
  function handleAhead() {
    if (page >= total-4) return;
    setPage(page + 3);
  }
  function changePage(event) {
    setSkip(event.target.innerHTML);
  }
  return (
    <div className="bg-white xl:max-w-[75vw] xl:mx-auto p-6  my-5">
      <div className="flex flex-col gap-2 sm:flex-row justify-around ">
        <input
          className="w-[80%] mx-auto sm:w-fit rounded-full border-2 border-primary-500 px-3 py-1 focus:outline-none"
          type="text"
          placeholder="Filter By Search"
          value={input}
          onChange={handleOnChange}
        />

        <select
          onChange={handleOnSelect}
          value={type}
          className="w-[80%] mx-auto sm:w-fit rounded-full border-2 border-primary-500 px-3 py-1 bg-white"
          name="sorting"
          id="sort"
        >
          <option value="default">Default Sort</option>
          <option value="title">Sort by Title</option>
          <option value="priceAsscending">Sort by Price : Low to High</option>
          <option value="priceDescending">Sort by Price : High to Low</option>
        </select>
      </div>
      {data.length == 0 ? (
        <Notfound />
      ) : (
        <>
          <div className="flex flex-wrap p-2 justify-center ">
            {data.map((product) => {
              return (
                <Product
                  key={product.id}
                  imgsrc={product.thumbnail}
                  category={product.category}
                  title={product.title}
                  price={product.price}
                  id={product.id}
                  rating={Math.floor(product.rating)}
                />
              );
            })}
          </div>
          <div className="flex gap-1 mx-[8vw] mt-6">
            <button
              onClick={handlePrevious}
              className="px-4 py-3 inline-block active:bg-primary-500 active:text-white  border border-primary-700 text-primary-500  font-semibold"
            >
              <FaArrowLeft />
            </button>
            <button
              onClick={changePage}
              className="px-4 py-2 inline-block border hover:bg-primary-500 hover:text-white active:bg-black   border-primary-700 text-primary-500 font-semibold"
            >
              {page}
            </button>
            <button
              onClick={changePage}
              className="px-4 py-2 inline-block border  hover:bg-primary-500  hover:text-white active:bg-black  border-primary-700 text-primary-500 font-semibold"
            >
              {page + 1}
            </button>
            <button
              onClick={changePage}
              className="px-4 py-2 inline-block border hover:bg-primary-500 hover:text-white active:bg-black  border-primary-700 text-primary-500 font-semibold"
            >
              {page + 2}
            </button>
            <button
              onClick={handleAhead}
              className="px-4 py-3 inline-block  border active:bg-primary-500 active:text-white  border-primary-700 text-primary-500  font-semibold"
            >
              <FaArrowRight />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Home
