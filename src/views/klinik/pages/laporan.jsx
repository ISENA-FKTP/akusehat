
import "react-datepicker/dist/react-datepicker.css";
import Sidebar_Klinik from "../../../components/klinik/sidebar_klinik";
import Header from "../../../components/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FaPrint } from "react-icons/fa6";

export default function Laporan() {
  return (
    <>
      <div className="fixed z-50">
        <Sidebar_Klinik />
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
          LAPORAN PENDAFTARAN PASIEN
        </h1>
      </div>

      <div className="border border-primary-600 mx-auto shadow-lg flex items-center text-center w-[80%] rounded ml-44 py-5">
        <form className="w-full mx-8 space-y-4">
          <div className="flex justify-around">
            <div className="flex items-center space-x-3">
              <label className="text-black font-secondary-Karla font-bold">Penyakit</label>
              <select name="Penyakit" className="p-1 rounded-md border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500">
                <option value=""></option>
                <option value="Penyakit Sedikit">Penyakit Sedikit</option>
                <option value="Penyakit Terbanyak">Penyakit Terbanyak</option>
              </select>
            </div>

            <div className="flex items-center space-x-3">
              <label className="text-black font-secondary-Karla font-bold">Status Pasien</label>
              <select name="Status" className="p-1 w-32 rounded-md border border-black font-secondary-Karla font-medium text-black">
                <option value=""></option>
                <option value="Polri">Polri</option>
                <option value="PNS">PNS</option>
                <option value="Keluarga">Keluarga</option>
                <option value="Mandiri">Mandiri</option>
              </select>
            </div>

            <div className="flex items-center space-x-3">
              <label className="text-black font-secondary-Karla font-bold">Tanggal</label>
              <input
                type="date"
                className="p-1 rounded-md border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500" />
            </div>

            <div className="flex items-center space-x-5">
              <div className="relative w-44 mx-auto">
                <input
                  type="search"
                  name="search"
                  className="p-1 rounded-md bg-white focus:outline-none w-full"
                  placeholder="Cari.."
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute right-3 top-2.5 text-gray-500"
                />
              </div>

              <button type="button" className="flex items-center px-4 p-1 border border-black text-black rounded-md hover:bg-blue-600 focus:outline-none">
                <FaPrint
                  className=" mr-3" />
                Cetak
              </button>
            </div>
          </div>


        </form>
      </div>


    </>
  );
}
