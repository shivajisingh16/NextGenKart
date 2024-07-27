import React from "react";
import { FiUser } from "react-icons/fi";
import { withFormik } from "formik";
import { MdOutlineWifiPassword ,MdEmail } from "react-icons/md";
import Input from "./Input";
import * as Yup from "yup";

const schema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required().min(3).max(8),
});

const onFormSubmit = (values) => {
  console.log(values.username, values.password);
};

export function Login({
  handleSubmit,
  handleBlur,
  handleChange,
  values,
  errors,
  touched,
  isValid,
}) {
  return (
    <div className="grid place-items-center text-center h-screen bg-[linear-gradient(135deg,#fc2a2a,white,#fc2a2a)] ">
      <h2 className="font-bold text-4xl">Login to Next E-Store</h2>
      <div className="w-80 sm:w-96 h-[350px] bg-[#fc2a2a] rounded-lg shadow-xl border-2 border-white"></div>
      <form
        onSubmit={handleSubmit}
        className="flex gap-4  sm:w-80 flex-col absolute z-10"
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
      <p className="font-semibold text-lg">Dont't have an Account SignUp</p>
    </div>
  );
}

export default withFormik({
  validationSchema: schema,
  validateOnMount: true,
  handleSubmit: onFormSubmit,
})(Login);
