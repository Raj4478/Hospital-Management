import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const FoodMenu = () => {
  const [apiData, setApiData] = useState(null);


  const styleContainer = {
    position: "relative",
    width: 50,
    height: 50
  };
  
  const styleSpan = {
    display: "block",
    width: 50,
    height: 50,
  
    border: "7px solid #eee",
    borderTop: "7px solid #2D3134",
    borderRadius: "50%",
    boxSizing: "border-box",
    position: "absolute",
    top: "",
    left: "50vw",
    justifyContent:"center"
  };
  
  const spinTransition = {
    repeat: Infinity,
    ease: "easeInOut",
    // width: ['100%', '50%'],
    duration: 1
  };

  const navigate = useNavigate() 
    const chart = async () => {
    const urls = "/api/v1/user/menu";
    try {
      const fields = await fetch(urls);
      const data = await fields.json();

      console.log(data);

      setApiData(data);
    } catch (error) {
      console.log("Api Error", error);
    }
  };

  useEffect(() => {
    chart();
  }, []);

  return apiData ? (
    <>
      <h2 className="text-center font-new text-3xl">Today's Menu</h2>

      <div className=" flex justify-center ">
        <button className="border p-2 font-new text-sky-300 mt-4 rounded-md hover:bg-sky-300 hover:text-white duration-500" onClick={(()=>{navigate("/createfoodchart")})}>
          Create Menu
        </button>
      </div>
      <div className="border-b mt-8 text-center">
        <h3 className="text-center font-new text-2xl">Morning</h3>
        <div className="flex justify-center">
          <img src={apiData.message[0].coverImage1} alt="" />
        </div>
        <div className="font-new mt-4  text-2xl">
            Dish Name : {apiData.message[0].morning}
        </div>
        <div className="font-new mt-2  text-2xl">
          Ingredients Used : {apiData.message[0].morningIngriends}
        </div>

        <div className="font-new mt-2 text-2xl">
          Special Instructions : {apiData.message[0].specialInstructions}
        </div>
      </div>
      <div className="border-b mt-8 text-center">
        <h3 className="text-center font-new text-2xl">Evening</h3>
        <div className="flex justify-center">
          <img src={apiData.message[0].coverImage2} alt="" />
        </div>
        <div className="font-new mt-4  text-2xl">
            Dish Name : {apiData.message[0].evening}
        </div>
        <div className="font-new mt-2 text-2xl">
          Ingredients Used : {apiData.message[0].nightIngriends}
        </div>

        <div className="font-new mt-2 text-2xl">
          Special Instructions : {apiData.message[0].specialInstructions}
        </div>
      </div>
      <div className="border-b mt-8 text-center">
        <h3 className="text-center font-new text-2xl">Night</h3>
        <div className="flex justify-center">
          <img src={apiData.message[0].coverImage3} alt="" />
        </div>
        <div className="font-new mt-4  text-2xl">
            Dish Name : {apiData.message[0].nightMeal}
        </div>
        <div className="font-new mt-2  text-2xl">
          Ingredients Used : {apiData.message[0].nightIngriends}
        </div>

        <div className="font-new mt-2 text-2xl">
          Special Instructions : {apiData.message[0].specialInstructions}
        </div>
      </div>
    </>
  ) : (
    <div className='flex justify-center my-40  items-center' style={styleContainer}>
  <motion.span className='flex  justify-center items-center' 
    style={styleSpan}
    animate={{ rotate: 360 }}
    transition={spinTransition}
  />
</div>
  );
};

export default FoodMenu;
