import React from "react";

const Manager = ()=>{

    return (
    <>
    <h2 className=" flex justify-center font-new text-2xl">
        Hospital Management System
    </h2>
    <div className="py-8">
        <ul className="flex font-new text-xl justify-around">
            <li className=""> <span>👤</span>Welcome Manager </li>
            <li className="border p-2 rounded-md hover:bg-sky-300 duration-500">Logout <span>➡️</span></li>
        </ul>
    </div>
    <div className="grid grid-cols-2">
        <div className="grid grid-cols-1 bg-green-500 border py-20 hover:scale-110 duration-300 m-4">
            <div className="flex justify-center text-4xl">
            👥
            </div>
            <h4 className="flex justify-center text-xl font-new">
Patient Detail
            </h4>
           
        </div>
        <div className="grid grid-cols-1 bg-yellow-400 hover:scale-110 duration-300 m-4 border py-20">
            <div className="flex justify-center text-4xl" >
            🍲
            </div>
            
<h4 className="flex justify-center text-xl font-new">
Diet Chart
</h4>
        </div>
        <div className="grid grid-cols-1 bg-red-400 border hover:scale-110 duration-300 m-4 py-20">
            <div className="flex justify-center text-4xl">
            📅
            </div>
            <h4 className="flex justify-center text-xl font-new">
            Pantry Management
            </h4>
            
        </div>
        <div className="grid grid-cols-1 bg-violet-400 border hover:scale-110 duration-300 m-4 py-20">
            <div className="flex justify-center text-4xl">
            🔗
            </div>
           
            <h4 className="flex justify-center text-xl font-new">
            Meals Delivery
            </h4>
        </div>
    </div>
    </>
    )

}


export default Manager