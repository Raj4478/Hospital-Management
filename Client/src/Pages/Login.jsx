import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const loggedin = () =>
    toast("🦄 Successfully Logged In", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      progress: undefined,
    });

  const navigate = useNavigate();

  const error1 = (einput) =>
    toast.error(einput, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  const onSubmit = async (data) => {
    let jsons = {
      email: data.Email,
      password: data.Password,
      AccountType: data.exampleRequired,
    };

    console.log(jsons.AccountType);

    console.log(typeof jsons.AccountType);

    try {
      const urls = "/api/v1/user/login";

      axios({ method: "post", url: urls, data: jsons })
        .then((res) => {
          console.log(res.data.message);
          loggedin();

          if(jsons.AccountType == "Manager"){
            navigate("/manager")
          }
          else{
            navigate("/pantry")
          }
         // 
        })
        .catch((err) => error1(err.message));
    } catch (error) {
      console.log(error.message);
      error1(error.message);
    }
  };

  return (
    <>
      <motion.div
        initial={{ x: -70 }}
        animate={{ x: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className=" min-[900px]:grid min-[900px]:grid-cols-2 bg-no-repeat bg-var3   h-screen"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid justify-center   max-[900px]:h-screen   items-center grid-flow-row"
        >
          <div className="grid grid-flow-row  p-16   py-40   ">
            <h3 className="font-great text-red-400 text-3xl">
              Hospital<span className="text-amber-400">Management</span>
            </h3>
            <h5 className="mt-3 text-red-400 font-mono text-lg">Log in.</h5>

            <p className="mt-3 text-red-400">
              Hello again. You've been missed, we're glad you're back.
            </p>
            <div className="grid grid-flow-row text-yellow-400  mt-6  ">
              <label htmlFor="UserName" className="font-new">
                Email
              </label>
              <input
                {...register("Email", {
                  required: true,
                  minLength: { value: 3, message: "Min Length is 3" },
                  maxLength: { value: 30, message: "Max value reached" },
                })}
                className=" border pl-1 border-black text-black bg-transparent backdrop-blur-xl  py-2 "
              />
              {errors.Email && (
                <div className="mt-2 font-semibold text-slate-600">
                  {errors.Email.message}
                </div>
              )}
            </div>

            <div className="grid grid-flow-row text-yellow-400 pt-8">
              <label htmlFor="Password" className="font-new">
                Password
              </label>
              <input
                type="password"
                {...register("Password", {
                  required: true,
                  minLength: { value: 8, message: "Min Length is 8" },
                  maxLength: { value: 20, message: "Max value reached" },
                })}
                className=" border pl-1  border-black py-2  text-black bg-transparent backdrop-blur-xl "
              />
              {errors.Password && (
                <div className="mt-2 font-semibold text-slate-600">
                  {errors.Password.message}
                </div>
              )}
            </div>

            <select
              className=" text-yellow-400 font-new py-2 my-3"
              id="selectmethod"
              defaultValue=""
              name="exampleRequired"
              {...register("exampleRequired", { required: true })}
            >
              <option value="" disabled>
                Account Type
              </option>
             
              <option value="Manager">Manager</option>
              <option value="Pantry">PantryStaff</option>
            </select>
            {errors.exampleRequired && (
              <span className="formError errorMssg">
                This field is required
              </span>
            )}

            <p className="mt-10 text-red-400 p-2">
              New here?{" "}
              <Link
                to="/signup"
                className="text-red-300 border-b border-white duration-500 hover:border-red-300"
              >
                Create an account
              </Link>
            </p>
            <input
              type="submit"
              className=" text-2xl font-new bg-red-300 text-white duration-500 rounded-md py-2  border"
            />
          </div>
        </form>
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="bg-pic2 border-4  bg-cover bg-no-repeat"
        ></motion.div>
      </motion.div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        theme="dark"
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Login;
