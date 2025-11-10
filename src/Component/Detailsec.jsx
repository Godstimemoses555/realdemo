import React, { use } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import Footer from "./Footer";
import Totop from "../Component/Totop"
import Navbar from "../Component/Navbar";

const Detailsec = () => {
  const { state } = useLocation(); 
  const navy=useNavigate()
  const handlenav=useNavigate();

  return (
    <div>

     <Navbar/>
        <div className="flex  lg:flex-row full h-screen p-2.5 justify-center items-center gap-4 flex-col ">

      
      {/* LEFT SIDE IMAGE */}
      <div className="flex w-full lg:w-1/2 h-[600px]  shadow-lg justify-center items-center rounded-lg flex-col gap-4 p-4">
        <img
          src={state.image}
          alt="Product"
          className="object-contain w-[300px] h-[300px] rounded-lg"
        />

        <div className="flex w-[300px] h-[100px] gap-2 flex-col ">
          <div className="flex w-[150px]  border-b-2 border-blue-500  justify-center items-center">
            <h1 className="text-[20px] text-blue-500">Description</h1>

          </div>

          <h2 className="text-[20px]">Additional <br /> Information</h2>

          <h3 className="text-[20px]" >1 (review)</h3>

        </div>

       
      </div>

      {/* RIGHT SIDE DETAILS */}
      <div className="flex w-full lg:w-1/2 h-[500px]  justify-center items-center rounded-lg flex-col gap-4 p-4 shadow-lg">
        <h1 className="text-lg font-bold">{state.description.length > 20 ? state.description.slice(0,50)+"...":state.description }</h1>
        <h2 className="text-red-600 text-20">${state.price}</h2>
        <h3>⭐⭐⭐⭐{state.rating.rate}(1 Customer review)</h3>
        <div className="flex w-[300px] h-[200px] gap-0.1 flex-col">
          <div className="flex gap-2.5  w-[300px] h-[200px]">
            <h1>❤️</h1>
            <h1>we really care about you</h1>

          </div>

          <div className="flex gap-2.5  w-[300px] h-[200px]">
            <h1>❤️</h1>
            <h1>we are the best to shop with</h1>

          </div>

          <div className="flex gap-2.5  w-[300px] h-[200px]">
            <h1>❤️</h1>
            <h1>your happiness is our piority</h1>

          </div>

          <div className="flex lg:flex-row w-[400px] h-[200px] gap-1">
            <button onClick={()=>navy("/Cart")} className="w-[150px] h-[50px] rounded-[5px] bg-blue-700 text-white hover:bg-gray-800 transition duration-200">
              Check out
              
            </button>

            <button onClick={()=>handlenav("/Storepage")} className="w-[150px] h-[50px] rounded-[5px] bg-black text-white hover:bg-gray-800 transition duration-200">
              Return to shop
              
            </button>


          </div>

         

        </div>
      </div>
    </div>

    <Footer/>
    <Totop/>
    

    </div>
  
  );
};

export default Detailsec;
