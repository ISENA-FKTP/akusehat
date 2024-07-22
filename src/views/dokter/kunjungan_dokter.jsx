import { useParams } from "react-router-dom";
import Pengajuan from "./components/Pengajuan";
import "react-datepicker/dist/react-datepicker.css";
import Header from "../../components/header";
import Sidebar_Dokter from "../../components/klinik/sidebar_dokter";
import Obat from "./components/Obat";
import RiwayatAlergi from "./components/RiwayatAlergi";

import Diagnosa from "./components/Diagosa";
import Pemeriksaan from "./components/Pemeriksaan";

export default function KunjunganDokter() {
  const { id } = useParams();

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

      <div className=" bg-primary-600 mx-auto shadow-lg flex-none items-center text-center w-[80%] rounded ml-44 mt-5 py-10">
        <h1 className="text-white font-primary-Poppins flex justify-center font-bold text-2xl ">
          KUNJUNGAN
        </h1>
      </div>

      <div className="grid grid-cols-2 mx-auto items-baseline container mr-44">
        <div className="grid grid-cols-1 mt-7 mx-auto ml-44 gap-7 items-baseline container w-[80%]">
          <div>
            {/* Form Pengajuan */}
            <Pengajuan id={id} />
          </div>
        </div>

        <div className="grid grid-cols mx-auto ml-24 gap-5 items-baseline container w-[80%]">
          <div>
            {/* Form Obat */}
            <Obat />

            {/* Form Riwayat Alergi */}
            <div className="mt-2">
              <RiwayatAlergi />
            </div>
          </div>

          {/* Form Diagnosa */}
          <div className="">
            <Diagnosa />
          </div>
          {/* Form Pemeriksaan */}
          <div className="">
            <Pemeriksaan />
          </div>
        </div>
      </div>
    </>
  );
}
