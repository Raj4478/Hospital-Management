import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
const PatientData = () => {
  const select = useSelector((state) => state.data.objectid);

  const url1 = "/api/v1/user/particularpatientdata";
  const url2 = "/api/v1/user/delivery"
  const url3 = "/api/v1/user/deleteObject"
  const url4 = "/api/v1/user/updatestaff"

  const [apiData1, setApiData1] = useState(null);

  const [apiData2, setApiData2] = useState(null);

  let jsons = { object_id: select };

  const fetchData = async () => {
    axios({
      method: "post",
      url: url1,
      data: jsons,
    })
      .then((res) => {
        console.log(res.data.message);
        setApiData1(res.data.message);
      })
      .catch((err) => console.log(err));
  };

  const deliverData = async () => {
    try {
      const fields = await fetch(url2);
      const data = await fields.json();
      console.log("delivery data",data);
      

      setApiData2(data);
    } catch (error) {
      console.log("Api Error", error);
    }
  };

  const foodDelivered = () => {
  

    
   console.log(apiData2.message[0]._id);
   

    apiData2.message.map((data)=>{

    
      
    if(data.patient._id == apiData1._id){
      
    
      
      let jsons1 = {id : data._id}

      axios({
       method: "post",
       url: url3,
       data: jsons1,
     })
       .then((res) => {
         console.log("data deleted",res.data.message);
         //setApiData(res.data.message);
       })
       .catch((err) => console.log(err));

   let status = "available"
       let jsons = {id :data.staff._id,delivery:status}

       axios({
        method: "post",
        url: url4,
        data: jsons,
      })
        .then((res) => {
        // window.location.reload(true)
          //setApiData(res.data.message);
          console.log("inside status change",res.data.message);
          
        })
        .catch((err) => console.log(err));
    }


    })

  }

  useEffect(() => {
    fetchData();
    deliverData()
  }, []);

  return apiData1 ? (
    <>
      <div className="text-black text-center font-new mt-4 ">
        <div className="flex  justify-center">
          <img
            src={apiData1.coverImage ? apiData1.coverImage : "#"}
            className=" h-80 w-80"
            alt=""
          />
        </div>
        <div className="  ">
          <button onClick={(()=>(foodDelivered()))} className="border p-2 duration-500 mt-4 hover:bg-amber-300 hover:text-white text-amber-300  bg-white ">
                 Food Delivered
          </button>
        </div>

        <div className="text-center border-t py-2 text-2xl border-black font-new mt-4">
          {apiData1.patientName ? <h3>Name : {apiData1.patientName}</h3> : ""}
        </div>
        <div className="text-center  border-t pt-2  text-2xl border-black font-new mt-4">
          {apiData1.bloodGroup ? <h3>BloodGroup : {apiData1.bloodGroup}</h3> : ""}
        </div>

        <div className="text-center border-t pt-2 text-2xl border-black font-new mt-4">
          {apiData1.disease ? <h3>Disease : {apiData1.disease}</h3> : ""}
        </div>
        <div className="text-center border-t pt-2 text-2xl border-black font-new mt-4">
          {apiData1.allergies ? <h3>Allergies : {apiData1.allergies}</h3> : ""}
        </div>
        <div className="text-center border-t pt-2 text-2xl border-black font-new mt-4">
          {apiData1.roomNumber ? <h3>RoomNumber : {apiData1.roomNumber}</h3> : ""}
        </div>
        <div className="text-center border-t pt-2 text-2xl border-black font-new mt-4">
          {apiData1.bedNumber ? <h3>BedNumber : {apiData1.bedNumber}</h3> : ""}
        </div>
        <div className="text-center border-t pt-2 text-2xl border-black font-new mt-4">
          {apiData1.floorNumber ? (
            <h3>FloorNumber : {apiData1.floorNumber}</h3>
          ) : (
            ""
          )}
        </div>
        <div className="text-center border-t pt-2 text-2xl border-black font-new mt-4">
          {apiData1.age ? <h3>Age : {apiData1.age}</h3> : ""}
        </div>
        <div className="text-center border-t pt-2 text-2xl border-black font-new mt-4">
          {apiData1.gender ? <h3>Gender : {apiData1.gender}</h3> : ""}
        </div>
        <div className="text-center border-t pt-2 text-2xl border-black font-new mt-4">
          {apiData1.contactInformation ? (
            <h3> ContactInformation :{apiData1.contactinformation}</h3>
          ) : (
            ""
          )}
        </div>
        <div className="text-center border-t pt-2 text-2xl border-black font-new mt-4">
          {apiData1.emergencyInformation ? (
            <h3>EmergencyInformation : {apiData1.emergencyinformation}</h3>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  ) : (
    "processing"
  );
};
export default PatientData;
