import React from 'react'
import { FiUser} from "react-icons/fi";
import { withFormik} from 'formik';
import Input from './Input';
import * as Yup from 'yup'

const schema = Yup.object({
  username:Yup.string().email().required(),
  password:Yup.string().required().min(3).max(8)
})

const onFormSubmit=(values)=>{
  console.log(values.username,values.password);
}

export function Login({handleSubmit,handleBlur,handleChange,values,errors,touched,isValid}) {

  return (
    <div className="grid place-items-center h-screen bg-indigo-600 ">
    <div className='w-[350px] h-[350px] bg-white/10 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg'></div>
    <form onSubmit={handleSubmit} className="flex gap-4 w-[280px] flex-col absolute z-10">
   <Input onChange={handleChange} onBlur={handleBlur} value={values.username} touched={touched.username} error={errors.username} id="username" icon={<FiUser className='text-white m-2'/>} name="username" placeholder="USERNAME" type="text"/>
   <Input onChange={handleChange} onBlur={handleBlur} value={values.password} touched={touched.password} error={errors.password} id="password" icon={<FiUser className='text-white m-2'/>}  placeholder="PASSWORD" name="password" type="password"/>
   <button type="submit" disabled={!isValid} className='bg-white text-indigo-500 p-3 font-bold rounded-sm outline-double disabled:text-indigo-200'>LOGIN</button>
    </form>
    </div>
  )
}

export default withFormik({
    validationSchema:schema,
    validateOnMount:true,
    handleSubmit:onFormSubmit,
})(Login);