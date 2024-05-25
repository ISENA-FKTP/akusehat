import Sidebar_Klinik from "../../../components/klinik/sidebar_klinik";
import React from "react";

export default function Administrasi() {

  return (
    <>
      {" "}
      <div className="flex">
        <div className="fixed z-50">
        <Sidebar_Klinik />
        </div>
        <div className="flex relative flex-1">
          <div className="absolute inset-0">
            <div className="container">
             <div className="flex-row">
              <div className=" w-screen h-28 bg-primary-600 mx-18 shadow-lg flex items-center justify-center">
                <h1 className="text-white font-secondary-Karla font-bold text-2xl text-left absolute top-0 left-12 m-11">
                  Pendaftaran pelayanan Pasien</h1>
              </div>
            </div>
            <div className =" h-28 bg-primary-600 mx-18 shadow-lg flex items-center rounded justify-center my-6 absolute left-24" style={{width:'92%'}}>
               <h1 className="text-white font-secondary-Karla font-bold text-xl absolute left-6 py-24 pt-14">
                 Selamat Pagi Petugas Administrasi
                  </h1>
              <h1 className=" text-white font-secondary-Karla font-medium absolute left-6 py-0 pt-8">
                Selamat Bertugas, Silahkan menambahkan Pasien Di Bawah
                  </h1>

              <form className=" h-12 rounded-md py-32 pt-10 absolute right-5 ">
                <div className="flex items-center  space-x-5">
                  <select
                      name="bpjsType"
                      className="p-1 rounded-md  mb-9 w-60 bg-primary-600 font-secondary-Karla font-medium
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
                   className="p-1 rounded-md bg-white focus:outline-none mb-10"
                   placeholder="Cari.."
                   style={{ width: '100%' }}/>
                </div>
              </form>

              <form className=" h-12 rounded-md absolute right-5 -mb-14">
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
              <div className="flex items-center space-x-2 mb-1 mx-24" key={index}>
                <label className="text-black font-secondary-Karla font-bold w-48 mx-1">
                  {field.label}:
                </label>
                <input
                  type="text"
                  name={field.name}
                  className=" px-10 py-1 rounded-md border-2 border-black border-opacity-70 w-96"
                />
              </div>
                  )
                )
              }
              
              {/* Buttons */}
            <div className="flex space-x-5 mt-6 mx-72">
              <button className=" text-white px-3 py-2 rounded-md transition duration-300 bg-success-600">
                Simpan
              </button>
              <button className=" text-white px-6 rounded-md transition duration-300 bg-error-700">
                Batal
              </button>
              </div>
            </div>
           </div>
          </div>
          </div>
     
    </>
  );
};
