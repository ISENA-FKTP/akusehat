import Sidebar_Klinik from "../../../components/klinik/sidebar_klinik";
import React from "react";

export default function Administrasi() {

  return (
    <>
      {" "}
      <div className="fixed z-50">
        <Sidebar_Klinik />
        </div>
        <div className="flex relative flex-1">
          <div className="absolute inset-0">
            <div className="container">
             <div className="flex-row">
              <div className=" w-screen h-28 bg-primary-500 mx-18 shadow-lg flex items-center justify-center">
                <h1 className="text-white font-secondary-Karla font-bold text-2xl text-left absolute top-0 left-64 m-11">
                  Pendaftaran pelayanan Pasien</h1>
              </div>
            </div>
            <div className =" w-10/12 h-28 bg-primary-500 mx-18 shadow-lg flex items-center rounded justify-center my-6 absolute left-40">
               <h1 className="text-white font-secondary-Karla font-bold text-xl absolute left-36 py-24 pt-14">
                 Selamat Pagi Petugas Administrasi
                  </h1>
              <h1 className=" text-white font-secondary-Karla font-medium absolute left-36 py-0 pt-8">
                Selamat Bertugas, Silahkan menambahkan Pasien Di Bawah
                  </h1>

              <form className=" h-12 rounded-md absolute right-10 mb-8 " style={{width:'35%'}}>
                <div className="flex items-center  space-x-5">
                  <select
                      name="bpjsType"
                      className="p-1 rounded-md mb-9 bg-primary-500 font-secondary-Karla font-medium
                       text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="">BPJS</option>
                      <option value="nik">NIK</option>
                      <option value="nrp">NRP</option>
                      <option value="nip">NIP</option>
                    </select>
                  {/* Nama */}
                  <input
                   type="search"
                   name="search"
                   className=" p-1 rounded-md bg-white focus:outline-none mb-10 absolute left-24"
                   placeholder="Cari..."
                   style={{ width: '72%' }}/>
                </div>
              </form>

              <form className=" h-12 rounded-md absolute right-9 -mb-14"style={{width:'40%'}}>
              <div className="flex items-center space-x-5">
                 <h1 className=" text-white font-secondary-Karla font-medium mb-9 w-60 ">No. Pendaftaran</h1>
                  {/* Nama */}
                  <input
                    type="search"
                   name="search"
                   className="p-1 rounded-md bg-white focus:outline-none mb-10"
                   placeholder=""
                   style={{ width: '100%' }}/>
                    </div>
                    </form>
              </div>
            </div>
          <div className="bg-white shadow-2xl flex flex-col mx-52 p-6 mt-40 rounded absolute left-28" style={{ width: '60%', height: 'auto' }}>
            <h1 className="text-black font-primary-Poppins font-extrabold text-3xl mb-6 mx-72">
              BIODATA
            </h1>
            {/* Form Fields */}
            {[
              { label: 'NRP/No.BPJS', name: 'nrp_or_bpjs' },
              { label: 'Nama', name: 'name' },
              { label: 'Status Pasien', name: 'status' },
              { label: 'Tanggal Lahir', name: 'dob' },
              { label: 'Jenis Kelamin', name: 'gender' },
              { label: 'PPK Umum', name: 'ppk' },
              { label: 'No.Handphone', name: 'phone' },
              { label: 'No.Rekam Medis', name: 'medical_record' },
            ].map((field, index) => (
              <div className="flex items-center space-x-2 mb-1" key={index}>
                <label className="text-black font-secondary-Karla font-bold w-48">
                  {field.label}:
                </label>
                <input
                  type="text"
                  name={field.name}
                  className="p-2 rounded-md border-2 border-black border-opacity-70 flex-1"
                />
              </div>
                  )
                )
              }
              {/* Buttons */}
            <div className="flex space-x-5 mt-6 mx-72">
              <button className=" text-white p-2 rounded-md transition duration-300 bg-success-600"style={{width:'80%'}}>
                Simpan
              </button>
              <button className=" text-white p-2 rounded-md transition duration-300 bg-error-700"style={{width:'80%'}}>
                Batal
              </button>
              </div>
            </div>
           </div>
          </div>
     
    </>
  );
};
