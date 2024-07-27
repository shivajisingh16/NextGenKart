import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaRegStar, FaStar } from "react-icons/fa";
import { HiArrowSmLeft } from "react-icons/hi";
import Loading from "./Loading";
import { nanoid } from "nanoid";
import { getProductsId } from "../data/apiData";
import Notfound from "./Notfound";

function ProductDetail({ onClickAddToCart ,cart}) {
  let { idParameter } = useParams();
  let [product, setProduct] = useState();
  const [count, setCount] = useState(
    cart[idParameter] ? cart[idParameter].count : 0
  );
  useEffect(() => {
    setCount(cart[idParameter] ? cart[idParameter].count : 0);
  }, [idParameter]);
  useEffect(() => {
    let response = getProductsId(idParameter);
    response.then((res) => {
      setProduct(res);
    });
  }, [idParameter]);
  if (!product) return <Loading />;
  if (product.message) return <Notfound />;
  function handleOnClick(event) {
    if (event.target.innerHTML == "-" && count > 0) {
      setCount(count - 1);
    } else if (event.target.innerHTML == "+") {
      setCount(count + 1);
    }
  }
  return (
    <div className="flex flex-col md:flex-row max-w-6xl gap-8 shadow-lg p-8 bg-white mx-auto my-4 min-h-[70vh]">
      <Link to="/">
        <HiArrowSmLeft className="text-2xl hover:text-2xl hover:text-darkorange-500 w-10" />
      </Link>
      <img
        className="w-4/5 mx-auto md:w-1/2 object-cover self-center"
        src={product.thumbnail}
      />
      <div className="md:w-1/2 flex flex-col gap-6 relative">
        <h2 className="text-4xl text-gray-600 font-bold ">{product.title}</h2>
        <div className="flex gap-6 flex-wrap">
          <p className="font-semibold text-gray-700 text-2xl ">
            ${product.price}
          </p>
          <p className="flex gap-1 items-center">
            {Array(Math.floor(product.rating || 0))
              .fill(1)
              .map(() => (
                <FaStar
                  key={nanoid()}
                  className="text-darkorange-500 text-lg"
                />
              ))}
            {Array(5 - Math.floor(product.rating || 0))
              .fill(1)
              .map(() => (
                <FaRegStar
                  key={nanoid()}
                  className="text-darkorange-500 text-lg"
                />
              ))}
          </p>
        </div>
        <p className="text-gray-500 leading-loose sm:leading-10 text-center sm:text-start text-xl">
          {product.description}
        </p>
        <div className="flex gap-4 flex-wrap items-center">
          <button
            className="pb-1 bg-gray-500 text-white w-10 aspect-square rounded-full font-bold text-2xl hover:bg-black hover:scale-110"
            onClick={handleOnClick}
          >
            -
          </button>
          <input
            className="w-10 border border-gray-300 rounded-md py-1 px-2"
            type="text"
            value={count}
            readOnly
          />
          <button
            className="pb-1 bg-gray-500 w-10  text-white aspect-square rounded-full font-bold text-2xl hover:bg-black hover:scale-110"
            onClick={handleOnClick}
          >
            +
          </button>
          <button
            onClick={() => {
              onClickAddToCart(
                idParameter,
                count,
                product.thumbnail,
                product.title,
                product.price
              );
            }}
            className="hover:bg-darkorange-500 bg-primary-500  rounded-md font-semibold text-white px-8 py-1"
          >
            ADD TO CART
          </button>
        </div>
        <div className="flex items-end bottom-4 w-full justify-between px-5 mt-10 ">
          {idParameter > 1 ? (
            <Link
              className="hover:bg-darkorange-500 bg-primary-500 px-3 rounded-md py-1 text-white font-semibold"
              to={`/product/${+idParameter - 1}`}
            >
              Previous
            </Link>
          ) : (
            <div></div>
          )}
          <Link
            className="hover:bg-darkorange-500 bg-primary-500 px-3 rounded-md py-1 text-white font-semibold"
            to={`/product/${+idParameter + 1}`}
          >
            Next
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
