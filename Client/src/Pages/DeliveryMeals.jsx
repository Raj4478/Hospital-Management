import React, { useEffect, useState } from "react";
import StaffCard from "./StaffCard.jsx";
import axios from "axios";
import { motion } from "framer-motion";

const DeliverMeals = () => {

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
  const url1 = "/api/v1/user/pantrydetail";
  const url2 = "/api/v1/user/patientdata";
  const url3 = "/api/v1/user/updatestaff";
  const url4 = "/api/v1/user/assigndelivery"

  const [apiData1, setApiData1] = useState(null);
  const [apiData2, setApiData2] = useState(null);
  const fetchData = async () => {
    try {
      const fields = await fetch(url1);
      const data = await fields.json();

      setApiData1(data);
      console.log("staff data",data);
      
    } catch (error) {
      console.log("Api Error", error);
    }
  };

  const patientDetails = async() => {
    try {
        const fields = await fetch(url2);
        const data = await fields.json();
     console.log("patientdetails",data);
     
        setApiData2(data);
      } catch (error) {
        console.log("Api Error", error);
      }
  }


  const delivery = () => {

      console.log(apiData1.message[0].deliveryStatus == "sff");
      
    let count = 0
    apiData2.message.map((data)=>{
      if(apiData1.message[count].deliveryStatus == "available"){
       
        console.log("inside loop");
        
        console.log("Delivering food to",data.patientName,"at",data.roomNumber);
        
        apiData1.message[count].deliveryStatus = `Delivering food to ${data.patientName}at ${data.roomNumber}`

        let jsons = {id :apiData1.message[count]._id,delivery:apiData1.message[count].deliveryStatus}

     axios({
      method: "post",
      url: url3,
      data: jsons,
    })
      .then((res) => {
      // window.location.reload(true)
        //setApiData(res.data.message);
        console.log("inside status change",res.data.message);
        
      })
      .catch((err) => console.log(err));


      let jsons1 = {staff:apiData1.message[count]._id,patient:apiData2.message[count]._id}

      axios({
       method: "post",
       url: url4,
       data: jsons1,
     })
       .then((res) => {
         console.log(res.data.message);
         //setApiData(res.data.message);
         window.location.reload(true)
       })
       .catch((err) => console.log(err));
 

        count += 1
      }
      else{
        count +=1
      }

      
    }

    

    
    )

   

 
    
  }

  const changeDelivery = () => 
    
    {

      
      
    let count = 0
    apiData1.message.map((data)=>{
      
       
        
        
        apiData1.message[count].deliveryStatus = `Available`

        let jsons1 = {id :apiData1.message[count]._id,delivery:apiData1.message[count].deliveryStatus}

     axios({
      method: "post",
      url: url3,
      data: jsons1,
    })
      .then((res) => {
        console.log(res.data.message);
        //setApiData(res.data.message);
      })
      .catch((err) => console.log(err));

        count += 1
      }
      

    )

    window.location.reload()
    
  }
  

  
  useEffect(() => {
    fetchData()
    patientDetails()
  }, []);

  

  

  return apiData1? (
    <>
      <h2 className="text-center  font-new text-2xl mb-4">Staff Detail</h2>

      <div className="flex justify-center" onClick={()=>(delivery())}>
        <button className="border-2 p-2  font-new text-2xl hover:bg-amber-300 duration-500 hover:text-white text-amber-300 bg-white">
            Deliver Food
        </button>
        
      </div>
      <div className="flex justify-center" onClick={()=>(changeDelivery())}>
        {/* <button className="border-2 p-2  font-new text-2xl hover:bg-amber-300 duration-500 hover:text-white text-amber-300 bg-white">
         Change   Deliver Food
        </button> */}
        
      </div>
      { <div className="grid grid-cols-3">
        {apiData1.message.map((data) => {
          return (
            <div className="">
              <StaffCard contact = {data.contactInfo} name = {data.name} image = {data.coverImage} status = {data.deliveryStatus} />
            </div>
          );
        })}
      </div> }
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

export default DeliverMeals;
