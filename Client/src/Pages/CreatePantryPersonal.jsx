import React from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


const CreatePantryStaff = () => {
  const [image, useImage] = useState();
  

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const loggedin = () =>
    toast("🦄 You have Successfully Signed Up", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      progress: undefined,
    });

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

  const onSubmit = async(data) => {
    var jsons = {
    name :data.name,
    deliveryStatus :"available",
    contactInfo : data.contactinfo,
    pantrypersonal:image
    };
    console.log(data);
    

    console.log(jsons);

    try {
      const urls = "api/v1/user/pantry";

      
      
      console.log(data);
      console.log(image);

      const formdata = new FormData();
      formdata.append("coverImage", jsons);

      axios({
        method: "post",
        url: urls,
        data: jsons,
        headers: {
          "content-Type": "multipart/form-data",
        },
      })
        .then((res) => console.log(res.data.message))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error.message);
      error1(error.message);
    }
    setTimeout(() => {
      // navigate("/login")
    }, 4000);
  };

  return (
    <>
      <motion.div
        initial={{ x: -70 }}
        animate={{ x: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="  max-[900px]:  h-screen "
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" justify-center  bg bg-var3   max-[900px]:w-screen   text-black items-center grid-flow-row"
        >
            
          <div className="  p-16  grid grid-flow-row justify-center py-40    ">
            <h3 className="font-great text-red-400 text-3xl">
              Hospital <span className="text-amber-400">Management</span>
            </h3>
            <h4 className="mt-3  font-mono text-lg text-red-300">
              Please Enter the Staff Details Here
            </h4>
             
            <div className="grid grid-flow-row w-5/5 text-black  mt-6  ">
              <label htmlFor="name" className="font-new text-sky-500">
                Name
              </label>
              <input
                {...register("name", {
                  required: true,
                  minLength: {
                    value: 3,
                    message: "Please enter a vaild Dish",
                  },
                  maxLength: {
                    value: 30,
                    message: "Please enter a valid Dish",
                  },
                })}
                className=" border pl-1 text-black bg-transparent backdrop-blur-xl border-black  py-2 "
              />
              {errors.name && (
                <div className="mt-2 font-semibold text-slate-600">
                  {errors.name.message}
                </div>
              )}
            </div>
            <div className="grid grid-flow-row w-5/5 mt-6  ">
              <label htmlFor="contactinfo" className="font-new text-sky-500">
                Contact Info
              </label>
              <input
                {...register("contactinfo", {
                  required: true,
                  minLength: { value: 3, message: "Min Length is 3" },
                  maxLength: { value: 30, message: "Max value reached" },
                })}
                className=" border pl-1 border-black text-black bg-transparent backdrop-blur-xl py-2 "
              />
              {errors.contactinfo && (
                <div className="mt-2 font-semibold text-slate-600">
                  {errors.contactinfo.message}
                </div>
              )}
            </div>

            
           
            <div className="grid grid-flow-row w-5/5 mt-6  ">
              <label htmlFor="deliveryStatus" className="font-new text-sky-500">
                Delivery Status
              </label>
              <input
                {...register("deliveryStatus", {
                  required: true,
                  minLength: { value: 3, message: "Min Length is 3" },
                  maxLength: { value: 30, message: "Max value reached" },
                })}
                className=" border pl-1 border-black text-black bg-transparent backdrop-blur-xl  py-2 "
              />
              {errors.evening && (
                <div className="mt-2 font-semibold text-slate-600">
                  {errors.evening.message}
                </div>
              )}
            </div>

       



            <div className="mt-4 text-sky-500">
              <label htmlFor="pantrypersonal" className="font-new">
                Image
              </label>
              <input
                type="file"
                name="pantrypersonal"
                onChange={(e) => useImage(e.target.files[0])}
              />
            </div>

            
           
            <input
              type="submit"
              value="Submit Data"
              className=" text-2xl font-new text-red-300 mt-6 duration-500 hover:text-white hover:bg-red-300 rounded-md py-2  border"
            />
            {console.log("inside submit formdata")
            }
         </div>
        </form>
      </motion.div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default CreatePantryStaff;
