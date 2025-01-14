import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Objectid } from "../../store/detailProvider.js";

const StaffCard = ({
  name,
  status,
  image,
  contact
}) => {
  

  const navigate = useNavigate();

  const forward = (patientid) => {
    console.log("forward is working", patientid);

    dispatch(Objectid({ objectid: patientid }));
    navigate("/patient");
  };

  return (
    <>
      <div
        className="p-2 m-4 text-black border hover:scale-110 duration-300 "
        onClick={() => forward(patientid)}
      >
        <div className=" h-fit  flex justify-center ">
          <img
            src={image ? image : "#"}
            alt=""
            className="rounded-2x object-cover h-40 w-80"
          />
        </div>

        <div className="grid grid-cols-2 text-lg mt-6 px-4 font-new">
          <div>
            <div className="text-left">
              <h3>Name : {name}</h3>
            </div>

            
          </div>
          <div>
            <div className="text-right">Contact: {contact}</div>
            
          </div>
          
        </div>
        <div className="text-center font-new text-lg">Status : {status}</div>
      </div>
    </>
  );
};

export default StaffCard;
