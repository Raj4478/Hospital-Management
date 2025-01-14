import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PatientData from './PatientData'
import { useDispatch } from 'react-redux'
import {Objectid} from "../../store/detailProvider.js"

const   PatientCard = ({name,age,allergies,bedNumber,disease,image,patientid}) => {
  

const dispatch = useDispatch()

const navigate = useNavigate()



const forward = (patientid)=>{

    console.log("forward is working",patientid);
    
    dispatch(Objectid({objectid : patientid}))
    navigate('/patient')
    
  }


  return  (
    
  
<>
   
    <div className='p-2 m-4 text-black border hover:scale-110 duration-300 ' onClick={()=>(forward(patientid))}>
      
      <div className=' h-fit  flex justify-center ' >
      <img src={image?image:"#"} alt="" className='rounded-2x object-cover h-40 w-80' />

      </div>
    
    <div className='grid grid-cols-2 text-lg mt-6 px-4 font-new'>
        
<div>


  <div className='text-left'>
    <h3>Name : {name}</h3>
  </div>

<div className='text-left tracking-wider '>
  Age : {age}
</div>
    
</div>  
<div>
    <div className='text-right'>
        Disease : {disease}
    </div>
    <div className='text-right'>
        Allergies : {allergies}
    </div>
</div>
</div>
<div className='text-center text-lg font-new'>
    BedNumber : {bedNumber}
</div>
</div>  
</>
  )
}

export default PatientCard