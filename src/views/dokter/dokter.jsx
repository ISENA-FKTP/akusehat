import "react-datepicker/dist/react-datepicker.css";
import Header from "../../components/header";
import Sidebar_Dokter from "../../components/klinik/sidebar_dokter";
import Pengajuan from "./components/Pengajuan";
import Obat from "./components/Obat";
import RiwayatAlergi from "./components/RiwayatAlergi";
import TekananDarah from "./components/TekananDarah";
import KeadaanFisik from "./components/KeadaanFisik";

export default function Dokter() {
  return (
    <>
      <div className="fixed z-50">
        <Sidebar_Dokter />
      </div>
      <Header
        title="Pendaftaran Pelayanan Pasien"
        userName="Muhamad Halimudin Nova"
        userStatus="Dokter Poli Umum"
        profilePicture="logo.png"
      />
      <div className="py-5 bg-primary-600 shadow-lg flex-none text-start rounded-lg ml-28 mr-14 mt-5">
        <h1 className="ml-10 text-white font-secondary-Karla font-bold text-xl ">
          Selamat Pagi Petugas Administrasi
        </h1>
        <h1 className="ml-10 text-white font-secondary-Karla font-medium ">
          Selamat Bertugas, Silahkan menambahkan Pasien Di Bawah
        </h1>
      </div>

      <div className="bg-primary-600 mx-auto shadow-lg flex justify-center items-center text-center w-[80%] rounded ml-44 mt-5 py-10">
        <h1 className="flex w-auto text-white font-primary-Poppins font-bold text-2xl ">
          PENDAFTARAN PASIEN
        </h1>
      </div>

      <div className="border border-primary-600 mx-auto shadow-lg flex items-center text-center w-[80%] rounded ml-44 py-5">
        <form className="w-full mx-8 space-y-4">
          <div className="flex justify-around">
            <div className="flex items-center space-x-3">
              <label className="text-black font-secondary-Karla font-bold">
                Poli
              </label>
              <select
                name="Poli"
                className="p-1 rounded-md border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
              >
                <option value=""></option>
                <option value="Poli Umum">Poli Umum</option>
                <option value="Poli Gigi">Poli Gigi</option>
              </select>
            </div>

            <div className="flex items-center space-x-3">
              <label className="text-black font-secondary-Karla font-bold">
                Penyakit
              </label>
              <select
                name="Penyakit"
                className="p-1 rounded-md border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
              >
                <option value=""></option>
                <option value="Penyakit Sedikit">Penyakit Sedikit</option>
                <option value="Penyakit Terbanyak">Penyakit Terbanyak</option>
              </select>
            </div>

            <div className="flex items-center space-x-3">
              <label className="text-black font-secondary-Karla font-bold">
                Status Pasien
              </label>
              <select
                name="Status"
                className="p-1 w-32 rounded-md border border-black font-secondary-Karla font-medium text-black"
              >
                <option value=""></option>
                <option value="Polri">Polri</option>
                <option value="PNS">PNS</option>
                <option value="Keluarga">Keluarga</option>
                <option value="Mandiri">Mandiri</option>
              </select>
            </div>

            <div className="flex items-center space-x-3">
              <label className="text-black font-secondary-Karla font-bold">
                Tanggal
              </label>
              <input
                type="date"
                className="p-1 rounded-md border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </form>
      </div>

      <div className=" bg-primary-600 mx-auto shadow-lg flex-none items-center text-center w-[80%] rounded ml-44 mt-5 py-10">
        <h1 className="text-white font-primary-Poppins flex justify-center font-bold text-2xl ">
          KUNJUNGAN
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-10 mx-auto container ml-44 w-[80%]">
        {/* Form Pengajuan */}
        <Pengajuan />

        <div className="grid grid-cols mx-auto mt-7 gap-5 container">
          {/* Form Obat */}
          <Obat />

          {/* Form Riwayat Alergi */}
          <RiwayatAlergi />

          {/* Form Tekanan Darah */}
          <TekananDarah />

          {/* Form Keadaan Fisik */}
          <KeadaanFisik />
        </div>
      </div>
    </>
  );
}
