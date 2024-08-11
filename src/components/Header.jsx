import React, { memo } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import WithUserHoc from "../Hoc/WithUserHoc";
function Header({ totalCount ,user,setUser}) {
  function logout(){
    localStorage.removeItem('token');
    setUser(undefined);
    //api calling left
  }
  return (
    <div className="flex justify-between px-4 sm:px-10 md:px-16 items-center bg-white w-full py-3 fixed top-0 z-10">
      <img
        className="h-11 "
        src="https://www.shutterstock.com/image-vector/amazon-initial-logo-isolated-white-600nw-2272856739.jpg"
        alt=""
      />
      <div className="relative flex items-center gap-3">
        <Link to="/cart">
          <HiOutlineShoppingBag className="text-5xl md:mr-20 md:text-6xl" />
          {totalCount>0 &&<p className="bg-primary-500 h-5 md:h-6 text-center aspect-square  text-white font-semibold absolute top-7 left-4 md:pb-1 rounded-full md:top-7 md:left-5 text-sm md:text-md ">
            {totalCount}
          </p>}
        </Link>
        <div className="flex flex-col gap-1 items-center">
          <div className="flex items-center gap-2 ">
            <CgProfile className="font-bold text-darkorange-500 text-3xl rounded-full" />
            <p className="font-bold text-xl">
              Hi{" "}
              <span className="text-darkorange-500 text-lg font-semibold">
                {user.full_name.charAt(0).toUpperCase()+user.full_name.slice(1)}
              </span>
            </p>
          </div>
          <button onClick={logout} className="hover:bg-darkorange-500 bg-gray-400  font-semibold text-white py-1 px-4 rounded-xl" >Logout</button>
        </div>
      </div>
    </div>
  );
}

export default WithUserHoc(Header);

