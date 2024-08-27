import React, { useEffect, useState } from "react";
import Product from "./Product";
import { Link, useSearchParams } from "react-router-dom";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Notfound from "./Notfound";
import { getProducts } from "../data/apiData";
import Loading from "./Loading";
function Home() {
 
  let [data,setData]= useState();
  let [skip, setSkip] = useState(1);
  
  let [searchParams,setSearchParams] = useSearchParams();
  
  let params = Object.fromEntries([...searchParams]);
  let {page,sort="default",search} = params;
  let [input, setInput] = useState(search||"");  
   page= +page || 1;
   useEffect(() => {
     let sortBy;
     let sortType;
    if(sort == "priceDescending"){
      sortBy = "price"
       sortType = "desc";
    }
    else if(sort == "priceAsscending"){
      sortBy= "price"
    }
    else if(sort=="title"){
      sortBy= "title"
    }
    let response = getProducts({sortBy,sortType,search,page});
    response.then((res) => {
      // setMeta(res.meta);
      setData(res);
    });
  }, [sort,search,page]);

  useEffect(()=>{
    let timer =setTimeout(()=>{
      setSearchParams({...params,search:input,page:1})
    },500)

    return (()=>clearTimeout(timer))
  },[input])
  if (!data) return <Loading />;
  function handleOnSelect(e) {
    setSearchParams({...params,sort:e.target.value});
  }

  function handleOnChange(e) {
    setInput(e.target.value.trim());
  }


  function handlePrevious() {
   
    setSkip(skip - 3);
  }
  function handleAhead() {
    
    setSkip(skip + 3);
  }

  return (
    <div className="bg-white xl:max-w-[75vw] xl:mx-auto p-6  my-5">
      <div className="flex flex-col gap-2 sm:flex-row justify-around ">
        <input
          className="w-[80%] mx-auto sm:w-fit rounded-xl border-2 border-primary-500 px-3 py-1 focus:outline-none"
          type="text"
          placeholder="Filter By Search"
          value={input}
          onChange={handleOnChange}
        />

        <select
          onChange={handleOnSelect}
          value={sort}
          className="w-[80%] mx-auto sm:w-fit rounded-xl border-2 border-primary-500 px-3 py-1 bg-white"
          name="sorting"
          id="sort"
        >
          <option value="default">Default Sort</option>
          <option value="title">Sort by Title</option>
          <option value="priceAsscending">Sort by Price : Low to High</option>
          <option value="priceDescending">Sort by Price : High to Low</option>
        </select>
      </div>
      {data.data.length == 0 ? (
        <Notfound />
      ) : (
        <>
          <div className="flex flex-wrap p-2 justify-center ">
            {data.data.map((product) => {
              return (
                <Product
                  key={product.id}
                  imgsrc="https://cdn.dummyjson.com/products/images/furniture/Knoll%20Saarinen%20Executive%20Conference%20Chair/thumbnail.png"
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
            {skip>3 && <button
              onClick={handlePrevious}
              className="px-4 py-3 inline-block active:bg-primary-500 active:text-white  border border-primary-700 text-primary-500  font-semibold"
            >
              <FaArrowLeft />
            </button>}
         
           {Array(3).fill(1).map((item,idx)=>{
            return (skip+idx)<=data.meta.last_page && (  <Link
            key={idx}
              to={`?${new URLSearchParams({...params,page:skip+idx})}`}
            className={`px-4 py-2 inline-block border active:bg-black   border-primary-700  font-semibold  ${(page===(skip+idx))?"bg-primary-500 text-white":"bg-white text-primary-500"}`}
          >
            {skip+idx}
          </Link>
            )
           })}

            {data.meta.last_page>skip+2 && <button
              onClick={handleAhead}
              className="px-4 py-3 inline-block  border active:bg-primary-500 active:text-white  border-primary-700 text-primary-500  font-semibold"
            >
              <FaArrowRight />
            </button>}
          </div>
        </>
      )}
    </div>
  );
}

export default Home
