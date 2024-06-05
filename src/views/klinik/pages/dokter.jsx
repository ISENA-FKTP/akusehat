import { useState } from "react";
import Sidebar_Klinik from "../../../components/klinik/sidebar_klinik";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AiOutlineCalendar, AiOutlineClockCircle } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Header from "../../../components/header";

const MySwal = withReactContent(Swal);

const handleSave = () => {
  MySwal.fire({
    title: "Apakah Anda yakin?",
    text: "Anda tidak akan dapat mengembalikan ini!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ya, simpan!",
    cancelButtonText: "Tidak, batalkan!",
  }).then((result) => {
    if (result.isConfirmed) {
      saveData();
    }
  });
};

const handleCancel = () => {
  MySwal.fire({
    title: "Apakah Anda yakin?",
    text: "Anda akan membatalkan perubahan ini!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Ya, batalkan!",
    cancelButtonText: "Tidak, kembali!",
  }).then((result) => {
    if (result.isConfirmed) {
      cancelData();
    }
  });
};

const saveData = () => {
  MySwal.fire("Tersimpan!", "Data Anda telah disimpan.", "success");
};

const cancelData = () => {
  MySwal.fire("Dibatalkan!", "Perubahan telah dibatalkan.", "error");
};

export default function Dokter() {
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());

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
      <div className=" bg-primary-600 mx-auto shadow-lg flex-none items-center text-center w-[80%] rounded ml-44 mt-5 py-10">
        <h1 className="text-white font-primary-Poppins flex justify-center font-bold text-2xl ">
          KUNJUNGAN
        </h1>
      </div>

      <div className="grid grid-cols-2 mt-7 mx-auto ml-44 gap-7 items-baseline container w-[80%]">
        <div>
          <div className="h-10 w-full bg-primary-600 shadow-lg rounded-t-lg ">
            <h1 className="text-white font-primary-Poppins font-bold text-xl justify-center flex items-center py-1">
              Pengajuan
            </h1>
          </div>
          <div className=" w-full border border-primary-600 mx-18 shadow-lg rounded-b-lg">
            <form className="space-y-5 my-7 w-full mx-8 left-10 right-24 ">
              <div className="flex items-center space-x-5 mr-14">
                <label className="text-black font-secondary-Karla font-bold flex-[30%]">
                  Perawatan:
                </label>
                <select
                  name="Perawatan"
                  className="p-1 rounded-md  flex-[70%] pr-20 border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
                >
                  <option value=""></option>
                  <option value="rawat jalan">Rawat Jalan</option>
                  <option value="rawat inap">Rawat Inap</option>
                  <option value="Promotif Preventif">Promotif Preventif</option>
                </select>
              </div>
              <div className="flex items-center space-x-5 mr-14">
                <label className="text-black font-secondary-Karla font-bold flex-[30%]">
                  Jenis Kunjungan
                </label>
                <select
                  name="Perawatan"
                  className="p-1 rounded-md flex-[70%] pr-20 border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
                >
                  <option value=""></option>
                  <option value="Kunjungan Sakit">Kunjungan Sakit</option>
                  <option value="Kunjungan Sehat">Kunjungan Sehat</option>
                </select>
              </div>
              <div className="flex items-center space-x-5 mr-14">
                <label className=" text-black font-secondary-Karla font-bold flex-[30%]">
                  Poli
                </label>
                <input
                  type="text"
                  name="poli"
                  className="p-1 h-9 flex-[70%] rounded-md text-left bg-white border border-black focus:outline-none"
                  placeholder=""
                />
              </div>
              <div className="flex items-center space-x-5 mr-14 ">
                <label className=" text-black font-secondary-Karla font-bold flex-[30%]">
                  Tanggal Kunjungan
                </label>
                <div className="flex items-center border border-gray-300 rounded flex-[70%]">
                  <AiOutlineCalendar className="text-gray-500 m-2" />
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    className="p-2 w-full outline-none"
                    placeholderText="Pilih tanggal"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-5 mr-14">
                <label className=" text-black font-secondary-Karla font-bold flex-[30%]"></label>
                <div className="flex items-center border border-gray-300 rounded flex-[70%]">
                  <AiOutlineClockCircle className="text-gray-500 m-2" />
                  <DatePicker
                    selected={startTime}
                    onChange={(time) => setStartTime(time)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    className="p-2 w-full outline-none"
                    placeholderText="Pilih waktu"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-5 mr-14">
                <label className=" text-black font-secondary-Karla font-bold flex-[30%]">
                  Keluhan
                </label>
                <textarea
                  name="keterangan"
                  className="p-1 h-36 rounded-md text-left bg-white border border-black focus:outline-none flex-[70%]"
                  placeholder="Keterangan......"
                />
              </div>

              <div className="flex items-center space-x-5 mr-14">
                <label className=" text-black font-secondary-Karla font-bold flex-[30%]">
                  Anamnesa
                </label>
                <textarea
                  name="keterangan"
                  className="p-1 h-36 rounded-md text-left bg-white border border-black focus:outline-none flex-[70%]"
                  placeholder="Keterangan......"
                  style={{ width: "51%" }}
                />
              </div>

              <div className="flex space-x-4 pt-5">
                <button
                  type="button"
                  className="bg-blue-500 bg-success-600 text-white px-4 py-1 rounded hover:bg-blue-600"
                  onClick={handleSave}
                >
                  Simpan
                </button>
                <button
                  type="button"
                  className="bg-gray-500 bg-error-600 text-white px-4 py-1 rounded hover:bg-gray-600"
                  onClick={handleCancel}
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>

        <div>
          <div className="mb-5">
            <div className="h-10 bg-primary-600 shadow-lg rounded-t-lg py-4 justify-center flex items-center">
              <h1 className="text-white font-primary-Poppins font-bold text-xl   ">
                Riwayat Alergi
              </h1>
            </div>
            <div className="h-72 border border-primary-600 -mt-8 shadow-lg rounded-lg">
              <form className="-space-y-10 mx-12">
                <div className="flex items-center space-x-5">
                  <label className="text-black font-secondary-Karla font-bold py-14 w-40">
                    Makanan :
                  </label>
                  <select
                    name="Perawatan"
                    className="p-1 rounded-md w-full border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
                  >
                    <option value=""></option>
                    <option value="rawat jalan">Tidak ada</option>
                    <option value="rawat inap">Seafood</option>
                    <option value="Promotif Preventif">Gandum</option>
                    <option value="rawat jalan">Susu Sapi</option>
                    <option value="rawat inap">Kacang-Kacangan</option>
                    <option value="Promotif Preventif">Makanan Lainnya</option>
                  </select>
                </div>
                <div className="flex items-center space-x-5">
                  <label className="text-black font-secondary-Karla font-bold w-40">
                    Udara :
                  </label>
                  <select
                    name="Perawatan"
                    className="p-1 rounded-md w-full border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
                  >
                    <option value=""></option>
                    <option value="rawat jalan">Tidak ada</option>
                    <option value="rawat inap">Udara Panas</option>
                    <option value="Promotif Preventif">Udara Dingin</option>
                    <option value="Promotif Preventif">Udara Kotor</option>
                  </select>
                </div>
                <div className="flex items-center space-x-5">
                  <label className="py-14 text-black font-secondary-Karla font-bold w-40">
                    Obat-Obatan :
                  </label>
                  <select
                    name="Perawatan"
                    className="p-1 rounded-md w-full border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
                  >
                    <option value=""></option>
                    <option value="rawat jalan">Antibiotik</option>
                    <option value="rawat inap">Antiinflasi</option>
                    <option value="Promotif Preventif">Non Steroid</option>
                    <option value="rawat jalan">Kortikosteroid</option>
                    <option value="rawat inap">Insulin</option>
                    <option value="Promotif Preventif">
                      Obat-Obatan lainnya
                    </option>
                  </select>
                </div>
                <div className="flex items-center space-x-5">
                  <label className="py-2 text-black font-secondary-Karla font-bold w-40">
                    Prognosa
                  </label>
                  <input
                    type="text"
                    name="Prognosa"
                    className="p-1 h-9 w-full rounded-md text-left bg-white border border-black focus:outline-none"
                    placeholder=" "
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    className="bg-blue-500 bg-success-600 text-white px-4 py-1 my-[60px] rounded hover:bg-blue-600"
                    onClick={handleSave}
                  >
                    Simpan
                  </button>
                  <button
                    type="button"
                    className="bg-gray-500 bg-error-700 text-white px-4 py-1 my-[60px] rounded hover:bg-gray-600"
                    onClick={handleCancel}
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div>
            <div className="h-10 bg-primary-600 shadow-lg rounded-t-lg py-4 justify-center flex items-center">
              <h1 className="text-white font-primary-Poppins font-bold text-xl ">
                Obat
              </h1>
            </div>
            <div className=" h-[360px] border border-primary-600 shadow-lg rounded-b-lg">
              <form className="space-y-3 p-4 mx-6">
                <div className="flex items-center space-x-5">
                  <label className="text-black font-secondary-Karla font-bold w-40">
                    Jenis Obat :
                  </label>
                  <input
                    type="text"
                    name="Jenis Obat"
                    placeholder=" Keterangan....."
                    className="p-1 h-9 mx-32 rounded-md text-left bg-white border border-black w-full"
                  />
                </div>
                <div className="flex items-center space-x-5">
                  <label className="text-black font-secondary-Karla font-bold w-40">
                    Dosis :
                  </label>
                  <input
                    type="text"
                    name="Dosis"
                    placeholder=" Keterangan....."
                    className="p-1 h-24 rounded-md text-left bg-white border border-black focus:outline-none w-full"
                  />
                </div>
                <div className="flex items-center space-x-5">
                  <label className="text-black font-secondary-Karla font-bold w-40">
                    BMHP :
                  </label>
                  <input
                    type="text"
                    name="BMHP"
                    placeholder=" Keterangan....."
                    className="p-1 h-24 rounded-md text-left bg-white border border-black focus:outline-none w-full"
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    className="bg-blue-500 bg-success-600 text-white px-4 py-1 my-[30px] rounded hover:bg-blue-600"
                    onClick={handleSave}
                  >
                    Simpan
                  </button>
                  <button
                    type="button"
                    className="bg-gray-500 bg-error-700 text-white px-4 py-1 my-[30px] rounded hover:bg-gray-600"
                    onClick={handleCancel}
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="my-5">
            <div className="h-10 bg-primary-600 shadow-lg rounded-t-lg py-4 justify-center flex items-center">
              <h1 className="text-white font-primary-Poppins font-bold text-xl">
                Tekanan Darah
              </h1>
            </div>
            <div className="h-64 border border-primary-600 shadow-lg rounded-b-lg">
              <form className="space-y-3 py-4 ml-10 pr-10">
                <div className="flex items-center space-x-5">
                  <label className="text-black font-secondary-Karla font-bold w-40">
                    Sistole
                  </label>
                  <input
                    type="text"
                    name="sistol"
                    placeholder="   mmhg"
                    className="p-1 h-9 mx-32 rounded-md text-left bg-white border border-black w-full"
                  />
                </div>
                <div className="flex items-center space-x-5">
                  <label className="text-black font-secondary-Karla font-bold w-40">
                    Distole
                  </label>
                  <input
                    type="text"
                    name="distol"
                    placeholder="   mmhg"
                    className="p-1 h-9 rounded-md text-left bg-white border border-black focus:outline-none w-full"
                  />
                </div>
                <div className="flex items-center space-x-5">
                  <label className="text-black font-secondary-Karla font-bold w-40">
                    Respiratory
                  </label>
                  <input
                    type="text"
                    name="respiratory"
                    placeholder="   /Menit"
                    className="p-1 h-9 rounded-md text-left bg-white border border-black focus:outline-none w-full"
                  />
                </div>
                <div className="flex items-center space-x-5">
                  <label className="text-black font-secondary-Karla font-bold w-40">
                    Heart Rate
                  </label>
                  <input
                    type="text"
                    name="heart_rate"
                    placeholder="   Bpm"
                    className="p-1 h-9 rounded-md text-left bg-white border border-black focus:outline-none w-full"
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    className="bg-blue-500 bg-success-600 text-white px-4 py-1 rounded hover:bg-blue-600"
                    onClick={handleSave}
                  >
                    Simpan
                  </button>
                  <button
                    type="button"
                    className="bg-gray-500 bg-error-700 text-white px-4 py-1 rounded hover:bg-gray-600"
                    onClick={handleCancel}
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div>
            <div className="h-10 bg-primary-600 shadow-lg rounded-t-lg py-4 justify-center flex items-center">
              <h1 className="text-white font-primary-Poppins font-bold text-xl ">
                Keadaan Fisik
              </h1>
            </div>
            <div className="h-72 border border-primary-600 -my-8 shadow-lg rounded-b-lg">
              <form className="-space-y-10 w-full ml-10 left-10 right-24 pr-20">
                <div className="flex items-center space-x-5">
                  <label className="text-black font-secondary-Karla font-bold py-14 w-40">
                    Berat Badan
                  </label>
                  <input
                    type="text"
                    name="berat_badan"
                    className="p-1 h-9 w-full rounded-md text-left bg-white border border-black focus:outline-none"
                    placeholder="   Kg"
                  />
                </div>
                <div className="flex items-center space-x-5">
                  <label className="text-black font-secondary-Karla font-bold w-40">
                    Tinggi Badan
                  </label>
                  <input
                    type="text"
                    name="tinggi_badan"
                    className="p-1 h-9 w-full rounded-md text-left bg-white border border-black focus:outline-none"
                    placeholder="   Cm"
                  />
                </div>
                <div className="flex items-center space-x-5">
                  <label className="py-14 text-black font-secondary-Karla font-bold w-40">
                    Lingkar Perut
                  </label>
                  <input
                    type="text"
                    name="lingkar_perut"
                    className="p-1 h-9 w-full rounded-md text-left bg-white border border-black focus:outline-none"
                    placeholder="   Cm"
                  />
                </div>
                <div className="flex items-center space-x-5">
                  <label className="py-2 text-black font-secondary-Karla font-bold w-40">
                    IMT (BB/TB)
                  </label>
                  <input
                    type="text"
                    name="imt"
                    className="p-1 h-9 w-full rounded-md text-left bg-white border border-black focus:outline-none"
                    placeholder="   Kg/M2"
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    className="bg-blue-500 bg-success-600 text-white px-4 py-1 my-[60px] rounded hover:bg-blue-600"
                    onClick={handleSave}
                  >
                    Simpan
                  </button>
                  <button
                    type="button"
                    className="bg-gray-500 bg-error-700 text-white px-4 py-1 my-[60px] rounded hover:bg-gray-600"
                    onClick={handleCancel}
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
