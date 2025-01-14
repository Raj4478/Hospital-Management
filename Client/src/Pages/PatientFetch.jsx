import React, { useEffect,useState } from "react";
import PatientCard from "./PatientCard";

const AllPatientData = () => {

    const url = "/api/v1/user/patientdata" 

const [apiData,setApiData] = useState(null)
  const fetchData = async() =>{  
    
    try {
        
const fields = await fetch(url)
const data = await fields.json()



setApiData(data);




    } catch (error) {

        console.log("Api Error",error);
 
        
    }
}

useEffect(()=>{

    fetchData()

},[])

return apiData? (
    <>
    <h2 className="text-center font-new text-2xl mb-4">
    Patient's Detail 
   </h2>
   <div className="grid grid-cols-3">

   
    {apiData.message.map((data)=>{

        
        

        return(
            <div className="">
                <PatientCard key={data._id} name = {data.patientName} allergies = {data.allergies} age = {data.age} bedNumber={data.bedNumber} diesase={data.diesase} patientid = {data._id} image = {data.coverImage} />
            </div>
        )
    })}
    </div>
    </>
):"processing"
}


export default AllPatientData