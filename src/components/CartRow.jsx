import React, { memo } from "react";
import { TiDeleteOutline } from "react-icons/ti";
function CartRow({
  id,
  title,
  price,
  count,
  totalPrice,
  img,
  deleteItem,
  handleCountChange,
}) {
  return (
    <>
      <tr className="shadow-xl border sm:shadow-none sm:text-center sm:border-t border-gray-200 space-y-3">
        <td className="flex items-center justify-evenly gap-5 p-2 sm:p-0">
          <button onClick={() => deleteItem(id)}>
            <TiDeleteOutline className="text-3xl text-gray-300 " />
          </button>
          <img className="w-16 my-1 aspect-square" src={img} alt="" />
          <h3 className="text-primary-500 font-semibold w-52">{title}</h3>
        </td>
        <td className='block sm:table-cell before:content-["_Price_:"] before:mx-10 before:text-black sm:before:content-[] sm:before:mx-0 text-gray-600 font-semibold'>
          ${price.toFixed(2)}
        </td>
        <td className='block sm:itable-cell  before:content-["_Input_:"] before:mx-10 sm:before:content-[] sm:before:mx-0'>
          <input
            onChange={() => handleCountChange(id, event)}
            type="number"
            value={count}
            className="inline-block w-20 text-gray-500 text-center p-1 border border-gray-300 rounded-md "
          />
        </td>
        <td className='block sm:table-cell text-gray-600 font-semibold before:content-["_Count_:"] before:mx-10 before:text-black sm:before:content-[] sm:before:mx-0 pb-5 sm:pb-0'>
          ${totalPrice.toFixed(2)}
        </td>
      </tr>
    </>
  );
}

export default memo(CartRow

);
