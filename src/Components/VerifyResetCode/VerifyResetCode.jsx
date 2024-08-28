import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Loading from "../Loading/Loading";
export default function VerifyResetCode() {
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function handelResetCode(values) {
    console.log(values);

    try {
      setLoading(true);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      );
      if (data.status == "Success") {
        navigate("/resetPassword");
      }
    } catch (err) {
      setLoading(false);
      setApiError(err.response.data.message);
      console.log(err);
    }
  }
  let validationSchema = Yup.object().shape({
    resetCode: Yup.string().required(),
  });
  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: handelResetCode,
  });
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="mx-auto md:w-1/2 py-12 px-6 shadow-css  rounded-lg mt-4">
          <h1 className="text-3xl md:text-4xl pb-2 font-semibold text-center text-green-500">
            Reset Code{" "}
          </h1>
          <form onSubmit={formik.handleSubmit}>
            {apiError && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {apiError}
              </div>
            )}
            <div className="relative z-0 w-full mb-5 group">
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.resetCode}
                type="text"
                name="resetCode"
                id="resetCode"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="resetCode"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter Your resetCode
              </label>
            </div>
            {formik.errors.resetCode && formik.touched.resetCode && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.resetCode}
              </div>
            )}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="text-white tr3 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Verity code
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
