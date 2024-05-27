import Header from "../../../components/header_dash";
import Sidebar_Klinik from "../../../components/klinik/sidebar_klinik";
import React from "react";


export default function Dashboard() {
  return (
    <>
      {" "}
      <div className="fixed z-50">
        <Sidebar_Klinik />
        </div>
        <Header
        title="Pendaftaran pelayanan Pasien"
        userName="Rifki Rusdi Satma Putra"
        userStatus="Kepala Polisi"
        profilePicture="logo.png"
        />
        
        <div className="flex-1 relative">
          <div className="absolute inset-0">
            <img 
              src="/backdash.png" 
              alt="Background" 
              className="object-cover w-full h-full op"
              />
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-55"></div>
          <div className="absolute inset-0 bg-primary-950 bg-opacity-20"></div>
          <div className=" relative z-10 flex items-center h-screen">
            <div className=" mx-32 ">
              <h3 className="text-secondary-500 text-7xl font-primary-Poppins font-extrabold">
              Selamat Datang
              </h3>
              <div className="text-white text-6xl font-primary-Poppins font-extrabold mb-6">
                <h3>ISENA-FKTP</h3>
              </div>
              <div className="text-secondary-500 text-2xl font-primary-Poppins font-extrabold">
                <h3 >
                  <p>Solusi Manajemen Data Apotik dan Kesehatan Polisi Polda NTB</p>
                  </h3>
              </div>
                <div className="text-white text-1xl font-primary-Poppins mb-11 ">
                  <p className="leading-relaxed">
                  ISENA-FKTP adalah platform digital inovatif untuk pengelolaan data apotik dan riwayat kesehatan personel<p></p>
                  kepolisian di Polda NTB. Kami menawarkan fitur lengkap untuk mengelola stok obat, resep, serta mencatat<p></p>
                  dan memantau riwayat medis dengan mudah dan aman.
                  </p>
                </div>
                <div>
                <div class="flex-row">
                <button class="text-white bg-secondary-500 px-5 py-2 rounded-md hover:bg-secondary-500">
                  Mulai
                </button>
                </div>
                </div>
              </div>
            </div>
          </div>
      

    </>
  );
}
