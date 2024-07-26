import React, { memo } from "react";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
import { FaRegStar, FaStar } from "react-icons/fa";
function Product({ imgsrc, category, title, price, id, rating }) {
  return (
    <Link
      to={`product/${id}`}
      className="flex flex-col gap-2 p-2 max-w-[300px] flex-grow"
    >
      <img
        className=" w-[284px] aspect-square bg-gray-200 object-cover"
        src={imgsrc}
      />
      <div className="flex flex-col gap-3 items-start">
        <p className="text-gray-500 ">{category}</p>
        <h2 className="font-bold text-xl text-gray-600 grow">{title}</h2>
        <p className="flex gap-1">
          {Array(rating)
            .fill(1)
            .map(() => (
              <FaStar key={nanoid()} className="text-darkorange-500 text-lg" />
            ))}
          {Array(5 - rating)
            .fill(1)
            .map(() => (
              <FaRegStar
                key={nanoid()}
                className="text-darkorange-500 text-lg"
              />
            ))}
        </p>
        <div className="flex justify-between w-full pr-2">
          <p className="text-gray-500 text-lg font-semibold">${price}</p>
        </div>
      </div>
    </Link>
  );
}

export default memo(Product);
