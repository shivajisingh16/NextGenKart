import React,{memo} from 'react'
import { Link } from 'react-router-dom'
function EmptyCart() {
  return (<div className='flex flex-col items-center gap-10 my-10'>
    <div className='px-10 py-10 bg-white rounded-xl shadow-lg max-w-[80vw] mx-auto border border-darkorange-500 text-2xl font-semibold'>Cart is Empty!</div>
    <Link className="hover:bg-darkorange-500 bg-primary-500 px-3 rounded-md py-1 text-white font-semibold" to={"/"}>Do Shopping</Link>
    </div>
  )
} 

export default memo(EmptyCart) 