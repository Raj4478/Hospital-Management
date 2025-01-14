import React, { useEffect } from "react";

const foodMenu = () => {

    


    const chart = async() => {

        const urls = "api/v1/user/menu"
        try {
        
            const fields = await fetch(urls)
            const data = await fields.json()
            
            setApiData(data);
            
                } catch (error) {
            
                    console.log("Api Error",error);
             
                    
                }
            }


            useEffect(()=> {
   chart()
            },[])
        }