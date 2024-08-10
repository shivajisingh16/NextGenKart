import { FaInfoCircle } from "react-icons/fa";
import React from 'react'

function Input({icon,error,touched,name,id,placeholder,value,...rest}) {

  return (
    <>
    <div className='border-2 border-white  flex items-center gap-4 rounded-sm  '>
        {icon}
        <label className='sr-only' htmlFor={id}>{placeholder}</label>
       <input  {...rest} value={value||""}  name={name} className=' grow h-10 bg-transparent placeholder:text-white font-semibold placeholder:text-sm placeholder:font-normal focus:outline-none text-white ' id={id}  placeholder={placeholder}/>
    </div>
    {touched&&error&&<p className='text-sm text-yellow-100 flex items-center gap-2'><FaInfoCircle />{error}</p>}
    </>
  )
}

export default Input