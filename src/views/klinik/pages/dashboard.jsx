import Sidebar_Klinik from "../../../components/klinik/sidebar_klinik";
import React from "react";


export default function Dashboard() {
  return (
    <>
      {" "}
      <div className="flex">
        <Sidebar_Klinik />
        <div className="flex-1 relative">
          <div className="absolute inset-0">
            <img 
              src="/backdash.png" 
              alt="Background" 
              className="object-cover w-full h-full"
            />
          </div>
          <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-height">
            <h1 className="text-white text-5xl font-poppins font-bold">
              Selamat Datang
            </h1>
            <div className="text-white">
            <h2>ISENA-FKTP</h2>
              {/* Add your dashboard content here */}
              </div>
              </div>
            </div>
          </div>
        </div>

    </>
  );
}
