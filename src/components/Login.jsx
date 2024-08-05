import React from "react";
import { FiUser } from "react-icons/fi";
import { withFormik } from "formik";
import { MdOutlineWifiPassword ,MdEmail } from "react-icons/md";
import Input from "./Input";
import * as Yup from "yup";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios'
import WithUserHoc from "../Hoc/WithUserHoc";
import { toast } from "react-toastify";

const schema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required().min(8).max(20),
});

const onFormSubmit = (values,bag) => {
  const {setUser} =bag.props;
  axios.post("https://myeasykart.codeyogi.io/login",{
    email:values.email,
    password:values.password,
    }).then((response)=>{
    const {user,token} = response.data;
    setUser(user);
    localStorage.setItem('token',token)
  }).catch((error)=>{
    toast.error(error.response.data);
  })
};
export function Login({
  handleSubmit,
  handleBlur,
  handleChange,
  values,
  errors,
  touched,
  isValid,
  user
}) {
  if(user)return <Navigate to='/'/>
  return (
    <div className="grid place-items-center text-center h-screen bg-[linear-gradient(135deg,#fc2a2a,white,#fc2a2a)] ">
      <h2 className="font-bold text-4xl">Login to Next E-Store</h2>
      <div className="px-8 py-20 bg-[#fc2a2a] rounded-lg shadow-xl border-2 border-white">
      <form
        onSubmit={handleSubmit}
        className="flex gap-4  sm:w-80 flex-col"
      >
        <Input
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          touched={touched.email}
          error={errors.email}
          id="email"
          icon={<MdEmail  className="text-white m-2" />}
          name="email"
          placeholder="EMAIL"
          type="email"
        />
        <Input
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          touched={touched.password}
          error={errors.password}
          id="password"
          icon={<MdOutlineWifiPassword className="text-white m-2" />}
          placeholder="PASSWORD"
          name="password"
          type="password"
        />
        <button
          type="submit"
          disabled={!isValid}
          className="bg-white text-darkorange-500 p-3 font-bold rounded-sm shadow-lg disabled:bg-primary-100"
        >
          LOGIN
        </button>
      </form>
      </div>
      <p className="font-semibold text-lg">Dont't have an Account <Link className="underline text-xl italic" to='/signup'>SignUp</Link></p>
    </div>
  );
}

const EasyLogin = withFormik({
  validationSchema: schema,
  validateOnMount: true,
  handleSubmit: onFormSubmit,
});

export default WithUserHoc(EasyLogin(Login));
