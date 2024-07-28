import Sidebar_Klinik from "../../../components/klinik/sidebar_klinik";
import Header from "../../../components/header";
import KeadaanFisik from "./components/KeadaanFisik";
import Pengajuan from "./components/Pengajuan";
import TekananDarah from "./components/TekananDarah";
import { useParams } from "react-router-dom";

export default function KajianAwal() {
  const { id } = useParams();
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

      <div className="flex relative flex-1">
        <div className="absolute inset-0 ">
          <div className="flex flex-col place-content-center">
            <div className="py-5 bg-primary-600 shadow-lg flex-none text-start rounded-lg ml-28 mr-14 mt-5">
              <h1 className="ml-10 text-white font-secondary-Karla font-bold text-xl ">
                Selamat Pagi Petugas Administrasi
              </h1>
              <h1 className="ml-10 text-white font-secondary-Karla font-medium ">
                Selamat Bertugas, Silahkan menambahkan Pasien Di Bawah
              </h1>
            </div>

            <div className=" bg-primary-600 mx-auto shadow-lg flex-none items-center text-center w-[80%] rounded ml-44 mt-5 py-5">
              <h1 className="text-white font-primary-Poppins flex justify-center font-bold text-2xl ">
                PENGKAJIAN AWAL
              </h1>
              <h1 className="text-white font-primary-Poppins font-bold text-2xl">
                PASIEN RAWAT JALAN
              </h1>
              <h1 className="text-white font-primary-Poppins font-right italic">
                (Diisi pada Saat Pasien Pertama Kali Datang Ke Klinik)
              </h1>
            </div>

            <div className="border border-primary-700 flex ml-44 mr-40 p-6 justify-center">
              <h1 className="font-secondary-karla font-medium text-lg ml-32">
                Nama Pasien :
              </h1>
              <div className="">
                <h1 className="font-secondary-karla font-medium text-lg">
                  Tanggal Lahir :
                </h1>
              </div>
            </div>

            <div className="flex mt-7 ml-44 mr-28 items-baseline">
              <Pengajuan id={id} />

              <div className="grid grid-rows-2 gap-5 flex-[40%] mb-10">
                <KeadaanFisik id={id} />

                <TekananDarah id={id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
