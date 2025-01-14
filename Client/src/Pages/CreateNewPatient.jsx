import React from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const NewPatient = () => {
  const [image, useImage] = useState();

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

  const onSubmit = async (data) => {
    var jsons = {
      patientName: data.patientName,
      disease: data.disease,
      allergies: data.allergies,
      floorNumber: data.floorNumber,
      bloodGroup: data.bloodGroup,
      gender: data.gender,
      patientimage: image,
      roomNumber: data.roomNumber,
      bedNumber: data.bedNumber,
      age: data.age,
      contactInformation: data.contactInformation,
      emergencyContact: data.emergencyContact,
    };

    console.log(jsons);

    try {
      const urls = "api/v1/user/patientDetail";

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
            <h5 className="mt-3  font-mono text-lg text-red-300">
              Fill the Form to create new Patient Profile
            </h5>

            <div className="grid grid-flow-row w-5/5 text-black  mt-6  ">
              <label htmlFor="patientName" className="font-new text-sky-500">
                Name
              </label>
              <input
                {...register("patientName", {
                  required: true,
                  minLength: {
                    value: 3,
                    message: "Please enter a vaild Username",
                  },
                  maxLength: {
                    value: 30,
                    message: "Please enter a valid username",
                  },
                })}
                className=" border pl-1 text-black bg-transparent backdrop-blur-xl border-black  py-2 "
              />
              {errors.Name && (
                <div className="mt-2 font-semibold text-slate-600">
                  {errors.Name.message}
                </div>
              )}
            </div>
            <div className="grid grid-flow-row w-5/5 mt-6  ">
              <label htmlFor="disease" className="font-new text-sky-500">
                Disease
              </label>
              <input
                {...register("disease", {
                  required: true,
                  minLength: { value: 3, message: "Min Length is 3" },
                  maxLength: { value: 30, message: "Max value reached" },
                })}
                className=" border pl-1 border-black text-black bg-transparent backdrop-blur-xl py-2 "
              />
              {errors.Name && (
                <div className="mt-2 font-semibold text-slate-600">
                  {errors.Name.message}
                </div>
              )}
            </div>
            <div className="grid grid-flow-row w-5/5 mt-6  ">
              <label htmlFor="allergies" className="font-new text-sky-500">
                Allergies
              </label>
              <input
                {...register("allergies", {
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

            <select
              className=" text-sky-400 font-new py-2 my-3"
              id="selectmethod"
              defaultValue=""
              name="gender"
              {...register("gender", { required: true })}
            >
              <option value="" disabled>
                Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Prefer not to say</option>
            </select>
            {errors.exampleRequired && (
              <span className="formError errorMssg">
                This field is required
              </span>
            )}

            <div className="grid grid-flow-row w-5/5 pt-8">
              <label htmlFor="bloodGroup" className="font-new text-sky-500">
                BloodGroup
              </label>
              <input
                {...register("bloodGroup", {
                  required: true,
                  minLength: { value: 1, message: "Min Length is 1" },
                  maxLength: { value: 3, message: "Max value reached" },
                })}
                className=" border pl-1 text-black  border-black py-2 bg-transparent backdrop-blur-xl"
              />
              {errors.Password && (
                <div className="mt-2 font-semibold text-slate-600">
                  {errors.Password.message}
                </div>
              )}
            </div>

            <div className="grid grid-flow-row w-5/5 pt-8">
              <label htmlFor="roomNumber" className="font-new text-sky-500">
                RoomNumber
              </label>
              <input
                {...register("roomNumber", {
                  required: true,
                  minLength: { value: 1, message: "Min Length is 8" },
                  maxLength: { value: 20, message: "Max value reached" },
                })}
                className=" border pl-1 text-black  border-black py-2 bg-transparent backdrop-blur-xl"
              />
              {errors.Password && (
                <div className="mt-2 font-semibold text-slate-600">
                  {errors.Password.message}
                </div>
              )}
            </div>

            <div className="grid grid-flow-row w-5/5 pt-8">
              <label htmlFor="floorNumber" className="font-new text-sky-500">
                FloorNumber
              </label>
              <input
                {...register("floorNumber", {
                  required: true,
                  minLength: { value: 1, message: "Min Length is 8" },
                  maxLength: { value: 20, message: "Max value reached" },
                })}
                className=" border pl-1 text-black  border-black py-2 bg-transparent backdrop-blur-xl"
              />
              {errors.Password && (
                <div className="mt-2 font-semibold text-slate-600">
                  {errors.Password.message}
                </div>
              )}
            </div>

            <div className="grid grid-flow-row w-5/5 pt-8">
              <label htmlFor="bedNumber" className="font-new text-sky-500">
                BedNumber
              </label>
              <input
                {...register("bedNumber", {
                  required: true,
                  minLength: { value: 1, message: "Min Length is 8" },
                  maxLength: { value: 20, message: "Max value reached" },
                })}
                className=" border pl-1 text-black  border-black py-2 bg-transparent backdrop-blur-xl"
              />
              {errors.Password && (
                <div className="mt-2 font-semibold text-slate-600">
                  {errors.Password.message}
                </div>
              )}
            </div>

            <div className="grid grid-flow-row w-5/5 pt-8">
              <label htmlFor="age" className="font-new text-sky-500">
                Age
              </label>
              <input
                {...register("age", {
                  required: true,
                  minLength: { value: 1, message: "Min Length is 8" },
                  maxLength: { value: 20, message: "Max value reached" },
                })}
                className=" border pl-1 text-black  border-black py-2 bg-transparent backdrop-blur-xl"
              />
              {errors.Password && (
                <div className="mt-2 font-semibold text-slate-600">
                  {errors.Password.message}
                </div>
              )}
            </div>

            <div className="grid grid-flow-row w-5/5 pt-8">
              <label
                htmlFor="contactInformation"
                className="font-new text-sky-500"
              >
                ContactInformation
              </label>
              <input
                {...register("contactInformation", {
                  required: true,
                  minLength: { value: 1, message: "Min Length is 8" },
                  maxLength: { value: 50, message: "Max value reached" },
                })}
                className=" border pl-1 text-black  border-black py-2 bg-transparent backdrop-blur-xl"
              />
              {errors.Password && (
                <div className="mt-2 font-semibold text-slate-600">
                  {errors.Password.message}
                </div>
              )}
            </div>

            <div className="grid grid-flow-row w-5/5 pt-8">
              <label
                htmlFor="emergencyContact"
                className="font-new text-sky-500"
              >
                EmergencyContact
              </label>
              <input
                {...register("emergencyContact", {
                  required: true,
                  minLength: { value: 1, message: "Min Length is 8" },
                  maxLength: { value: 50, message: "Max value reached" },
                })}
                className=" border pl-1 text-black  border-black py-2 bg-transparent backdrop-blur-xl"
              />
              {errors.emergencyContact && (
                <div className="mt-2 font-semibold text-slate-600">
                  {errors.emergencyContact.message}
                </div>
              )}
            </div>

            <div className="mt-4 text-sky-500">
              <label htmlFor="Upload" className="font-new">
                Profile Image
              </label>
              <input
                type="file"
                name="Upload"
                onChange={(e) => useImage(e.target.files[0])}
              />
            </div>

            <p className="mt-10 p-2 text-sky-500">
              Already have an Account?{" "}
              <Link
                to="/login"
                className="text-red-300 border-b border-white duration-500 hover:border-red-300"
              >
                Log In
              </Link>
            </p>
            <input
              type="submit"
              value="Create Account"
              className=" text-2xl font-new text-red-300  duration-500 hover:text-white hover:bg-red-300 rounded-md py-2  border"
            />
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

export default NewPatient;
