import React, { memo } from "react";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
import { FaRegStar, FaStar } from "react-icons/fa";
function Product({ imgsrc, category, title, price, id, rating }) {
  return (
    <Link
      to={`product/${id}`}
      className="flex flex-col gap-2 p-2 max-w-[300px] flex-grow  m-2 "
    >
      <img
        className=" w-[284px] aspect-square 100 object-cover"
        src={imgsrc}
      />
      <div className="flex flex-col gap-3 items-start grow">
        <p className="text-gray-500 ">{category.toUpperCase()}</p>
        <h2 className="font-bold text-lg text-gray-600 grow">{title}</h2>
        <p className="flex gap-1">
          {Array(rating)
            .fill(1)
            .map(() => (
              <FaStar key={nanoid()} className="text-darkorange-500 " />
            ))}
          {Array(5 - rating)
            .fill(1)
            .map(() => (
              <FaRegStar
                key={nanoid()}
                className="text-darkorange-500 "
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
