import React from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CreateFoodChart = () => {
  const [image1, useImage1] = useState();
  const [image2, useImage2] = useState();
  const [image3, useImage3] = useState();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({ defaultValues: { AccountType: ["Doctor"] } });

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
      morning:data.morning,
      evening:data.evening,
      nightMeal:data.night,
      morningIngriends:data.morningIngredients,
      eveningIngriends:data.eveningIngredients,
      nightIngriends:data.nightIngredients,
      coverImage1:image1,
      coverImage2:image2,
      coverImage3:image3,
      specialInstructions:data.specialInstructions


    };
    console.log(data);
    

    console.log(jsons);

    try {
      const urls = "api/v1/user/foodchartmenu";

      console.log("inside onsubmit");
      
      console.log(data);
      console.log(image1);

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
              Fill in Today's Menu
            </h4>
              <h3 className="font-new text-amber-500 text-center mt-6 text-2xl ">
                Morning Schedule
              </h3>
            <div className="grid grid-flow-row w-5/5 text-black  mt-6  ">
              <label htmlFor="morning" className="font-new text-sky-500">
                Dish Name
              </label>
              <input
                {...register("morning", {
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
              {errors.morning && (
                <div className="mt-2 font-semibold text-slate-600">
                  {errors.morning.message}
                </div>
              )}
            </div>
            <div className="grid grid-flow-row w-5/5 mt-6  ">
              <label htmlFor="morningIngredients" className="font-new text-sky-500">
                Ingrediends Used :
              </label>
              <input
                {...register("morningIngredients", {
                  required: true,
                  minLength: { value: 3, message: "Min Length is 3" },
                  maxLength: { value: 30, message: "Max value reached" },
                })}
                className=" border pl-1 border-black text-black bg-transparent backdrop-blur-xl py-2 "
              />
              {errors.morningIngredients && (
                <div className="mt-2 font-semibold text-slate-600">
                  {errors.morningIngredients.message}
                </div>
              )}
            </div>

            <div className="mt-4 text-sky-500">
              <label htmlFor="morningImage" className="font-new">
                Dish Image
              </label>
              <input
                type="file"
                name="morningImage"
                onChange={(e) => useImage1(e.target.files[0])}
              />
            </div>
            
            <h3 className="font-new text-amber-500 text-center mt-6 text-2xl ">
                Evening Schedule
            </h3>
            <div className="grid grid-flow-row w-5/5 mt-6  ">
              <label htmlFor="evening" className="font-new text-sky-500">
                Dish Name
              </label>
              <input
                {...register("evening", {
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

       

            <div className="grid grid-flow-row w-5/5 pt-8">
              <label htmlFor="eveningIngredints" className="font-new text-sky-500">
                Ingredients Used
              </label>
              <input
                {...register("eveningIngredients", {
                  required: true,
                  minLength: { value: 1, message: "Min Length is 1" },
                  maxLength: { value: 40, message: "Max value reached" },
                })}
                className=" border pl-1 text-black  border-black py-2 bg-transparent backdrop-blur-xl"
              />
              {errors.eveningIngredients && (
                <div className="mt-2 font-semibold text-slate-600">
                  {errors.eveningIngredients.message}
                </div>
              )}
            </div>

            <div className="mt-4 text-sky-500">
              <label htmlFor="eveningImage" className="font-new">
                Dish Image
              </label>
              <input
                type="file"
                name="eveningImage"
                onChange={(e) => useImage2(e.target.files[0])}
              />
            </div>

            <h3 className="font-new text-amber-500 text-center mt-6 text-2xl ">
                Night Schedule
            </h3>

            <div className="grid grid-flow-row w-5/5 text-black  mt-6  ">
              <label htmlFor="night" className="font-new text-sky-500">
                Dish Name
              </label>
              <input
                {...register("night", {
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
              {errors.night && (
                <div className="mt-2 font-semibold text-slate-600">
                  {errors.night.message}
                </div>
              )}
            </div>
            <div className="grid grid-flow-row w-5/5 mt-6  ">
              <label htmlFor="nightIngredients" className="font-new text-sky-500">
                Ingrediends Used :
              </label>
              <input
                {...register("nightIngredients", {
                  required: true,
                  minLength: { value: 3, message: "Min Length is 3" },
                  maxLength: { value: 30, message: "Max value reached" },
                })}
                className=" border pl-1 border-black text-black bg-transparent backdrop-blur-xl py-2 "
              />
              {errors.nightIngredients && (
                <div className="mt-2 font-semibold text-slate-600">
                  {errors.nightIngredients.message}
                </div>
              )}
            </div>

            <div className="mt-4 text-sky-500">
              <label htmlFor="nightImage" className="font-new">
                Dish Image
              </label>
              <input
                type="file"
                name="nightImage"
                onChange={(e) => useImage3(e.target.files[0])}
              />
            </div>

            <div className="grid grid-flow-row w-5/5 mt-6  ">
              <label htmlFor="specialInstructions" className="font-new text-sky-500">
                Special Instructions
              </label>
              <input
                {...register("specialInstructions", {
                  required: true,
                  minLength: { value: 3, message: "Min Length is 3" },
                  maxLength: { value: 30, message: "Max value reached" },
                })}
                className=" border pl-1 border-black text-black bg-transparent backdrop-blur-xl py-2 "
              />
              {errors.specialInstructions && (
                <div className="mt-2 font-semibold text-slate-600">
                  {errors.specialInstructions.message}
                </div>
              )}
            </div>
           
            <input
              type="submit"
              value="Submit Menu"
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

export default CreateFoodChart;
