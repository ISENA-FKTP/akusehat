import Sidebar_Klinik from "../../../components/klinik/sidebar_klinik";
import React from "react";
import { IconBase } from "react-icons";
import { FaSearch } from "react-icons/fa";

export default function Administrasi() {

  return (
    <>
      {" "}
      <div className="flex">
        <Sidebar_Klinik />
        <div className="flex relative flex-1">
          <div className="absolute inset-0">
            <div className="container">
             <div className="flex-row">
              <div className=" w-screen h-28 bg-primary-500  shadow-lg flex items-center justify-center">
                <h1 className="text-white font-secondary-Karla font-bold text-2xl text-left absolute top-0 left-0 m-11">
                  Pendaftaran pelayanan Pasien</h1>
              </div>
            </div>
            <div className=" bg-primary-500 h-28   shadow-lg flex items-center m-6 rounded">
              <h1 className=" text-white font-secondary-Karla font-bold text-xl absolute top-1/4 left-16 right-40">
                Selamat Pagi Petugas Administrasi</h1>
              <h1 className=" text-white font-secondary-Karla font-medium absolute left-16 right-40 -mb-7">
                Selamat Bertugas, Silahkan menambahkan Pasien Di Bawah</h1>
              <form className=" h-12 rounded-md absolute right-10 mb-8 " style={{width:'35%'}}>
                <div className="flex items-center  space-x-5">
                <IconBase icon={FaSearch} className="mb-9"/>
                    <select
                      name="bpjsType"
                      className="p-1 rounded-md mb-9 bg-primary-500 font-secondary-Karla font-medium text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="">BPJS</option>
                      <option value="nik">NIK</option>
                      <option value="nrp">NRP</option>
                      <option value="nip">NIP</option>
                    </select>
                  {/* Nama */}
                  <input
                    type="search"
                    name="name"
                    className="p-1 rounded-md mb-10 " style={{width:'100%'}}>

                  </input>
                </div>
              </form>
              <form className=" h-12 rounded-md absolute right-9 -mb-14"style={{width:'40%'}}>
              <div className="flex items-center space-x-5">
                 <h1 className=" text-white font-secondary-Karla font-medium mb-9 w-60 ">No. Pendaftaran</h1>
                  {/* Nama */}
                  <input
                    type="text"
                    name="name"
                    className="p-1 rounded-md mb-10 "style={{width:'100%'}}>

                    </input>
                    </div>
                    </form>
            </div>
              <div className="bg-white shadow-2xl flex flex-col mx-52 p-6 mt-10 rounded" style={{ width: '60%', height: 'auto' }}>
            <h1 className="text-black font-primary-Poppins font-extrabold text-3xl mb-6 mx-52">
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
            <div className="flex space-x-5 mt-6 mx-60">
              <button className=" text-white p-2 rounded-md transition duration-300 bg-success-600">
                Simpan
              </button>
              <button className=" text-white p-2 rounded-md transition duration-300 bg-error-700">
                Batal
              </button>
              </div>
            </div>
           </div>
          </div>
        </div>
      </div>
    </>
  );
};
