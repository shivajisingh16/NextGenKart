import React, { memo } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Link } from "react-router-dom";
function Header({ totalCount }) {
  return (
    <div className="flex justify-between px-6 items-center bg-white w-full py-3 fixed top-0 z-10">
      <img
        className="h-11 ml-[12vw]"
        src="https://www.shutterstock.com/image-vector/amazon-initial-logo-isolated-white-600nw-2272856739.jpg"
        alt=""
      />
      <div className="relative">
        <Link to="/cart">
          <HiOutlineShoppingBag className="text-4xl md:mr-20 md:text-6xl" />
          <p className="bg-primary-500 h-5 md:h-6 text-center aspect-square  text-white font-semibold absolute top-3 left-2 md:pb-1 rounded-full md:top-7 md:left-5 text-sm md:text-md ">
            {totalCount}
          </p>
        </Link>
      </div>
    </div>
  );
}

export default memo(Header);
