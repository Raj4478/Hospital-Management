import React from "react";
import myimg from "../assets/img1.jpg"
import { useSelector } from "react-redux";
import { useState,useEffect } from "react";
import axios from "axios";
const PatientData = () => {

const select = useSelector((state) => state.data.objectid)

const urls = "/api/v1/user/particularpatientdata" 

const [apiData,setApiData] = useState(null)



    let jsons = {object_id : select}

  const fetchData = async() =>{  

    
    

    axios({
        method: 'post',
        url: urls,
        data: jsons, 
       
      })
        .then((res) => {
          console.log(res.data.message);
          setApiData(res.data.message)
        })
        .catch((err) => console.log(err));
      
          
        }

useEffect(()=>{

    fetchData()

},[])
  
return apiData ? (
    <>
    <div className="text-black text-center font-new mt-4 ">
    <div className="flex  justify-center">
<img src={apiData.coverImage?apiData.coverImage:"#"} className=" h-80 w-80" alt="" />
    </div>
{console.log(apiData)
}

    <div className="text-center border-t py-2 text-2xl border-black font-new mt-4">
    {apiData.patientName ? <h3>Name : {apiData.patientName}</h3>  :""}
    </div>
    <div className="text-center  border-t pt-2  text-2xl border-black font-new mt-4">
    {apiData.bloodGroup ? <h3>BloodGroup : {apiData.bloodGroup}</h3>  :""}
    </div>

    <div className="text-center border-t pt-2 text-2xl border-black font-new mt-4">
    {apiData.disease ? <h3>Disease : {apiData.disease}</h3>  :""}
    </div>
    <div className="text-center border-t pt-2 text-2xl border-black font-new mt-4">
    {apiData.allergies ? <h3>Allergies : {apiData.allergies}</h3>  :""}
    </div>
    <div className="text-center border-t pt-2 text-2xl border-black font-new mt-4">
    {apiData.roomNumber ? <h3>RoomNumber : {apiData.roomNumber}</h3>  :""}
    </div >
    <div className="text-center border-t pt-2 text-2xl border-black font-new mt-4">
    {apiData.bedNumber ? <h3>BedNumber : {apiData.bedNumber}</h3>  :""}
    </div>
    <div className="text-center border-t pt-2 text-2xl border-black font-new mt-4">
    {apiData.floorNumber ? <h3>FloorNumber : {apiData.floorNumber}</h3>  :""}
    </div>
    <div className="text-center border-t pt-2 text-2xl border-black font-new mt-4">
    {apiData.age ? <h3>Age : {apiData.age}</h3>  :""}
    </div>
    <div className="text-center border-t pt-2 text-2xl border-black font-new mt-4">
    {apiData.gender ? <h3>Gender : {apiData.gender}</h3>  :""}
    </div>
    <div className="text-center border-t pt-2 text-2xl border-black font-new mt-4">
       {apiData.contactInformation ? <h3> ContactInformation :{apiData.contactinformation}</h3>  :""}
    </div>
    <div className="text-center border-t pt-2 text-2xl border-black font-new mt-4">
    {apiData.emergencyInformation ? <h3>EmergencyInformation : {apiData.emergencyinformation}</h3>  :""}
    </div>
    </div>
    </>
): "processing"

}
export default PatientData
