import { useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AiOutlineCalendar, AiOutlineClockCircle } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Diagosa from "./Diagosa";
import Pemeriksaan from "./Pemeriksaan";
import useAxios from "../../../useAxios";

export default function Pengajuan() {
  const MySwal = withReactContent(Swal);
  const axiosInstance = useAxios();
  const { id } = useParams();
  const [poli, setPoli] = useState("");
  const [perawatan, setPerawatan] = useState("");
  const [jeniskunjungan, setJeniskunjungan] = useState("");
  const [keluhan, setKeluhan] = useState("");
  const [anestesi, setAnestesi] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());

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

  const saveData = async () => {
    try {
      await axiosInstance.post("/pelayanans", {
        poli: poli,
        perawatan: perawatan,
        jeniskunjungan: jeniskunjungan,
        keluhan: keluhan,
        anestesi: anestesi,
        tanggalkunjungan: startDate,
        pasienId: id,
      });

      MySwal.fire("Tersimpan!", "Data Anda telah disimpan.", "success");
    } catch (error) {
      MySwal.fire("Error!", error.message, "error");
    }
  };

  const cancelData = () => {
    MySwal.fire("Dibatalkan!", "Perubahan telah dibatalkan.", "error");
  };

  return (
    <div className="grid grid-cols-1 mt-7 mx-auto gap-7 items-baseline container ">
      <div>
        <div className="h-10 w-full bg-primary-600 shadow-lg rounded-t-lg ">
          <h1 className="text-white font-primary-Poppins font-bold text-xl justify-center flex items-center py-1">
            Pengajuan
          </h1>
        </div>
        <div className=" w-full border border-primary-600 mx-18 shadow-lg rounded-b-lg">
          <form className="space-y-2 my-7 w-full mx-8 left-10 right-24 ">
            <div className="flex items-center space-x-5 mr-14">
              <label className="text-black font-secondary-Karla font-bold flex-[30%]">
                Perawatan:
              </label>
              <select
                name="Perawatan"
                value={perawatan}
                onChange={(e) => setPerawatan(e.target.value)}
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
                value={jeniskunjungan}
                onChange={(e) => setJeniskunjungan(e.target.value)}
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
              <select
                name="Poli"
                value={poli}
                onChange={(e) => setPoli(e.target.value)}
                className="p-1 h-9 flex-[70%] rounded-md text-left bg-white border border-black focus:outline-none"
              >
                <option value=""></option>
                <option value="Poli Umum">Poli Umum</option>
                <option value="Poli Gigi">Poli Gigi</option>
              </select>
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
                value={keluhan}
                onChange={(e) => setKeluhan(e.target.value)}
                className="p-1 h-24 rounded-md text-left bg-white border border-black focus:outline-none flex-[70%]"
                placeholder="Keterangan......"
              />
            </div>

            <div className="flex items-center space-x-5 mr-14">
              <label className=" text-black font-secondary-Karla font-bold flex-[30%]">
                Anestesi
              </label>
              <textarea
                name="keterangan"
                value={anestesi}
                onChange={(e) => setAnestesi(e.target.value)}
                className="p-1 h-24 rounded-md text-left bg-white border border-black focus:outline-none flex-[70%]"
                placeholder="Keterangan......"
                style={{ width: "51%" }}
              />
            </div>

            <div className="flex space-x-4 pt-5">
              <button
                type="button"
                className="bg-blue-500 bg-success-600 text-white px-4 py-1 rounded hover:bg-emerald-950"
                onClick={handleSave}
              >
                Simpan
              </button>
              <button
                type="button"
                className="bg-error-600 text-white px-4 py-1 rounded hover:bg-gray-600"
                onClick={handleCancel}
              >
                Batal
              </button>
            </div>
          </form>
        </div>

        {/* Form Diagnosa */}
        <Diagosa />

        {/* Form Pemeriksaan */}
        <Pemeriksaan />
      </div>
    </div>
  );
}
