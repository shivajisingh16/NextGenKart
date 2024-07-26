import React ,{memo} from 'react'
import { TbLoader3 } from "react-icons/tb";
function Loading() {
  return (
       <TbLoader3 className='text-center w-full text-8xl text-darkorange-500 animate-spin duration-75'/>
  )
}

export default memo(Loading)